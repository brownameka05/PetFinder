const filterPets = (currentPets, filter) => {
  if (areFiltersEmpty(filter)) {
    return currentPets
  }
  return Object.keys(currentPets)
    .map(function(key) {
      return currentPets[key]
    })
    .filter(pet => petMatch(filter, pet))
}

const areFiltersEmpty = obj => {
  let isEmpty = true
  for (k in obj) {
    if (obj[k].length !== 0) {
      isEmpty = false
    }
  }
  return isEmpty
}

const isFilterEmpty = filterCategory => {
  return filterCategory.length === 0
}

// filter, pet -> bool
const petMatch = (filters, pet) => {
  for (filterKey in filters) {
    if (!isFilterEmpty(filters[filterKey])) {
      if (!filters[filterKey].includes(pet[filterKey])) {
        return false
      }
    }
  }
  return true
}

function populateSearchResults(currentPets, filter) {
  const pets = filterPets(currentPets, filter)
  const petHtml = Object.keys(pets)
    .map(key => pets[key])
    .slice(0, 25)
    .map(pet => {
      petLiteral = `
        <div class="card">
            <img class="card-imkg" src="https://lh5.googleusercontent.com/-2cuebuSKiRU/AAAAAAAAAAI/AAAAAAAAAEU/PibNivK-4U4/photo.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${pet.name}</h5>
                <p class="card-text">Age: ${pet.age}</p>
                <button class = "learnMore" id = "${
                  pet.id
                }">More about ${pet.name}</button>
            </div>
        </div> `
        return petLiteral
      //$("#results").append(petLiteral)
    })
    console.log(petHtml.length)
    $("#results").html(petHtml.reduce((a, b) => a + b))
}

initPage().then(petData => {
  populateSearchResults(petData.currentPets, petFilters)
  setSheltersOnMap(petData.shelters)

  $("#btn-apply").click((e) => {
    console.log("clicked")
    $("#results").html("")
    populateSearchResults(petData.currentPets, petFilters)})

})