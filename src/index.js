import './css/styles.css';
import NewsApiService from './fetchCountries';
import markupSearch from './templates/markup-search.hbs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const newApiService = new NewsApiService();

inputSearchBox.addEventListener('input', debounce(addInputToFetch, DEBOUNCE_DELAY));

function addInputToFetch(e) {
  newApiService.nameCountry = e.target.value;

  newApiService.fetchCountries().then(data => {
    if (e.target.value.length === 1) {
      return alert('Too many matches found. Please enter a more specific name.');
    }
    paramsCountry(data);
  });
}

function paramsCountry(data) {
  const markup = data
    .map(({ flags, name }) => {
      const { svg } = flags;
      const { official } = name;

      return `<img src="${svg}" alt="flag" width="60">
    <h2>${official}</h2>`;
    })
    .join('');

  countriesList.insertAdjacentHTML('beforeend', markup);
}
