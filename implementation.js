// Create data layer with Space provider
var myPolLayer = new here.xyz.maps.layers.TileLayer({
    name: 'SpacePolLayer',
    provider: new here.xyz.maps.providers.SpaceProvider({
		name:  'PolSpaceProvider',
		level: 1,
		space: '34kT3DPb',
		credentials: {
			access_token: '...'
		}
	}),
    min: 2,
    max: 20
})

// Create data layer with Space provider
var myPointLayer = new here.xyz.maps.layers.TileLayer({
    name: 'SpacePointLayer',
    provider: new here.xyz.maps.providers.SpaceProvider({
		name:  'PointSpaceProvider',
		level: 1,
		space: 'aLdspxZM',
		credentials: {
			access_token: '...'
		}
	}),
  	style:{
    	styleGroups: {
          	pointStyle: [
            	{zIndex:0, type:"Circle", radius: 3, strokeWidth: 4,fill: "blue"}
            ],
          	linkStyle: [
              	{zIndex:0, type:"Line", stroke:"#E5B50B", strokeWidth:18, "strokeLinecap": "butt"},
	    		{zIndex:1, type:"Line", stroke:"#1F1A00", strokeWidth:18, "strokeLinecap": "butt", 'strokeDasharray': [12,10]},
	    		{zIndex:2, type:"Line", stroke:"#F7FABF", strokeWidth:10},
	    		{zIndex:3, type:"Text", textRef:"properties.name", fill:"#3D272B"}
            ]
    	},

		assign: function(feature, zoomlevel){
        // console.log(feature.geometry.type)	
          if(feature.geometry.type == 'Line')	
            return "linkStyle";
          if(feature.geometry.type == 'Point')	
          	return "pointStyle";
		}
    },
    min: 2,
    max: 20
})


    
// setup the Map Display
    window.display = new  here.xyz.maps.Map( document.getElementById("map"), {
        zoomLevel : 7,
        center: {
            longitude: 36.236804, // 45.404109954833984, 35.53702926635742, 45.481529235839844, 35.58161163330078
          latitude: 33.46422
        },
        // add layers to display
        layers: [
            new here.xyz.maps.layers.MVTLayer({
                name   : 'mvt-world-layer',
                remote : {
                    url : 'https://xyz.api.here.com/tiles/osmbase/256/all/{z}/{x}/{y}.mvt'
                    // optional settings:
                    // max  : 16,     // max level for loading data
                    // min  : 1       // min level for loading data
                    // tileSize : 512 // 512|256 defines mvt tilesize in case it can't be automatically detected in url..
                },
                min : 1,
                max : 20,

                style : {

                    backgroundColor: '#555555',

                    strokeWidthZoomScale: function (level) {
                        return level > 17 ? 1 : level > 14 ? .5 : .25
                    },

                    styleGroups: {

                        'earth'        : [{ zIndex: 1, type: 'Polygon', fill: '#555555' }],
                        'water'        : [{ zIndex: 2, type: 'Polygon', fill: '#353535' }],
                        'landuse'      : [{ zIndex: 3, type: 'Polygon', fill: '#666666' }],
                        'roads'        : [{ zIndex: 4, type: 'Line',  stroke: '#ffffff', strokeWidth: 4 }],
                        'roadshighway' : [{ zIndex: 5, type: 'Line',  stroke: '#ffffff', strokeWidth: 6 }],
                        'buildings'    : [{ zIndex: 7, type: 'Polygon', fill: '#999999' }]
                    },

                    assign: function (feature, level)
                    {
                        var props = feature.properties;
                        var kind  = props.kind;
                        var layer = props.layer; // the data layer of the feature
                        var geom  = feature.geometry.type;

                        if (layer == 'water') {
                            if (geom == 'LineString' || geom == 'MultiLineString') {
                                return;
                            }
                        }
                        if (layer == 'roads') {
                            if (kind == 'rail' || kind == 'ferry') {
                                return;
                            }
                            if (kind == 'highway') {
                                return layer + kind;
                            }
                        }
                        return layer;
                    }
                }
            }), myPolLayer,myPointLayer
        ]
    });

var selectedStyle = [{
    zIndex: 0,
    type: "Circle",
    radius: 8,
    strokeWidth: 4,
    fill: "#00ff0f"
}];

var clickedFeature;
display.getLayers(0).pointerEvents(false);

myPointLayer.pointerEvents(false)

var findOne = function (searchArray, arr) {
    return arr.some(function (v) {
        return searchArray.indexOf(v) >= 0;
    });
};

var clickedFeature;
var layer = myPointLayer;
// add event listener to pointerup
display.addEventListener('pointerup', function(ev){
  	let feature = ev.target;
	//Restore default feature style
	//if(clickedFeature)	
  		//myPointLayer.setStyleGroup(clickedFeature);

	// If a feature is clicked
	if(feature){
        console.log(feature)
		clickedFeature = feature;
      	var searchTags = feature.properties["@ns:com:here:xyz"].tags.map(function(x){return x.replace('req','offers');});
        console.log(searchTags)

      	let result = myPointLayer.search({point: feature.geometry.coordinates[0][0], radius:100000 }).filter(
          (feature)=>{
            return findOne(searchTags,feature.properties["@ns:com:here:xyz"].tags)
          });
      	console.log(result)
       	
        result.forEach(f=> myPointLayer.setStyleGroup(f, selectedStyle));
	}
});



    