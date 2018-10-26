// Initialize Page Data
const getData = async loc => {
  let petData = {}
  petData.dogBreeds = await getAllBreedsOf("dog")
  petData.catBreeds = await getAllBreedsOf("cat")
  petData.currentPets = await getPetsAtLocation(loc)
  petData.shelters = await getSheltersAtLocation(loc)
  return petData
}

const setUpButtons = petData => {
  $("#btn-apply").click(e => {
    $("#results").html("")
    populateSearchResults(
      petData.currentPets,
      petFilters,
      offSetState.from,
      offSetState.to
    )
    initializeBreedFilter(petData, petFilters)
    updateMapFromZip(shelterFilters.location)
  })

  $("#btn-next").click(e => {
    $("#results").html("")
    offSetState = setOffSet(offSetState, 24)
    setBackButtonCSS()
    populateSearchResults(
      petData.currentPets,
      petFilters,
      offSetState.from,
      offSetState.to
    )
  })

  $("#btn-back").click(e => {
    $("#results").html("")
    offSetState = setOffSet(offSetState, 24, "back")
    setBackButtonCSS()
    populateSearchResults(
      petData.currentPets,
      petFilters,
      offSetState.from,
      offSetState.to
    )
  })
}

const search = loc => {
  getData(loc).then(petData => {
    $("#ball-container").hide()
    populateSearchResults(
      petData.currentPets,
      petFilters,
      offSetState.from,
      offSetState.to
    )
    setSheltersOnMap(petData.shelters)
    initializeBreedFilter(petData, petFilters)
    initializeTypeFilter(petData)
    setUpButtons(petData)
  })
}

$("#select-location-form").submit(e => {
  e.preventDefault()
  shelterFilters = setFilters(shelterFilters, {
    location: e.currentTarget[0].value
  })
  shelterFilters = setFilters(shelterFilters, {
    from: 0,
    to: 24
  })
  $("#btn-filters").click(function(e) {
    toggleFilter(e.target)
  })
  if ($("#map").height() === 0) {
    $("#ball-container").show()
  }
  updateMapFromZip(shelterFilters.location)
  search(shelterFilters.location)
})

const onLoad = () => {
  $("#ball-container").hide()
}

onLoad()
