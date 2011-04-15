Ti.include('google_kml.js');

var mainWindow = Titanium.UI.createWindow({
    title:'Main'
});

var detailWindow = Titanium.UI.createWindow({
    backButtonTitle: 'Back',
    modal: true
});

var detailTableView = Titanium.UI.createTableView({
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

detailWindow.add(detailTableView);

var mapView = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {
        latitude: 38.9130129619191,
        longitude: -77.1011888683184,
        latitudeDelta:0.1,
        longitudeDelta:0.1
    },
    animate: true,
    regionFit: true
});

mainWindow.add(mapView);
mainWindow.open();

// PARKS
addLocationsToMap (mapView, "http://geocommons.com/overlays/34854/features.json?geojson=1", {
    title:"name",
    subtitle:"street address",
    icon:"images/playground.png"
});

// BIKES SHARE SPOTS
addLocationsToMap (mapView, "http://geocommons.com/overlays/96399/features.json?geojson=1", {
    title:"Bike Share Location",
    subtitle:"name",
    icon:"images/cycling.png"
});

// MOVIE THEATRES
addLocationsToMap (mapView, "http://geocommons.com/overlays/34849/features.json?geojson=1", {
    title:"name",
    subtitle:"street address",
    icon:"images/cinema.png"
});

// LIBRARY LOCATIONS
addLocationsToMap (mapView, "http://geocommons.com/overlays/34848/features.json?geojson=1", {
    title:"name",
    subtitle:"street address",
    icon:"images/library-publ.png"
});

// TENNIS COURT LOCATIONS
addLocationsToMap (mapView, "http://geocommons.com/overlays/34793/features.json?geojson=1", {
    title:"name",
    subtitle:"street address",
    icon:"images/tennis2.png"
});

/**
 *
 */

function addLocationsToMap (mapView, url, params) {
    var xhr = Titanium.Network.createHTTPClient();

    xhr.open('GET', url);

    xhr.onerror = function() {
    };
    xhr.onload = function() {
        addLocations(mapView, JSON.parse(xhr.responseText),params);
    };
    xhr.send();
};

function addLocations(map, data, params) {
    for (var x in data.features) {

        if (x == 50) {
            break;
        }

        var o = data.features[x];

        var annotation = Titanium.Map.createAnnotation({
            latitude: o.geometry.coordinates[1],
            longitude: o.geometry.coordinates[0],
            title: o.properties[params.title] || params.title,
            subtitle: o.properties[params.subtitle] || params.subtitle,
            //pincolor: Titanium.Map.ANNOTATION_RED,
            image : params.icon,
            animate:true,
            _rowObject:data.features[x]
        });

        Ti.API.debug("annotation " + JSON.stringify(annotation));
        map.addAnnotation(annotation);
    }

}

/**
 *
 */
function addRoutes(url) {
    //code to add annotations here http://geocommons.com/overlays/105511
    var url = "http://geocommons.com/overlays/64725.kml";

    //Add routes from a remote KML file to one map
    goog.maps.kml.addRoutesToMap(mapView, url);
}

/**
 *
 */
mapView.addEventListener('click', function(e) {
    if (e.clicksource == 'rightButton') {
        var annotation = e.annotation;

        if (annotation) {
            var title = annotation.title;
        }

    }
});