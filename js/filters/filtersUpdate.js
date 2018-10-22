// Document Selectors
const catCheckbox = document.getElementById("checkbox-cat")
const dogCheckbox = document.getElementById("checkbox-dog")
const breedTextBox = document.getElementById("textbox-breed")
const sizeSelector = document.getElementById("select-size")
const sexSelector = document.getElementById("select-sex")
const locationSelector = document.getElementById("textbox-location")
const listViewButton = document.getElementById("filters-list")
const mapViewButton = document.getElementById("filters-map")

dogCheckbox.addEventListener("change", e => {
  petFilters = setFilters(petFilters, {
    animal: {
      dog: !petFilters.animal.dog,
      cat: petFilters.animal.cat
    }
  })
})

catCheckbox.addEventListener("change", e => {
  petFilters = setFilters(petFilters, {
    animal: {
      dog: petFilters.animal.dog,
      cat: !petFilters.animal.cat
    }
  })
})
