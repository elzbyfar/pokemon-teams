const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')[0]

function createMain(trainersData) {
    trainersData.forEach(trainer => {
        let div = createCard(trainer)
        let pokemonUl = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {
            let pokeLi = createPokemonLi(pokemon)
            pokemonUl.append(pokeLi)
        })
        div.append(pokemonUl)
        main.append(div)
    })
    return main
}

function createCard(trainer) {
    let div = document.createElement('div')
    let trainerName = document.createElement('p')
    let addPokemonButton = document.createElement('button')
    div.className = 'card'
    div.dataset.id = trainer.id 
    trainerName.innerText = trainer.name
    trainerName.className = 'trainer'
    addPokemonButton.dataset.trainer_id = trainer.id
    addPokemonButton.className = 'add-button'
    addPokemonButton.innerText = "Add Pokemon"
    div.append(trainerName, addPokemonButton)
    return div
}

function createPokemonLi(pokemon) {
    let pokeLi = document.createElement('li')
    pokeLi.innerText = `${pokemon.species} (${pokemon.nickname})` 
    let pokeReleaseButton = document.createElement('button')
    pokeReleaseButton.className = 'release'
    pokeReleaseButton.dataset.pokemon_id = pokemon.id
    pokeReleaseButton.innerText = "Release"
    pokeLi.appendChild(pokeReleaseButton)
    return pokeLi
}

document.addEventListener('DOMContentLoaded', function(event) {
    
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => {
        createMain(data)
    })
        
    main.addEventListener('click', function(event) {
        if (event.target.className === 'add-button' && event.target.parentNode.querySelector('ul').childNodes.length < 6) {
            fetch(POKEMONS_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    'trainer_id': event.target.dataset.trainer_id
                })
            })
            .then(response => response.json())
            .then(data => {
                let pokeUl = event.target.parentNode.querySelector('ul')
                let newPokemonLi = createPokemonLi(data)
                pokeUl.append(newPokemonLi)
            })
        }
    })

    main.addEventListener('click', function(event) {
        if (event.target.className === 'release') {
            fetch(`${POKEMONS_URL}/${event.target.dataset.pokemon_id}`, {method: 'DELETE'})
            event.target.parentNode.remove()
        }
    })
})