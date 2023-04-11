import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const countriesEl = document.querySelector(`.country-list`);
const countryEl = document.querySelector(`.country-info`);
const check = document.querySelector(`#search-box`);
check.addEventListener(`input`, debounce(mechanikal, 300));
function mechanikal(event) {
  if (event.target.value.trim() !== ``) {
    fetchCountries(event.target.value.trim())
      .then(responce => {
        return responce.json();
      })
      .then(resp2 => {
        workingCountries(resp2);
      })
      .catch(error => {
        Notiflix.Notify.failure(error.message);
        countryEl.innerHTML = ``;
        countriesEl.innerHTML = ``;
      });
  } else {
  }
}
function workingCountries(resultCountries) {
  if (resultCountries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (resultCountries.length >= 2) {
    renderCountries(resultCountries);
  } else {
    renderCountry(resultCountries[0]);
  }
}
function renderCountries(arrCuont) {
  let markUp = arrCuont
    .map(el => {
      return `<li class="view-countries">
        <img class="img" src="${el.flags.svg}" alt="flag" />
        <p class="title">${el.name.common}</p>
      </li>`;
    })
    .join('');
  countriesEl.innerHTML = markUp;
  countryEl.innerHTML = ``;
}
function renderCountry(onlyOneCounty) {
  let markUp = `<img class="img" src="${onlyOneCounty.flags.svg}" alt="" />
      <p class="title">${onlyOneCounty.name.common}</p>
      <ul>
        <li>Capital: ${onlyOneCounty.capital}</li>
        <li>Population: ${onlyOneCounty.population}</li>
        <li>Languages: ${Object.values(onlyOneCounty.languages)}</li>
      </ul>
`;
  countryEl.innerHTML = markUp;
  countriesEl.innerHTML = ``;
}
