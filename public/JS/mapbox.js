/* eslint-disable*/
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoiam9zcGluMjUiLCJhIjoiY203ajJ2ZWd0MDJlYzJucXh6YmtxNDZ6NCJ9.LEM7XiZ_6BDV0rIJIy0FAw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jospin25/cm7j38evl00oo01r4az4cf7a0',
    scrollZoom: false,
    //   center: [-118, 34],
    //   zoom: 10,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create Marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat([loc.coordinates[0], loc.coordinates[1]])
      .addTo(map);
    //Add a popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat([loc.coordinates[0], loc.coordinates[1]])
      .setHTML(`<p> ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current Locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
