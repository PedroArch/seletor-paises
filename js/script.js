let allCountries = [];
let allFavorites = [];

let totalPopulation = 0;
let totalFavoritesPopulation = 0;

let totalCountries = 0;
let totalFavorites = 0;

let numberFormat = null;

let countriesTab = null;
let favoritesTab = null;
let totalCountriesSpan = null;
let totalFavoritesSpan = null;

let totalPopulationSpan = null;
let totalFavoritesPopulationSpan = null;

let countriesButtons = null;
let favoriteButtons = null;

window.addEventListener("load", () => {
  countriesTab = document.querySelector(".countriesTab");
  favoritesTab = document.querySelector(".favoritesTab");

  totalCountriesSpan = document.querySelector(".totalCountriesSpan");
  totalFavoritesSpan = document.querySelector(".totalFavoritesSpan");

  totalPopulationSpan = document.querySelector(".totalPopulationSpan");
  totalFavoritesPopulationSpan = document.querySelector(
    ".totalFavoritesPopulationSpan"
  );

  numberFormat = Intl.NumberFormat("pt-BR");

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await res.json();

  allCountries = json
    .map((country) => {
      const { translations, numericCode, flag, population } = country;

      return {
        name: translations.br,
        id: numericCode,
        flag,
        population,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  render();
}

function render() {
  renderCountries();
  renderFavorites();
  renderSummary();
  handleCountriesButtons();
}

function renderCountries() {
  let countriesHTML = "<div>";

  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;

    const countryHTML = `
    <div class='country'>
      <div>
        <a id="${id}"class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" class="flag"  alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formatNumber(population)}</li>
        </ul>
      </div>
    </div>
    
    `;

    countriesHTML += countryHTML;
  });
  countriesHTML += "</div>";
  countriesTab.innerHTML = countriesHTML;
}
function renderFavorites() {
  let favoritesHTML = "<div>";

  allFavorites.forEach((country) => {
    const { name, flag, id, population } = country;
    const favoriteHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" class="flag"  alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formatNumber(population)}</li>
        </ul>
      </div>
    </div>
    
    `;

    favoritesHTML += favoriteHTML;
  });
  favoritesHTML += "</div>";
  favoritesTab.innerHTML = favoritesHTML;
}

function renderSummary() {
  totalCountriesSpan.textContent = allCountries.length;
  totalFavoritesSpan.textContent = allFavorites.length;

  totalPopulationSpan.textContent = formatNumber(
    allCountries.reduce((acc, current) => {
      return acc + current.population;
    }, 0)
  );

  totalFavoritesPopulationSpan.textContent = formatNumber(
    allFavorites.reduce((acc, current) => {
      return acc + current.population;
    }, 0)
  );
}

function handleCountriesButtons() {
  const CountryButtons = Array.from(countriesTab.querySelectorAll(".btn"));
  const FavoriteButtons = Array.from(favoritesTab.querySelectorAll(".btn"));

  CountryButtons.forEach((button) => {
    button.addEventListener("click", () => addToFavorites(button.id));
  });

  FavoriteButtons.forEach((button) => {
    button.addEventListener("click", () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const currentCountry = allCountries.find((country) => country.id === id);
  allFavorites = [...allFavorites, currentCountry];
  allFavorites.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const currentCountry = allFavorites.find((country) => country.id === id);
  allCountries = [...allCountries, currentCountry];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allFavorites = allFavorites.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
