export default class NewsApiService {
  constructor() {
    this.country = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.country}?fields=name,capital,population,flags,languages`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  get nameCountry() {
    return this.country;
  }
  set nameCountry(newCountry) {
    this.country = newCountry;
  }
}
