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
  <div id="btn-filter-container">
    <button class="btn-filter" onclick=toggleFilter(this)>
      <i class="fas fa-filter"></i>
    </button>
  </div>
  <div id="select-location-container">
    <form id="select-location-form">
    <input type="text" id="select-location" placeholder="zipcode">
    <button id="btn-search">Go</button>
    </form>
  </div>
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
  <option value="XL">Extra Large</option>
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

<div id="clear-button">
  <button id="btn-clear">Clear All</button>
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

const updateType = (msg, petData) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        animal: [data, ...petFilters.animal]
      });
      const $select = $('#select-breed').selectize();
      const control = $select[0].selectize;
      control.clearOptions();
      updateOptions(petData, petFilters, control);
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        animal: petFilters.animal.filter((i) => i !== data)
      });
      const $select = $('#select-breed').selectize();
      const control = $select[0].selectize;
      control.clearOptions();
      updateOptions(petData, petFilters, control);
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        animal: []
      });
      const $select = $('#select-breed').selectize();
      const control = $select[0].selectize;
      control.clearOptions();
      updateOptions(petData, petFilters, control);
    }
  };
};

const initializeTypeFilter = (petData) => {
  $('#select-type').selectize({
    ...selectizeConfig,
    onItemAdd: updateType('add', petData),
    onItemRemove: updateType('remove', petData),
    onClear: updateType('clear', petData),
    placeholder: 'Type'
  });
};

const updateBreeds = (msg) => {
  return function(data) {
    if (msg === 'add') {
      petFilters = setFilters(petFilters, {
        breed: [data, ...petFilters.breed]
      });
    } else if (msg === 'remove') {
      petFilters = setFilters(petFilters, {
        breed: petFilters.breed.filter((i) => i !== data)
      });
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        breed: []
      });
    }
  };
};

const toBreedObj = (vs) => {
  return vs.map((v) => ({ breed: v }));
};

const updateOptions = ({ dogBreeds, catBreeds }, petFilters, controller) => {
  const catBreedObj = toBreedObj(catBreeds);
  const dogBreedObj = toBreedObj(dogBreeds);
  let options = [...catBreedObj, ...dogBreedObj];
  if (petFilters.animal.length === 1) {
    if (petFilters.animal[0] === 'Cat') {
      options = [...catBreedObj];
    } else if (petFilters.animal[0] === 'Dog') {
      options = [...dogBreedObj];
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        size: []
      });
    }
  }
  options.forEach((option) => controller.addOption(option));
};

const initializeBreedFilter = ({ dogBreeds, catBreeds }, petFilters) => {
  const catBreedObj = toBreedObj(catBreeds);
  const dogBreedObj = toBreedObj(dogBreeds);
  let options = [...catBreedObj, ...dogBreedObj];
  if (petFilters.animal.length === 1) {
    if (petFilters.animal[0] === 'Cat') {
      options = [...catBreedObj];
    } else if (petFilters.animal[0] === 'Dog') {
      options = [...dogBreedObj];
    }
  }
  $('#select-breed').selectize({
    ...selectizeConfig,
    onItemAdd: updateBreeds('add'),
    onItemRemove: updateBreeds('remove'),
    onClear: updateBreeds('clear'),
    placeholder: 'Breed',
    options: options,
    maxItems: null,
    valueField: 'breed',
    labelField: 'breed',
    searchField: ['breed']
  });
};

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
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        size: []
      });
    }
  };
};

$('#select-size').selectize({
  ...selectizeConfig,
  onItemAdd: updateSizes('add'),
  onItemRemove: updateSizes('remove'),
  onClear: updateSizes('clear')
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
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        sex: []
      });
    }
  };
};

$('#select-sex').selectize({
  ...selectizeConfig,
  onItemAdd: updateSexes('add'),
  onItemRemove: updateSexes('remove'),
  onClear: updateSexes('clear')
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
    } else if (msg === 'clear') {
      petFilters = setFilters(petFilters, {
        age: []
      });
    }
  };
};

$('#select-age').selectize({
  ...selectizeConfig,
  onItemAdd: updateAges('add'),
  onItemRemove: updateAges('remove'),
  onClear: updateAges('clear')
});

const updateLocation = () => {
  return function(data) {
    shelterFilters = setFilters(shelterFilters, {
      location: data
    })
    console.log(shelterFilters)
  }
}

$('#textbox-location').selectize({
  ...selectizeConfig,
  create: true,
  onItemAdd: updateLocation(),
  placeholder: 'Zip'
});

$('#btn-clear').click((e) => {
  const selectors = [
    '#select-sex',
    '#select-age',
    '#select-type',
    '#select-breed',
    '#select-size'
  ];
  selectors.forEach((element) => {
    let $select = $(element).selectize();
    let control = $select[0].selectize;
    control.clear((silent = false));
  });
});

$('#btn-listView').click((e) => {
  $('#map').css('height', 0);
  $('#results').show();
  $('#container-next-btn').show();
});

$('#btn-mapView').click((e) => {
  $('#map').height('80vh');
  $('#results').hide();
  $('#container-next-btn').hide();
});

/**
 *  State
 */
let petFilters = {
  animal: [],
  breed: [],
  size: [], // S, M, L or XL
  sex: [], // M or F
  age: [] // Baby, Young, Adult, Senior
};

var shelterFilters = {
  location: "", // zipCode
  name: "", // shelter name
  offset: ""
}

const setFilters = (filters, modFilter) => {
  return {
    ...filters,
    ...modFilter
  };
};
