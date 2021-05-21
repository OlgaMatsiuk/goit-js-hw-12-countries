import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.js-input-search')
}
refs.searchInput.addEventListener('input',onSearch);

function onSearch (event){
    event.preventDefault();

    fetchCountry()
    .then (renderCountryCard)
    .catch(error => console.log(error));


 const searchQuery = event.currentTarget.value;
}



function fetchCountry (countryLetter) {
   return fetch(`https://restcountries.eu/rest/v2/name/${countryLetter}`).then(response => {
        return response.json();
    });
}


 function renderCountryCard (country){
    const markup=countryCardTpl(country);
    console.log(markup);
    refs.cardContainer.innerHTML = markup;  
 }

