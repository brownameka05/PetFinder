// ! key and secret are provided from"secrets.js" not included in version control.
// "http://api.petfinder.com/my.method?key=12345&arg1=foo"

const BASE_URL = 'http://api.petfinder.com/';
const METHODS = {
  breedList: 'breed.list', // returns a list of breeds for a particular animal
  getPet: 'pet.get', // returns a pet
  getPets: 'pet.find', // returns a collection of pets
  getShelters: 'shelter.find', // returns a collection of shelters
  getShelter: 'shelter.get' // returns a shelter
};
const FETCH_CONFIG = {};

// filters -> query string
const createQuery = (method, key, args) => {
  return `${BASE_URL}${method}?format=json&key=${key}&${args}&callback=?`;
};

// animal ("dog" or "cat") -> Promise(breeds list)
const getAllBreedsOf = async (animal) => {
  const query = createQuery(METHODS.breedList, key, `animal=${animal}`);
  return $.getJSON(query)
    .then((json) =>
      json.petfinder.breeds.breed.map((obj) => Object.values(obj)[0])
    )
    .catch((err) => console.log(err));
};

// location, offset, count -> Promise(object)
const getPetsAtLocation = (
  location,
  offset = queryParams.offsetPets,
  count = queryParams.nPets
) => {
  const query = createQuery(
    METHODS.getPets,
    key,
    `location=${location}&offset=${offset}&count=${count}`
  );
  return $.getJSON(query)
    .then((json) => json.petfinder.pets.pet)
    .then((pets) => pets.map(flattenPetObj))
    .then((pets) => pets.map((pet) => extractImages(pet)))
    .then((pets) => pets.map((pet) => extractBreeds(pet)))
    .catch((err) => console.log(err));
};
const extractImages = (pet) => {
  pet.imgUrls = pet.media.photos
    ? pet.media.photos.photo.map((photo) => photo['$t'])
    : undefined;
  return pet;
};

const extractBreeds = (pet) => {
  pet.breed = pet.breeds.breed.length
    ? pet.breeds.breed.map((obj) => obj['$t'])
    : [pet.breeds.breed['$t']];
  return pet;
};

// location, offset, count -> Promise(object)
const getSheltersAtLocation = (
  location,
  offset = queryParams.offsetShelters,
  count = queryParams.nShelters
) => {
  const query = createQuery(
    METHODS.getShelters,
    key,
    `location=${location}&offset=${offset}&count=${count}`
  );
  return $.getJSON(query)
    .then((json) => json.petfinder.shelters.shelter)
    .then((sheltersList) =>
      sheltersList.map(flattenShelterObj).map(convertLonLat)
    );
};

// Helpers
const flattenShelterObj = (shelter) => {
  const shelterKeys = Object.keys(shelter);
  return shelterKeys.reduce((obj, key) => {
    obj[key] = shelter[key] ? Object.values(shelter[key])[0] : '';
    return obj;
  }, {});
};

const flattenPetObj = (pet) => {
  const petKeys = Object.keys(pet);
  return petKeys.reduce((obj, key) => {
    if (Object.keys(pet[key]).includes('$t')) {
      obj[key] = Object.values(pet[key])[0];
    } else {
      obj[key] = pet[key];
    }
    return obj;
  }, {});
};

const convertLonLat = (shelterObj) => {
  shelterObj.longitude = parseFloat(shelterObj.longitude);
  shelterObj.latitude = parseFloat(shelterObj.latitude);
  return shelterObj;
};
