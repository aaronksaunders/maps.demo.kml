Ti.include('google_kml.js');

var mainWindow = Titanium.UI.createWindow({
    title:'Main'
});

var detailWindow = Titanium.UI.createWindow({
    backButtonTitle: 'Back',
    modal: true
});

var detailView = Titanium.UI.createTableView({
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

detailWindow.add(detailView);

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

//code to add annotations here http://geocommons.com/overlays/105511
var url = "http://geocommons.com/overlays/105511.kml";

//Add routes from a remote KML file to one map
goog.maps.kml.addRoutesToMap(mapView, url);

mapView.addEventListener('click', function(e) {
    if (e.clicksource == 'rightButton') {
        var annotation = e.annotation;

        if (annotation) {
            var title = annotation.title;

            // keep it simple just for testing
            var tableData = [{
                title: title
            }
            ];
        }

        detailView.data = tableData;

        detailWindow.title = title;

        detailWindow.open(detailView, {
            animated: true,
            fullscreen: true,
            transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    }
});