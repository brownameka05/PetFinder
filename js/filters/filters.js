/**
 * Views
 */
const filtersContainer = document.getElementById('filters');

/**
 * Onclick Handlers
 */
const toggleFilter = (e) => {
  e.classList.toggle('change');
  filtersList.classList.toggle('open');
};

const renderFilteredPets = (e) => {
  populateSearchResults(petData.currentPets, petFilters);
};

const filtersHTML = /*html*/ `
<div id="filter-nav">
  <button class="btn-filter" onclick=toggleFilter(this)>
    <i class="fas fa-filter"></i>
  </button>
  <div id="filter-viewToggle">
    <button id="btn-listView" class="btn-filter"><i class="fas fa-list"></i></button> 
    <button id="btn-mapView" class="btn-filter"> 
    <i class="fas fa-map-marked-alt"></i>
    </button>
  </div>
</div> 

<div class="filters-list">
<div class="filter-animal">
<label class="filter-label"for="select-type">Type</label>
<select id="select-type" class="demo-default" multiple>
  <option value="">Select an animal type...</option>
  <option value="Dog">Dogs</option>
  <option value="Cat">Cats</option>
</select>
</div>

<div class="filter-breed">
<label class="filter-label"for="select-breed">Breed</label>
<select id="select-breed" class="demo-default" multiple>
  <option value="">Select a breed...</option>
</select>
</div>

<div class="filter-size">
<label class="filter-label"for="select-size">Size</label>
<select id="select-size" class="demo-default" multiple>
  <option value="">Size</option>
  <option value="S">Small</option>
  <option value="M">Medium</option>
  <option value="L">Large</option>
  <option value="XL">Extra Lage</option>
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
  <option value="F">Female</option>
  <option value="M">Male</option>
</select>
</div>

<div id="filter-location">
  <label class="filter-label"for="textbox-location">ZipCode</label>
  <input type="text" name="textbox-location" id="textbox-location">
</div>

<div id="apply-button">
  <button id="btn-apply">Apply</button>
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
  sortField: 'text',
  closeAfterSelect: true
};

const updateType = (msg) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        animal: [data, ...petFilters.animal]
      });
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        animal: petFilters.animal.filter((i) => i !== data)
      });
    }
  };
};

$('#select-type').selectize({
  ...selectizeConfig,
  onItemAdd: updateType('add'),
  onItemRemove: updateType('remove'),
  placeholder: 'Type'
});

const updateBreeds = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      breed: [data, ...petFilters.breed]
    });
  };
};

$('#select-breed').selectize({
  ...selectizeConfig,
  onItemAdd: updateBreeds(),
  placeholder: 'Breed',
  theme: 'links',
  maxItems: null,
  valueField: 'id',
  searchField: 'title',
  options: [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 }],
  render: {
    option: function(data, escape) {
      return (
        '<div class="option">' +
        '<span class="title">' +
        escape(data.name) +
        '</div>'
      );
    },
    item: function(data, escape) {
      return (
        '<div class="item"><a href="' +
        escape(data.url) +
        '">' +
        escape(data.title) +
        '</a></div>'
      );
    }
  }
});

const updateSizes = (msg) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        size: [data, ...petFilters.size]
      });
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        size: petFilters.size.filter((i) => i !== data)
      });
    }
  };
};

$('#select-size').selectize({
  ...selectizeConfig,
  onItemAdd: updateSizes('add'),
  onItemRemove: updateSizes('remove')
});

const updateSexes = (msg) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        sex: [data, ...petFilters.sex]
      });
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        sex: petFilters.sex.filter((i) => i !== data)
      });
    }
  };
};

$('#select-sex').selectize({
  ...selectizeConfig,
  onItemAdd: updateSexes('add'),
  onItemRemove: updateSexes('remove')
});

const updateAges = (msg) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        age: [data, ...petFilters.age]
      });
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        age: petFilters.age.filter((i) => i !== data)
      });
    }
  };
};

$('#select-age').selectize({
  ...selectizeConfig,
  onItemAdd: updateAges('add'),
  onItemRemove: updateAges('remove')
});

const updateLocation = () => {
  return function(data) {
    petFilters = setFilters(petFilters, {
      location: data
    });
  };
};

$('#btn-listView').click((e) => {
  $('#map').css('height', 0);
  $('#results').show();
});

$('#btn-mapView').click((e) => {
  $('#map').height('80vh');
  $('#results').hide();
});

// TODO: Make so only 1 input.

$('#textbox-location').selectize({
  ...selectizeConfig,
  create: true,
  onItemAdd: updateLocation(),
  placeholder: 'Zip'
});

/**
 *  State
 */
let petFilters = {
  animal: [],
  // breeds: [],
  size: [], // S, M, L or XL
  sex: [], // M or F
  age: [] // Baby, Young, Adult, Senior
};

const shelterFilters = {
  location: '', // zipCode
  name: '', // shelter name
  offset: ''
};

const setFilters = (filters, modFilter) => {
  return {
    ...filters,
    ...modFilter
  };
};
