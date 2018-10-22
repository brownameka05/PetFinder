let petFilters = {
  key: "",
  animal: {
    dog: false,
    cat: false
  },
  breed: "",
  size: "", // S, M, L or XL
  sex: "", // M or F
  location: "", // zipcode
  age: "", // Baby, Young, Adult, Senior
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

const filterSearchView = {
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
