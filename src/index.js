import './css/styles.css';
import NewsApiService from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countriesCards from './templates/countries-cards.hbs';
import countryCardInfo from './templates/country-card-info.hbs';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const infoAboutCountry = document.querySelector('.country-info');
const newApiService = new NewsApiService();

inputSearchBox.addEventListener('input', debounce(addInputToFetch, DEBOUNCE_DELAY));

function addInputToFetch(e) {
  newApiService.nameCountry = e.target.value;

  newApiService.fetchCountries().then(data => {
    if (data === undefined) {
      infoAboutCountry.innerHTML = '';
      countriesList.innerHTML = '';
      return Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    if (data.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (data.length === 1) {
      countriesList.innerHTML = '';
      return (infoAboutCountry.innerHTML = countryCardInfo(data));
      // paramsForCountry(data);
    }
    if (data.length >= 2 && data.length <= 10) {
      infoAboutCountry.innerHTML = '';
      countriesList.insertAdjacentHTML('beforeend', countriesCards(data));
      // paramsCountry(data);
    }
  });
}

// function paramsCountry(data) {
//   const markup = data
//     .map(({ flags, name }) => {
//       const { svg } = flags;
//       const { official } = name;

//       return `<li class="country-list__item"><img class="country-list__img"src="${svg}" alt="flag" width="40" height="20">
//     <h2>${official}</h2></li>`;
//     })
//     .join('');

//   countriesList.insertAdjacentHTML('beforeend', markup);
// }

// function paramsForCountry(data) {
//   const markup = data
//     .map(({ flags, name, capital, population, languages }) => {
//       const { svg } = flags;
//       const { official } = name;
//       const languagesDifferentCountries = Object.values(languages).join(', ');
//       return `<div class="country-info__box"><img class="country-list__img" src="${svg}" alt="flag" width="30">
//     <h2 class="country-list__title">${official}</h2></div>
//     <div class="country-info__text"><p><b>Capital:</b> ${capital}</p>
//     <p><b>Population:</b> ${population}</p>
//     <p><b>Languages:</b> ${languagesDifferentCountries}</p></div>`;
//     })
//     .join('');

//   infoAboutCountry.insertAdjacentHTML('afterbegin', markup);
// }
