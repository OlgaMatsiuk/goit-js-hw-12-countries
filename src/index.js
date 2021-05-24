import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/country-card.hbs';

import { error } from '../node_modules/@pnotify/core';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '../node_modules/@pnotify/confirm';
import '../node_modules/@pnotify/confirm/dist/PNotifyConfirm.css';


const debounce = require('lodash.debounce');
const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.js-input-search')
}
refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch (event){
    event.preventDefault();
    const searchQuery = event.target.value;
    fetchCountry(searchQuery)
    .then (list => {
        if (list.length === 1){
            renderCountryCard(list); 
        }
        if (list.length > 1 && list.length <= 10) {
            renderCountriesList(list);
        }
        if (list.length > 10) {
            refs.cardContainer.innerHTML = ' ';
            error ({
                text: 'Too many matches found. Please enter a more specific query!'
            })
        }
    })
    .catch(onError);
}


function fetchCountry (countryLetter) {
   return fetch(`https://restcountries.eu/rest/v2/name/${countryLetter}`).then(response => {
        return response.json();
    });
}


 function renderCountryCard (country){
    const markup=countryCardTpl(country);
    // console.log(markup);
    refs.cardContainer.innerHTML = markup;  
 }
  function renderCountriesList (countries) {
      const markup = countriesListTpl(countries);
      refs.cardContainer.innerHTML = markup;  

  }

  function onError() {
    error({
        text: 'No such country! Try again!',
        modules: new Map([
            [Confirm,
                {
                    confirm: true,
                    buttons: [{
                        text: "Ok",
                        primary: true,
                        click: notice => {
                            notice.close();
                        }
                }]}]
        ])
    })
}
