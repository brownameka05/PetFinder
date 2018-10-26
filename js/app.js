// Initialize Page Data
const initPage = async () => {
  let petData = {};
  petData.dogBreeds = await getAllBreedsOf('dog');
  petData.catBreeds = await getAllBreedsOf('cat');
  petData.currentPets = await getPetsAtLocation('77025');
  petData.shelters = await getSheltersAtLocation('77025');
  return petData;
};

initPage()
  .then((petData) => {
    populateSearchResults(
      petData.currentPets,
      petFilters,
      offSetState.from,
      offSetState.to
    );
    setSheltersOnMap(petData.shelters);

    $('#btn-apply').click((e) => {
      $('#results').html('');
      populateSearchResults(petData.currentPets, petFilters);
      initializeBreedFilter(petData, petFilters);
      console.log(shelterFilters);
    });

    $('#btn-next').click((e) => {
      $('#results').html('');
      offSetState = setOffSet(offSetState, 24);
      setBackButtonCSS();
      populateSearchResults(
        petData.currentPets,
        petFilters,
        offSetState.from,
        offSetState.to
      );
    });

    $('#btn-back').click((e) => {
      $('#results').html('');
      offSetState = setOffSet(offSetState, 24, 'back');
      setBackButtonCSS();
      populateSearchResults(
        petData.currentPets,
        petFilters,
        offSetState.from,
        offSetState.to
      );
    });

    initializeBreedFilter(petData, petFilters);
    initializeTypeFilter(petData);
  })
  .catch((err) => console.log(err));
