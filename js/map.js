
var map;

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
            console.log(pos)
            map.setCenter(pos)
            map.setZoom(12)
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    // setSheltersOnMap(locationArray)
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map)

}

function setSheltersOnMap(shelterArray){
    for(let index = 0; index < shelterArray.length; index++){
        let latitude = shelterArray[index].latitude
        let longitude = shelterArray[index].longitude
        let location = new google.maps.LatLng(latitude, longitude)
        let marker = new google.maps.Marker({
            position: location, 
            map: map
        })
    }
}






