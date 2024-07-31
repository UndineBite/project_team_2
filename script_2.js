document.addEventListener('DOMContentLoaded', function() {
    var map = AmCharts.makeChart("map", {
        "type": "map",
        "pathToImages": "http://www.amcharts.com/lib/3/images/",
        "addClassNames": true,
        "fontSize": 15,
        "color": "#FFFFFF",
        "projection": "mercator",
        "backgroundAlpha": 1,
        "backgroundColor": "rgba(80,80,80,1)",
        "dataProvider": {
            "map": "worldLow",
            "getAreasFromMap": true,
            "images": [
                {
                    "top": 40,
                    "left": 60,
                    "width": 80,
                    "height": 40,
                    "pixelMapperLogo": true,
                    "imageURL": "http://pixelmap.amcharts.com/static/img/logo.svg",
                    "url": "http://www.amcharts.com"
                }
            ]
        },
        "balloon": {
            "horizontalPadding": 15,
            "borderAlpha": 0,
            "borderThickness": 1,
            "verticalPadding": 15
        },
        "areasSettings": {
            "color": "rgba(129,129,129,1)",
            "outlineColor": "rgba(80,80,80,1)",
            "rollOverOutlineColor": "rgba(80,80,80,1)",
            "rollOverBrightness": 20,
            "selectedBrightness": 20,
            "selectable": true,
            "unlistedAreasAlpha": 0,
            "unlistedAreasOutlineAlpha": 0
        },
        "imagesSettings": {
            "alpha": 1,
            "color": "rgba(129,129,129,1)",
            "outlineAlpha": 0,
            "rollOverOutlineAlpha": 0,
            "outlineColor": "rgba(80,80,80,1)",
            "rollOverBrightness": 20,
            "selectedBrightness": 20,
            "selectable": true
        },
        "linesSettings": {
            "color": "rgba(129,129,129,1)",
            "selectable": true,
            "rollOverBrightness": 20,
            "selectedBrightness": 20
        },
        "zoomControl": {
            "zoomControlEnabled": true,
            "homeButtonEnabled": false,
            "panControlEnabled": false,
            "right": 38,
            "bottom": 30,
            "minZoomLevel": 0.25,
            "gridHeight": 100,
            "gridAlpha": 0.1,
            "gridBackgroundAlpha": 0,
            "gridColor": "#FFFFFF",
            "draggerAlpha": 1,
            "buttonCornerRadius": 2
        }
    });

    // clicking on the map
    map.addListener('clickMapObject', function(event) {
        var countryName = event.mapObject.title;
        document.getElementById('countryName').value = countryName;
        document.getElementById('formPosition').style.display = 'block';
        document.getElementById('eventForm').style.display = 'block';
    });

    // closing the form
    document.getElementById('closeForm').addEventListener('click', function() {
        document.getElementById('formPosition').style.display = 'none';
        document.getElementById('eventForm').style.display = 'none';
    });

    // submitting the form
    document.getElementById('countryEventForm').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('message').style.display = 'block';
        document.getElementById('formPosition').style.display = 'none';
        document.getElementById('eventForm').style.display = 'none';
    });

    // closing the message
    document.getElementById('closeMessage').addEventListener('click', function() {
        document.getElementById('message').style.display = 'none';
    });
});
