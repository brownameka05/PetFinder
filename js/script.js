function populateSearchResults(resultsObject){
    for(key in resultsObject){
        petObject = resultsObject[key]
        petLiteral = `

    
        <div class="card">
            <img class="card-img-top" src="/images/lab.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${petObject.name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        `
        $("#results").append(petLiteral)
    }
}

















petObject = {
    Chico : {
        name: "Chico",
        age: 12
    }, 
    Bruce : {
        name: "Bruce",
        age: 2
    },
    Bailey : {
        name: "Bailey",
        age: 12
    }, 
    Lucy : {
        name: "Lucy",
        age: 2
    }, 
    Charlie : {
        name: "Charlie",
        age: 2
    },
    Molly : {
        name: "Molly",
        age: 12
    }, 
    Max : {
        name: "Max",
        age: 2
    },
    Baxter : {
        name: "Max",
        age: 2
    }
}

populateSearchResults(petObject)





