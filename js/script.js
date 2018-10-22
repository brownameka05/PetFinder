function populateSearchResults(resultsObject){
    let count = 1;
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

populateSearchResults(petObject)