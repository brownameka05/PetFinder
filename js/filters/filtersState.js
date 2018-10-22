let petFilters = {
  key: "",
  animals: [],
  breeds: [],
  sizes: [], // S, M, L or XL
  sexes: [], // M or F
  location: "", // zipcode
  ages: [], // Baby, Young, Adult, Senior
  offset: "", // set this to the value of lastOffset returned by a previous call to pet.find, and it will retrieve the next result set
  count: 25,
  output: "full", // or basic
  format: "json"
}

const shelterFilters = {
  key: "",
  location: "", // zipCode
  name: "", // shelter name
  offset: "",
  count: 25,
  format: "json"
}

const searchViewState = {
  map: false,
  list: true
}

const availibleBreeds = []
const availibleShelters = []

const setFilters = (filters, modFilter) => {
  return {
    ...filters,
    ...modFilter
  }
}
