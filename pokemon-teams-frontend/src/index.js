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
            addPokemonButton.className = 'add-button'
            addPokemonButton.innerText = "Add Pokemon"
            trainer.pokemons.forEach(pokemon => {
                let pokeLi = document.createElement('li')
                pokeLi.innerText = `${pokemon.species} (${pokemon.nickname})` 
                let pokeReleaseButton = document.createElement('button')
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
        
    main.addEventListener('click', function(event) {
        if (event.target.className === 'add-button' && event.target.parentNode.querySelector('ul').childNodes.length < 6) {
            fetch(POKEMONS_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    console.log('hey')
                })
            })
            .then(response => response.json())
            .then(data => {
                let pokeUl = event.target.parentNode.querySelector('ul')
                let newPokeLi = document.createElement('li')
                let newPokemon = data[Math.floor(Math.random() * 24)]
                newPokeLi.innerText = `${newPokemon.species} (${newPokemon.nickname})`
                let pokeReleaseButton = document.createElement('button')
                pokeReleaseButton.className = 'release'
                pokeReleaseButton.dataset.pokemon_id = newPokemon.id
                pokeReleaseButton.innerText = "Release"
                newPokeLi.appendChild(pokeReleaseButton)
                pokeUl.append(newPokeLi)
            })
        }
    })

    main.addEventListener('click', function(event) {
        if (event.target.className === 'release') {
            event.target.parentNode.remove()
        }
    })

    
})