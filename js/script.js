let allCountries = [];
let allFavorites = [];

let totalPopulation = 0;
let totalFavoritesPopulation = 0;

let totalCountries = 0;
let totalFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  const countriesTab = document.querySelector('.countriesTab');
  const favoritesTab = document.querySelector('.favoritesTab');

  const totalCountriesSpan = document.querySelector('.totalCountriesSpan');
  const totalFavoritesSpan = document.querySelector('.totalFavoritesSpan');

  const totalPopulationSpan = document.querySelector('.totalPopulationSpan');
  const totalFavoritesPopulationSpan = document.querySelector(
    '.totalFavoritesPopulationSpan'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  allCountries = json.map((country) => {
    const { translations, numericCode, flag, population } = country;

    return {
      name: translations.br,
      id: numericCode,
      flag,
      population,
    };
  });
  render();
}

function render() {
  renderCountries();
  renderFavorites();
  renderSummary();
  handleCountriesButtons();
}

function renderCountries() {}
function renderFavorites() {}
function renderSummary() {}
function handleCountriesButtons() {}
