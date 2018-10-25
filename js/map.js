var map

function initMap() {
  map = new google.maps.Map($("#map")[0], {
    center: { lat: 39.81, lng: -98.5556 },
    zoom: 4
  })
  //Try HTML5 geolocation
  let location = "77025"
  let geocoder = new google.maps.Geocoder()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // var pos = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // }
        // geocoder
        //   .geocode({ location: pos }, res => {
        //     g(res[0])
        //   })
        //   .then()
        // console.log(location)
        // console.log("prestart")
        // startUp()
        // map.setCenter(pos)
        // map.setZoom(12)
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}

function setSheltersOnMap(shelterArray) {
  Object.keys(shelterArray)
    .map(key => shelterArray[key])
    .map(shelter => {
      let latitude = shelter.latitude
      let longitude = shelter.longitude
      let location = new google.maps.LatLng(latitude, longitude)
      let contentString = `
        <b>${shelter.name}</b>
        <p>${shelter.email}</p>
        <p>${shelter.phone ? shelter.phone : ""}</p>
        `
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      })
      let marker = new google.maps.Marker({
        position: location,
        map: map,
        title: shelter.name,
        name: shelter.name
      })
      marker.addListener("mouseover", function() {
        infowindow.open(map, marker)
        marker.addListener("mouseout", function() {
          infowindow.close()
        })
      })
      marker.addListener("mouseout", function() {
        infowindow.close()
      })
      marker.addListener("click", function() {
        infowindow.open(map, marker)
        google.maps.event.clearListeners(marker, "mouseout")
      })
    })
}

// address1: "8620 Stella Link Road"
// address2: undefined
// city: "Houston"
// country: "US"
// email: "adopt@houstonpetsalive.org"
// fax: undefined
// id: "TX1950"
// latitude: 29.69
// longitude: -95.4343
// name: "Houston Pets Alive!"
// phone: "(832) 786-9310"
// state: "TX"
// zip: "77025"
