// Document Selectors
const typeSelector = document.getElementById("select-type")
const breedSelector = document.getElementById("select-breed")
const sizeSelector = document.getElementById("select-size")
const sexSelector = document.getElementById("select-sex")
const locationSelector = document.getElementById("textbox-location")
const listViewButton = document.getElementById("filters-list")
const mapViewButton = document.getElementById("filters-map")
const filtersList = document.getElementsByClassName("filters-list")[0]

const selectizeConfig = {
  plugins: ["remove_button", "restore_on_backspace"],
  sortField: "text"
}

const updateType = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      animals: [data, ...petFilters.animals]
    })
  }
}

$("#select-type").selectize({
  ...selectizeConfig,
  onItemAdd: updateType()
})

const updateBreeds = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      breeds: [data, ...petFilters.breeds]
    })
  }
}

$("#select-breed").selectize({
  ...selectizeConfig,
  onItemAdd: updateBreeds()
})

const updateSizes = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      sizes: [data, ...petFilters.sizes]
    })
  }
}

$("#select-size").selectize({
  ...selectizeConfig,
  onItemAdd: updateSizes()
})

const updateSexes = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      sexes: [data, ...petFilters.sexes]
    })
  }
}

$("#select-sex").selectize({
  ...selectizeConfig,
  onItemAdd: updateSexes()
})

const updateAges = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      ages: [data, ...petFilters.ages]
    })
  }
}

$("#select-age").selectize({
  ...selectizeConfig,
  onItemAdd: updateAges()
})

const updateLocation = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      location: data
    })
  }
}

// TODO: Make so only 1 input.

$("#textbox-location").selectize({
  ...selectizeConfig,
  create: true,
  onItemAdd: updateLocation(),
  placeholder: "ZipCode"
})

const toggleBurger = e => {
  e.classList.toggle("change")
  filtersList.classList.toggle("open")
}
