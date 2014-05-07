function init() {
 	var geojson = {};
	geojson['type'] = 'FeatureCollection';
	geojson['features'] = [];

	Tabletop.init({
		key: '0AkE-VGwUGzsSdGpxMkxDMWpxYzRyWlRtMjZkbC1SQlE',
		callback: function(data, tabletop) {
			$.each(data, function(key, val) {
				var newFeature = {
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [parseFloat(val.lng), parseFloat(val.lat)]
					},
					"properties": {
						"title": val.matchid,
						"date": val.date,
						"day": val.day,
						"time": val.time,
						"teamA": val.teamA,
						"teamB": val.teamB,
						"venue": val.venue,
						"marker-size": "large",
						"marker-color": "#4682b4",
						"marker-symbol": ""
					}
				}
				geojson['features'].push(newFeature);	
			});
			mapIt(geojson);
		},
		simpleSheet: true
	});
 
	function mapIt(groups) {
		var southWest = L.latLng(-31.108604, -78.637069),
				northEast = L.latLng(9.121200, -19.018984),
				bounds = L.LatLngBounds(southWest, northEast);

		var tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-h67hf2ic/{z}/{x}/{y}.png');
		var mapOptions = {
			maxZoom: 6,
			minZoom: 4,
			maxBounds: bounds,
			layers: [tiles],
			center: L.latLng(-15.7833, -47.8667),
			zoom: 5
		}

		var date = '6/13/2014';


		var map = L.map('map', mapOptions);
		var games = L.geoJson(groups, {
			style: function(feature) {
				return { color: '#cc0000' };
			},
			pointToLayer: function(feature, latlng) {
				return new L.CircleMarker(latlng, {radius: 10, fillOpacity: getFill(feature, date), weight: 1})
			}
		});
		map.addLayer(games);
		
	}
		
	function getFill(feature, date) {
		game = feature.properties.date;
		if(game==date) {
			return 0.8;
		} else {
			return 0;
		}
	}
// 		// get each feature and populate page with properties
// 		var info = document.getElementById('groups');
// 		map.featureLayer.eachLayer(function(marker) {

// 			// append to left column
// 			var link = info.appendChild(document.createElement('div'));
// 			link.className = 'group';
// 			var group = marker.feature.properties;
// 			link.innerHTML = '<div class="group-header"><h2>' + group.title + '</h2>' + '<p class="short-desc">' + group.shortdesc + '</p><div class="info">' + marker.feature.geometry.coordinates[1] + ', ' + marker.feature.geometry.coordinates[0] + '</div></div>';
// 			link.innerHTML += '<div class="more"><p class="description">' + group.description + '</p><p class="contact"><span class="title">Contact</span><br>' + group.contact + '<br><em>' + group.contactEmail + '</em></p></div>';
// 			link.onclick = function() {
// 				if(/active/.test(this.className)) {
// 					this.className = this.className.replace(/active/, '').replace(/\s\s*$/, '');
// 				} else {
// 					var siblings = info.getElementsByClassName('group');
// 					for(var mug=0; mug<siblings.length; mug++) {
// 						siblings[mug].className = siblings[mug].className.replace(/active/, '').replace(/\s\s*$/, '');
// 					};
// 					this.className += ' active';
// 					map.panTo(marker.getLatLng());
// 					marker.openPopup();
// 				}
// 				return false;
// 			}

// 			// set popup content
// 			var popupContent = '<h2>' + group.title + '</h2><p>' + group.shortdesc + '</p>';
// 			marker.bindPopup(popupContent);
// 		});
// 	}

// 	// add button
// 	$('#add-button').click(function(){
// 		$('#add').toggleClass('do-it');
// 		$(this).toggleClass('do-it');
// 	});
// 	$('#close-add').click(function(){
// 		$('#add').toggleClass('do-it');
// 		$('#add-button').toggleClass('do-it');
// 	});
// }
}

window.onLoad = init();