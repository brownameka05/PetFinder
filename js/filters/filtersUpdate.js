// Document Selectors
const typeSelector = document.getElementById("select-type")
const breedSelector = document.getElementById("select-breed")
const sizeSelector = document.getElementById("select-size")
const sexSelector = document.getElementById("select-sex")
const locationSelector = document.getElementById("textbox-location")
const listViewButton = document.getElementById("filters-list")
const mapViewButton = document.getElementById("filters-map")
const filtersList = document.getElementsByClassName("filters-list")[0]

const updateType = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      animals: [data, ...petFilters.animals]
    })
  }
}

$("#select-type").selectize({
  plugins: ["remove_button"],
  sortField: "text",
  create: true,
  // passes the value as the agument
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
  plugins: ["remove_button"],
  sortField: "text",
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
  plugins: ["remove_button"],
  sortField: "text",
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
  plugins: ["remove_button"],
  sortField: "text",
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
  plugins: ["remove_button"],
  sortField: "text",
  onItemAdd: updateAges()
})

const updateLocation = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      location: data
    })
  }
}

$("#textbox-location").selectize({
  plugins: ["remove_button"],
  sortField: "text",
  onItemAdd: updateLocation()
})

const toggleBurger = e => {
  e.classList.toggle("change")
  filtersList.classList.toggle("open")
}
