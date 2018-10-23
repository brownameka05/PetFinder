// ! key and secret are provided from"secrets.js" not included in version control.
// "http://api.petfinder.com/my.method?key=12345&arg1=foo"

const BASE_URL = "http://api.petfinder.com/"
const METHODS = {
  breedList: "breed.list", // returns a list of breeds for a particular animal
  getPet: "pet.get", // returns a pet
  getPets: "pet.find", // returns a collection of pets
  getShelters: "shelter.find", // returns a collection of shelters
  getShelter: "shelter.get" // returns a shelter
}

// filters -> query string
const createQuery = (method, key, args) => {
  return `${BASE_URL}${method}?format=json&key=${key}&${args}`
}

// animal ("dog" or "cat") -> Promise(breeds list)
const getAllBreedsOf = async animal => {
  const query = createQuery(METHODS.breedList, key, `animal=${animal}`)
  return fetch(query)
    .then(res => res.json())
    .then(json => json.petfinder.breeds.breed.map(obj => Object.values(obj)[0]))
}

// location, offset, count -> json/object
const getPetsAtLocation = (location, offset = 0, count = 100) => {
  const query = createQuery(
    METHODS.getPets,
    key,
    `location=${location}&offset=${offset}&count=${count}`
  )
  return fetch(query)
    .then(res => res.json())
    .then(json => {
      return [json.petfinder.pets.pet, offset + count]
    })
}

// location, offset, count -> json/object
const getSheltersAtLocation = (location, offset = 0, count = 25) => {
  const query = createQuery(
    METHODS.getShelters,
    key,
    `location=${location}&offset=${offset}&count=${count}`
  )
  return fetch(query)
    .then(res => res.json())
    .then(json => json.petfinder.shelters.shelter)
    .then(sheltersList =>
      sheltersList.map(flattenShelterObj).map(convertLonLat)
    )
}

// Helpers
const flattenShelterObj = shelter => {
  const shelterKeys = Object.keys(shelter)
  return shelterKeys.reduce((obj, key) => {
    obj[key] = shelter[key] ? Object.values(shelter[key])[0] : ""
    return obj
  }, {})
}

const convertLonLat = shelterObj => {
  shelterObj.longitude = parseFloat(shelterObj.longitude)
  shelterObj.latitude = parseFloat(shelterObj.latitude)
  return shelterObj
}

// Tests
getSheltersAtLocation("77025").then(data => console.log(data))
console.log("hello")
