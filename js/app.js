// Initialize Page Data
const getData = async loc => {
  let petData = {}
  petData.dogBreeds = await getAllBreedsOf("dog")
  petData.catBreeds = await getAllBreedsOf("cat")
  petData.currentPets = await getPetsAtLocation(loc)
  petData.shelters = await getSheltersAtLocation(loc)
  return petData
}

const setBackButtonCSS = offSetState => {
  if (offSetState.from === 0) {
    $("#btn-back").css("background", "lightgray")
    $("#btn-back:active").css("background", "lightgray")
  } else {
    $("#btn-back").css("background", "#343a40")
  }
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
    setBackButtonCSS(offSetState)
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
    setBackButtonCSS(offSetState)
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
    getIniticalLocation()
  })
}

$("#select-location-form").submit(e => {
  e.preventDefault()
  $("#errorDogContainer").hide()
  if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.currentTarget[0].value)) {
    $("#select-location").removeClass("error-border")
    $("#input-error-message").hide()

    shelterFilters = setFilters(shelterFilters, {
      location: e.currentTarget[0].value
    })
    offSetState = resetOffSetState()
    setBackButtonCSS(offSetState)

    $("#btn-filters").click(function(e) {
      toggleFilter(e.target)
    })
    if ($("#map").height() === 0) {
      $("#ball-container").show()
    }

    updateMapFromZip(shelterFilters.location)
    search(shelterFilters.location)
  } else {
    $("#input-error-message").show()
    $("#select-location").addClass("error-border")
  }
})

const onLoad = () => {
  $("#ball-container").hide()
  $("#input-error-message").hide()
}

onLoad()
