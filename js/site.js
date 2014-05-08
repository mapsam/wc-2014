function init() {

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

	gameLayersGroup = [];

	L.geoJson(geojson, { onEachFeature: onEachFeature });
	
	function onEachFeature(feature, layer) {
    var gameGroup = gameLayersGroup[feature.properties.date];
    if (gameGroup === undefined) {
        gameGroup = new L.layerGroup();
        gameLayersGroup[feature.properties.date] = gameGroup;
    }
    gameGroup.addLayer(layer);

    var g = feature.properties;
    if (g && g.matchid) {
        layer.bindPopup(g.date + '<br><p><strong>' + g.teamA + '</strong> vs. <strong>' + g.teamB +'</strong></p>');
    }
	}
	var date = '6/12';
	showLayer(date);

	function showLayer(id) {
		var game = gameLayersGroup[id];
		map.addLayer(game);
	}
	function hideLayer(id) {
		var game = gameLayersGroup[id];
		map.removeLayer(game);
	}

	$('.date').click(function(){
		if($(this).className=='active') {
			// do nothing
		} else {
			$('.date').removeClass('active');
			$(this).toggleClass('active');
			hideLayer(date);
			date = $(this).text();
			showLayer(date);
		}
	});
}

window.onLoad = init();