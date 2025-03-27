const commonPokemonNames = ['Pikachu ', 'Charizard', 'Bulbasaur', 'Squirtle', 'Jigglypuff', 'Gengar', 'Eevee', 'Snorlax', 'Lucario', 'Mewtwo']
let commonPokemons = []

const pokemonListWrapper = document.getElementById('pokemon-list-wrapper')


// odpala sie przy 1 renderze strony
document.addEventListener('DOMContentLoaded', async () => {
    
    for (let index = 0; index < commonPokemonNames.length; index++) {
        var pokemon = await getPokemonFromAPI(commonPokemonNames[index])
        commonPokemons.push(pokemon)
    }

    console.log(commonPokemons);
    

    commonPokemons.forEach(pokemon => {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const img = document.createElement('img')

        div.className = "pokemon-card"

        h2.textContent = pokemon.name

        img.src = pokemon.sprites.front_default
        img.alt = `Cover photo of ${pokemon.name}`

        div.appendChild(h2)
        div.appendChild(img)

        pokemonListWrapper.appendChild(div)
    })
 
})


let carouselItems = ['1', '2', '3']
const generateCarousel = () => {

}

const getPokemonFromAPI = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      return json

    } catch (error) {
      console.error(error.message);
    }
}







