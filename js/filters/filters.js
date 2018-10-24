/**
 * Views
 */
const filtersContainer = document.getElementById('filters');

// <div id="burger-btn" onclick=toggleBurger(this)>
//   <div id="burger-top"></div>
//   <div id="burger-mid"></div>
//   <div id="burger-bot"></div>
// </div>
/* <div id="filter-filtersToggle" onclick=toggleBurger(this)>
    <button class="btn-filter">Filters</button>
    </div> */

const toggleBurger = (e) => {
  e.classList.toggle('change');
  filtersList.classList.toggle('open');
};

const filtersHTML = /*html*/ `

<div id="filter-nav">
<div id="burger-btn" onclick=toggleBurger(this)>
  <div id="burger-top"></div>
  <div id="burger-mid"></div>
  <div id="burger-bot"></div>
</div>
  <div id="filter-viewToggle">
    <button class="btn-filter">List</button>
    <button class="btn-filter">Map</button>
  </div>
</div> 

<div class="filters-list">
<div class="filter-animal">
<label class="filter-label"for="select-type">Type</label>
<select id="select-type" class="demo-default" multiple>
  <option value="">Select an animal type...</option>
  <option value="dog">Dogs</option>
  <option value="cat">Cats</option>
</select>
</div>

<div class="filter-breed">
<label class="filter-label"for="select-breed">Breed</label>
<select id="select-breed" class="demo-default" multiple>
  <option value="">Select a breed...</option>
  <option value="a">Pit Bull</option>
  <option value="b">Boxer</option>
  <option value="c">Huskey</option>
</select>
</div>

<div class="filter-size">
<label class="filter-label"for="select-size">Size</label>
<select id="select-size" class="demo-default" multiple>
  <option value="">Size</option>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="extraLarge">Extra Lage</option>
</select>
</div>

<div class="filter-age">
  <label class="filter-label"for="select-age">Age</label>
  <select id="select-age" class="demo-default" multiple>
    <option value="">Age<option>
    <option value="Baby">Baby</option>
    <option value="Young">Young</option>
    <option value="Adult">Adult</option>
    <option value="Senior">Senior</option>
  </select>
</div>

<div class="filter-sex">
<label class="filter-label" for="select-sex">Sex</label>
<select id="select-sex" class="demo-default" multiple>
  <option value="">Sex<option>
  <option value="female">Female</option>
  <option value="male">Male</option>
</select>
</div>

<div id="filter-location">
  <label class="filter-label"for="textbox-location">ZipCode</label>
  <input type="text" name="textbox-location" id="textbox-location">
</div>
</div>
    `;

filtersContainer.innerHTML = filtersHTML;

/**
 * Update
 */
const typeSelector = document.getElementById('select-type');
const breedSelector = document.getElementById('select-breed');
const sizeSelector = document.getElementById('select-size');
const sexSelector = document.getElementById('select-sex');
const locationSelector = document.getElementById('textbox-location');
const listViewButton = document.getElementById('filters-list');
const mapViewButton = document.getElementById('filters-map');
const filtersList = document.getElementsByClassName('filters-list')[0];

const selectizeConfig = {
  plugins: ['remove_button', 'restore_on_backspace'],
  sortField: 'text'
};

const updateType = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      animals: [data, ...petFilters.animals]
    });
  };
};

$('#select-type').selectize({
  ...selectizeConfig,
  onItemAdd: updateType()
});

const updateBreeds = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      breeds: [data, ...petFilters.breeds]
    });
  };
};

$('#select-breed').selectize({
  ...selectizeConfig,
  onItemAdd: updateBreeds()
});

const updateSizes = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      sizes: [data, ...petFilters.sizes]
    });
  };
};

$('#select-size').selectize({
  ...selectizeConfig,
  onItemAdd: updateSizes()
});

const updateSexes = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      sexes: [data, ...petFilters.sexes]
    });
  };
};

$('#select-sex').selectize({
  ...selectizeConfig,
  onItemAdd: updateSexes()
});

const updateAges = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      ages: [data, ...petFilters.ages]
    });
  };
};

$('#select-age').selectize({
  ...selectizeConfig,
  onItemAdd: updateAges()
});

const updateLocation = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      location: data
    });
  };
};

// TODO: Make so only 1 input.

$('#textbox-location').selectize({
  ...selectizeConfig,
  create: true,
  onItemAdd: updateLocation(),
  placeholder: 'ZipCode'
});

/**
 *  State
 */
let petFilters = {
  key: '',
  animals: [],
  breeds: [],
  sizes: [], // S, M, L or XL
  sexes: [], // M or F
  location: '', // zipcode
  ages: [], // Baby, Young, Adult, Senior
  offset: '', // set this to the value of lastOffset returned by a previous call to pet.find, and it will retrieve the next result set
  count: 25,
  output: 'full', // or basic
  format: 'json'
};

const shelterFilters = {
  key: '',
  location: '', // zipCode
  name: '', // shelter name
  offset: '',
  count: 25,
  format: 'json'
};

const searchViewState = {
  map: false,
  list: true
};

const setFilters = (filters, modFilter) => {
  return {
    ...filters,
    ...modFilter
  };
};
