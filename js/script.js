petObject = {
    chico : {
        name: "Chico",
        age: 12
    }, 
    bruce : {
        name: "Bruce",
        age: 2
    },
    bailey : {
        name: "Bailey",
        age: 12
    }, 
    lucy : {
        name: "Lucy",
        age: 2
    }, 
    charlie : {
        name: "Charlie",
        age: 2
    },
    molly : {
        name: "Molly",
        age: 12
    }, 
    max : {
        name: "Max",
        age: 2
    }
}

locationArray = [{latitude : 29.7527665, longitude : -95.33904369999999}, {latitude : 29.7227665, longitude : -95.32904369999999}]

var map

function populateSearchResults(resultsObject){
    for(key in resultsObject){
        petObject = resultsObject[key]
        petLiteral = `
        <div class="card">
            <img class="card-img" src="https://lh5.googleusercontent.com/-2cuebuSKiRU/AAAAAAAAAAI/AAAAAAAAAEU/PibNivK-4U4/photo.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${petObject.name}</h5>
                <p class="card-text">Age: ${petObject.age}</p>
                <button onclick = class = "learnMore" id = "${key}">More about ${petObject.name}</button>
            </div>
        </div>
        `
        $("#results").append(petLiteral)
    }
}

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
    setSheltersOnMap(locationArray)
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

populateSearchResults(petObject)




