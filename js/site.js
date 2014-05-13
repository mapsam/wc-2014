function init() {

	// get user's timezone info
	var d = new Date();
	var n = d.getTimezoneOffset();
	console.log(d, n);

	// map init variables
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
		zoom: 5,
		zoomControl: false
	}

	var map = L.map('map', mapOptions);

	games = [];

	L.geoJson(geojson, { 
		onEachFeature: onEachFeature,
		pointToLayer: function(feature, latlng) {
			return new L.CircleMarker(latlng, {radius: 10, fillOpacity: 0.8, color: '#cc0000'});
		}
	});
	
	// geojson styles
	var styles = {
		'color': '#4682b4',
		'weight': 0
	}

	// feature looping and interaction
	function onEachFeature(feature, layer) {
    var gg = games[feature.properties.date];
    if (gg === undefined) {
        gg = new L.layerGroup();
        games[feature.properties.date] = gg;
    }
    gg.addLayer(layer);

    var g = feature.properties;
    if (g && g.matchid) {
        layer.bindPopup(g.date + '<br><p><strong>' + g.teamA + '</strong> vs. <strong>' + g.teamB +'</strong></p>');
    }
	}




	var date = '6/12';
	showLayer(date);

	function showLayer(id) {
		var game = games[id];
		map.addLayer(game);
		for(key in game._layers) {
			var d = game._layers[key].feature.properties;
			var info = '';
			info += '<div class="game" id="match-'+d['matchid']+'"><h4>Game '+d['matchid']+'<span class="date">'+d.day+' '+d.date+'</span></h4>';
			info += '<div class="match"><div class="team-one"><img src="flags/'+d.teamAabbr+'.svg" width="60" height="auto"><br>'+d.teamA+'</div><div class="vs">vs</div><div class="team-two"><img src="flags/'+d.teamBabbr+'.svg" width="60" height="auto"><br>'+d.teamB+'</div><div class="cf"></div></div>';
			info += '<p class="time">'+d.time+'</p>';
			info += '</div>';
			document.getElementById('info').innerHTML += info;
		}
		// add layer properties to #info section
	}
	function hideLayer(id) {
		var game = games[id];
		map.removeLayer(game);
		document.getElementById('info').innerHTML = '';
	}

	// user interaction on date navigation
	$('.date').click(function(){
		if($(this).className=='active') {
			// do nothing
		} else {
			// toggle menu classes
			$('.date').removeClass('active');
			$(this).toggleClass('active');
			// remove current date layer
			hideLayer(date);
			// change date to the newly selected nav item
			date = $(this).text();
			// add the layer based off the 
			showLayer(date);
			
		}
	});

	// hover actions on specific games in sidebar
	$('body').on('mouseover', '.game', function(){
		id = $(this).attr('id').slice(6);
		console.log(id);
	});
}

window.onLoad = init();