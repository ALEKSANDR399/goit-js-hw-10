import './css/styles.css';
import NewsApiService from './fetchCountries';
import markupSearch from './templates/markup-search.hbs';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const newApiService = new NewsApiService();

inputSearchBox.addEventListener('input', addInputToFetch);

function addInputToFetch(e) {
  newApiService.nameCountry = e.currentTarget.value;

  newApiService.fetchCountries().then(data => paramsCountry(data));
}

function paramsCountry(data) {
  return data
    .map(({ flags, name }) => {
      const { svg } = flags;
      const { official } = name;
      console.log(svg);
      console.log(official);
      return `<img src="${svg}" alt="flag">
      <h2>${official}</h2>`;
    })
    .join('');
}

countriesList.innerHTML('afterend', paramsCountry(data));
