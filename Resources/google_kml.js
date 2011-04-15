var goog = {
    maps: {
        kml: {}
    }
};

(function() {

    goog.maps.kml.addRoutesToMap = function(maps, url) {
        var xhr = Titanium.Network.createHTTPClient();

        xhr.open('GET', url);

        xhr.onload = function() {
        };
        
        xhr.onload = function() {

            var kml = goog.maps.kml.parse( Titanium.XML.parseString(xhr.responseText) );

            if( typeof(maps) && !(maps.length > 0) ) {
                maps = [maps];
            }
            for(var m=0;m<maps.length;m++) {
                goog.maps.kml.addRoutes(maps[m], kml);
            }
        };
        xhr.send();
    };
    goog.maps.kml.addRoutes = function(map, kml) {
        var route, line, points, coords, coords_length, loc, styleId;
        for(var pm=0; pm<kml.placeMarksLength; pm++) {
            points = [];
            placeMark = kml.placeMarks.item(pm);
            try {

                // sometimes "LineString", sometimes "LinearRing", so check for both
                if (placeMark.getElementsByTagName('LinearRing')) {
                    line = placeMark.getElementsByTagName('LinearRing').item(0);
                } else if (placeMark.getElementsByTagName('LineString')) {
                    line = placeMark.getElementsByTagName('LineString').item(0);
                }

                coords = line.getElementsByTagName('coordinates').item(0).text.split(" ");
                coords_length = coords.length;
                for(var cc=0; cc<coords_length; cc++) {
                    loc = coords[cc].split(',');
                    if(loc[0] && loc[1]) {
                        points.push({
                            latitude: loc[1].replace('\n',''),
                            longitude: loc[0].replace('\n','')
                        });
                    }
                }
                styleId = /#(.*)/.exec(placeMark.getElementsByTagName('styleUrl').item(0).text)[1];

                Ti.API.debug("styleId " + styleId);

                route = {
                    name: placeMark.getElementsByTagName('name').item(0).text,
                    points: points,
                    color:  '#ff00ffff', //'#'+ kml.styles[styleId].color,//make sure this is a websafe color or else the color will be picked for you.
                    width: 4 //kml.styles[styleId].width
                };

                Ti.API.debug("route " + JSON.stringify(route));

                map.addRoute(route);
            } catch(E) {
                Ti.API.debug("Error " + E);
            }
        }
    };
    goog.maps.kml.parse = function(xml) {
        var kml = {
            xml: xml,
            styles:  goog.maps.kml.getStyles(xml),
            placeMarks: goog.maps.kml.getPlaceMarks(xml)
        };
        kml.stylesLength = kml.styles.length;
        kml.placeMarksLength = kml.placeMarks.length;

        Ti.API.debug("PARSE " + JSON.stringify(kml));
        return kml;
    };
    goog.maps.kml.getStyles = function(xml) {
        var stylesCollection = {};
        var styles = xml.documentElement.getElementsByTagName("Style");
        var stylesLength = styles.length;
        var style, lineStyle, params;

        for(var i=0;i<stylesLength;i++) {
            try {
                lineStyle = styles.item(i).getElementsByTagName('LineStyle').item(0);
                style = styles.item(i).getAttribute("id"); //gets the ID attribute
                if (style) {
                    stylesCollection[style] = {
                        color: lineStyle.getElementsByTagName('color').item(0).text,
                        width: lineStyle.getElementsByTagName('width').item(0).text
                    };
                }
            } catch(E) {
                Ti.API.debug("Error: getStyles " + E);
            }
        }

        styles = xml.documentElement.getElementsByTagName("Placemark");
        stylesLength = styles.length;
        for(var ii=0;ii<stylesLength;ii++) {
            try {
                lineStyle = styles.item(ii).getElementsByTagName('LineStyle').item(0);
                style = styles.item(ii).getElementsByTagName('styleUrl').item(0).text;
                style = style.replace('#','');
                if (style) {
                    stylesCollection[style] = {
                        color: lineStyle.getElementsByTagName('color').item(0).text,
                        width: lineStyle.getElementsByTagName('width').item(0).text
                    };
                }
            } catch(EE) {
                Ti.API.debug("Error: getStyles, styleUrl " + EE);
            }
        }

        Ti.API.debug("stylesCollection " + JSON.stringify(stylesCollection));
        return stylesCollection;
    };
    goog.maps.kml.getPlaceMarks = function(xml) {
        return xml.documentElement.getElementsByTagName("Placemark");
    };
})();