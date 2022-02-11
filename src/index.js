import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputSearchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');

inputSearchBox.addEventListener('input', addNameCountry);

const fetchCountries = function (name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return renderCountriesList(data);
    });
};

function addNameCountry(event) {
  const country = event.currentTarget.value;
  fetchCountries(country);
}

function renderCountriesList(data) {
  console.log(data);
  const countryDetails = data.forEach(element => {
    console.log(element.name.official);
  });
}

//
