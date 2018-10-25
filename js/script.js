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
  })

  initializeBreedFilter(petData)
})
