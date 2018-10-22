// Document Selectors
const typeSelector = document.getElementById("select-type")
const breedSelector = document.getElementById("select-breed")
const sizeSelector = document.getElementById("select-size")
const sexSelector = document.getElementById("select-sex")
const locationSelector = document.getElementById("textbox-location")
const listViewButton = document.getElementById("filters-list")
const mapViewButton = document.getElementById("filters-map")

typeSelector.addEventListener("change", e => {
  console.log(e.target)
  // setFilters(petFilters, {})
})

const eventHandler = (filterObj, field) => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      field: [data, ...filterObj[field]]
    })
  }
}

$("#select-type").selectize({
  plugins: ["remove_button"],
  sortField: "text",
  create: true,
  // passes the value as the agument
  onItemAdd: eventHandler(petFilters, "animals")
})

$("#select-breed").selectize({
  plugins: ["remove_button"],
  sortField: "text"
})

$("#select-size").selectize({
  plugins: ["remove_button"],
  sortField: "text"
})

$("#select-sex").selectize({
  plugins: ["remove_button"],
  sortField: "text"
})

$("#select-age").selectize({
  plugins: ["remove_button"],
  sortField: "text"
})
