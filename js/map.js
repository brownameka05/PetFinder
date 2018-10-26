var maps
var geocoder

function initMap(){
    map = new google.maps.Map($("#map")[0], {
        center: {lat: 39.81, lng: -98.5556},
        zoom: 4
    })

    //Try HTML5 geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            map.setCenter(pos)
            map.setZoom(12)
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    geocoder = new google.maps.Geocoder
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map)

}

function setSheltersOnMap(shelterArray){
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
        marker.addListener("mouseover", function(){
            infowindow.open(map, marker);
            marker.addListener("mouseout", function(){
                infowindow.close();
            })
        })
        marker.addListener("mouseout", function(){
            infowindow.close();
        })
        marker.addListener("click", function(){
            infowindow.open(map, marker);
            google.maps.event.clearListeners(marker, "mouseout")
        })
    })
}

function updateMapFromZip(zipCode){
    geocoder.geocode({'address': zipCode}, function(results, status){
        if(status === 'OK'){
            if(results[0]){
                console.log(results[0])
                map.setCenter(results[0].geometry.location);
                map.setZoom(12)
            } else {
                console.log("No results found.")
            }
        } else {
            console.log("Geocoder failed due to: " + status)
        }
    })
}







