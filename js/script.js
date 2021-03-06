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
      if (!fineOne(filters[filterKey], pet[filterKey])) {
        return false
      }
    }
  }
  return true
}

const fineOne = (haystack, arr) => {
  if (typeof arr === "string") {
    arr = [arr]
  }
  return arr.some(v => {
    return haystack.indexOf(v) >= 0
  })
}

function populateSearchResults(currentPets, filter, from, to) {
  const pets = filterPets(currentPets, filter)
  const petHtml = Object.keys(pets)
    .map(key => pets[key])
    .slice(from, to)
    .map(pet => {
      petLiteral = `
        <div class="card">
            <div class="card-img-container">
              <img class="card-img" src="${
                pet.imgUrls ? pet.imgUrls[3] : "#"
              }" alt="Card image cap">
            </div>
            <div class="card-body">
              <div class="card-info">
                <div class="card-title">${pet.name}</div>
                <div class="card-text">Age: ${pet.age}</div> 
                <div class="card-text">Breed: ${pet.breed[0]}</div>
              </div>
              <div class="btn-wrap">
                <button class="btn-card-moreInfo" onclick="popUpInfo(\'${
                  pet.id
                }\')"">More about ${pet.name}</button>
              </div>
            </div>
        </div> `

      return petLiteral
    })
  $("#results").html(
    petHtml.length > 0 ? petHtml.reduce((a, b) => a + b) : noMoreResultsHTML
  )
}
