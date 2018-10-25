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





=======
const filterPets = (currentPets, filter) => {
  if (areFiltersEmpty(filter)) {
    return currentPets;
  }
  return Object.keys(currentPets)
    .map(function(key) {
      return currentPets[key];
    })
    .filter((pet) => petMatch(filter, pet));
};

const areFiltersEmpty = (obj) => {
  let isEmpty = true;
  for (k in obj) {
    if (obj[k].length !== 0) {
      isEmpty = false;
    }
  }
  return isEmpty;
};

const isFilterEmpty = (filterCategory) => {
  return filterCategory.length === 0;
};

// filter, pet -> bool
const petMatch = (filters, pet) => {
  for (filterKey in filters) {
    if (!isFilterEmpty(filters[filterKey])) {
      if (!fineOne(filters[filterKey], pet[filterKey])) {
        return false
      }
    }
  }
  return true;
};

const fineOne = (haystack, arr) => {
  if (typeof arr === "string") {
    arr = [arr]
  }
  return arr.some(v => {
    return haystack.indexOf(v) >= 0
  })
}

function populateSearchResults(currentPets, filter) {
  const pets = filterPets(currentPets, filter);
  console.log(pets);
  console.log(filter);
  const petHtml = Object.keys(pets)
    .map((key) => pets[key])

    .slice(0, 25)
    .map((pet) => {
      petLiteral = `
        <div class="card">
            <img class="card-imkg" src="${pet.imgUrls[2]}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${pet.name}</h5>
                <p class="card-text">Age: ${pet.age}</p>
                <p class="card-text">Breed: ${pet.breed[0]}</p>
                <button class = "learnMore" id = "${pet.id}">More about ${
        pet.name
      }</button>
            </div>
        </div> `
      return petLiteral
    })
  $("#results").html(
    petHtml.length > 0 ? petHtml.reduce((a, b) => a + b) : "No matching pets :("
  )
}

initPage().then(petData => {
  populateSearchResults(petData.currentPets, petFilters)
  setSheltersOnMap(petData.shelters)

  $("#btn-apply").click(e => {
    $("#results").html("")
    populateSearchResults(petData.currentPets, petFilters)
    initializeBreedFilter(petData, petFilters)
  })

  initializeBreedFilter(petData, petFilters)
  initializeTypeFilter(petData)
})

