
document.getElementById('translate-button').addEventListener('click', async ()=>{
    const inputWordValue = document.getElementById('word-to-translate').value;

    const { name, sprites } = await getPokemon(inputWordValue)
    console.log(name, sprites);
    
    document.getElementById('pokemon-name').textContent = name
    document.getElementById('pokemon-coverPhoto').src = sprites.front_default
    
})

let pokemonObj = {
    name: "",
    url: ""
}

const getPokemon = async (pokemon) => {
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