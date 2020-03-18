const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', function(event) {
    let main = document.getElementsByTagName('main')[0]
    
    
    
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(trainer => {
            let div = document.createElement('div')
            let trainerName = document.createElement('p')
            let addPokemonButton = document.createElement('button')
            let pokeUl = document.createElement('ul')
            div.className = 'card'
            div.dataset.id = (data.indexOf(trainer) + 1) 
            trainerName.innerText = trainer.name
            trainerName.className = 'trainer'
            addPokemonButton.dataset.trainer_id = trainer.id
            addPokemonButton.innerText = "Add Pokemon"
            trainer.pokemons.forEach(pokemon => {
                let pokeLi = document.createElement('li')
                let pokeReleaseButton = document.createElement('button')
                pokeLi.innerText = `${pokemon.species} (${pokemon.nickname})` 
                pokeReleaseButton.className = 'release'
                pokeReleaseButton.dataset.pokemon_id = pokemon.id
                pokeReleaseButton.innerText = "Release"
                pokeLi.appendChild(pokeReleaseButton)
                pokeUl.append(pokeLi)
            })
            div.append(trainerName, addPokemonButton, pokeUl)
            main.append(div)
        })
    })
        
    
})