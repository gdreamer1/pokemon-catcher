document.addEventListener("DOMContentLoaded", () => {
    getRandomPokemon()
});
// alert("Pokemon")


const pokemonSelection = ["pikachu", "chikorita", "squirtle", "charmander", "arceus", "togepi", "infernape", "mewtwo", "lucario", "decidueye", "magikarp" ]
let capturedPokemon =  []
let currentPokemon = {}
// Get a random pokemon 
function getRandomPokemon() {
    var randomPokemon = pokemonSelection[Math.floor(Math.random() * pokemonSelection.length)];
    console.log(randomPokemon);
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then((response) => {
        return response.json()
    }).then((pokemonInfo) => {
        pokemonDisplay(pokemonInfo);
        console.log(pokemonInfo);
        currentPokemon = pokemonInfo;
    }) 
}
//Use this api and randomiz the name with the end https://pokeapi.co/api/v2/pokemon/${pokemonSelection}/

// Post pokemon picture and name
function pokemonDisplay(pokemonInfo) {
    const pokemonDiv = document.getElementById('pokemon-info')
    while (pokemonDiv.firstChild) {
        pokemonDiv.removeChild(pokemonDiv.firstChild);
    }
    renderPokemonInfo(pokemonInfo, pokemonDiv)
}

function renderPokemonInfo (pokemonInfo, pokemonDiv) {
    const pokemonImage = document.createElement('img')
    pokemonImage.src=pokemonInfo.sprites.front_default
    const pokemonName = document.createElement('h3')
    pokemonName.innerHTML = pokemonInfo.name.toUpperCase()
    const pokemonStatsDiv = document.createElement('div')
    pokemonStatsDiv.style.display = "flex"
    pokemonStatsDiv.style.flexDirection = "row"
    pokemonStatsDiv.style.justifyContent = "space-evenly"
    pokemonInfo.stats.forEach((individualStat) => {
        const statName = individualStat.stat.name
        const baseStat = individualStat.base_stat
        const statNameHead = document.createElement('h5')
        statNameHead.innerHTML = "Stat Name: " + statName
        const baseStatHead = document.createElement('h5')
        baseStatHead.innerHTML = "Base Stat: " + baseStat
        pokemonStatsDiv.appendChild(statNameHead)
        pokemonStatsDiv.appendChild(baseStatHead)
        
    })

    pokemonDiv.appendChild(pokemonImage)
    pokemonDiv.appendChild(pokemonName)
    pokemonDiv.appendChild(pokemonStatsDiv)
}

// Catch it or release it
// if catch is going to add it caught list

 function catchPokemon(event) {
    const captureBox = document.getElementById('pokemon-capture')
    console.log(currentPokemon)
    renderPokemonInfo(currentPokemon, captureBox)
    getRandomPokemon()
 }

function releasePokemon(event){
    getRandomPokemon()
}

//if release button is clicked then get another random pokemon 
const catchButton = document.getElementById('catch-button')
catchButton.addEventListener('click', catchPokemon)

const releaseButton = document.getElementById('release-button')
releaseButton.addEventListener('click', releasePokemon)