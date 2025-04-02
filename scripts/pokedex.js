const commonPokemonNames = ['Pikachu ', 'Charizard', 'Bulbasaur', 'Squirtle', 'Jigglypuff', 'Gengar', 'Eevee', 'Snorlax', 'Lucario', 'Mewtwo']
let commonPokemons = []

const pokemonListWrapper = document.getElementById('pokemon-list-wrapper')






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
const carousel = document.querySelector(".carousel");
let items = null;
const prevBtn = document.querySelector(".btn-left");
const nextBtn = document.querySelector(".btn-right");
let currentIndex = 1; // Środkowy element na początku

const createPokemonInfoDiv = (p) => {
    const div = document.createElement('div')
    div.classList.add("pokemon-card-carousel")

    const img = document.createElement('img')
    img.classList.add('pokemon-card-carousel-img')
    
    const divInfo = document.createElement('div')
    divInfo.classList.add("pokemon-card-carousel-info")

    const h2 = document.createElement('h2')
    h2.classList.add('pokemon-font')

    const heightInfo = document.createElement('span')
    heightInfo.classList.add('default-font')
    const weightInfo = document.createElement('span')
    weightInfo.classList.add('default-font')

    if (["name", "sprites", "height", "weight"].every(key => key in p)){
        img.src = p.sprites.other.showdown.front_default
        h2.textContent = p.name.toUpperCase()
        heightInfo.textContent = `Height: ${p.height}`
        weightInfo.textContent = `Weight: ${p.weight}`
    }

    divInfo.appendChild(h2)
    divInfo.appendChild(heightInfo)
    divInfo.appendChild(weightInfo)

    div.appendChild(img)
    div.appendChild(divInfo)

    return div
}

const initCarousel = (items) => {
    for (let index = 0; index < items.length; index++) {
        const pokemonInfo = createPokemonInfoDiv(items[index])
        pokemonInfo.classList.add('carousel-item')

        if(index == (items.length / 2)){
            pokemonInfo.classList.add('middle')
        }
        
        carousel.appendChild(pokemonInfo)
    }
}



function updateCarousel() {
    
    carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    
    console.log(items);
    
    items.forEach(item => item.classList.remove("middle"));
    items[currentIndex].classList.add("middle");
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1;
    }
    updateCarousel();
});


const navigateToEditPage = (pokemon) => {
    let basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    window.location.href = basePath+`/edit.html?pokemon=${pokemon}`  
}

const removePokemon = (pokemon) => {
    if(localStorage.getItem(pokemon) !== null) {
        localStorage.removeItem(pokemon)
        location.reload()
        window.alert(`Pokemon ${pokemon} został usunięty.`)
    } else{
        window.alert(`Pokemon ${pokemon} nie istnieje w twojej bazie.`)
    }
}



// odpala sie przy 1 renderze strony wyswietla przykladowe pokemony
document.addEventListener('DOMContentLoaded', async () => {
    
    // Wczytanie pokemonow z api i dodanie do localStorage
    if(localStorage.length == 0){
        for (let index = 0; index < commonPokemonNames.length; index++) {
            var pokemon = await getPokemonFromAPI(commonPokemonNames[index])
            localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
        }
    }

    // Wczytanie pokemonow z localStorage i dodanie do tablicy (zawiera wlasne pokemony)
    for (let index = localStorage.length-1; index >= 0; index--) {
        pokemon = JSON.parse(window.localStorage.getItem(localStorage.key(index)))
        commonPokemons.push(pokemon);
    }

    console.log(commonPokemons);
    

    commonPokemons.forEach(pokemon => {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const img = document.createElement('img')
        const subDiv = document.createElement('div')
        const editBtn = document.createElement('button')
        const removeBtn = document.createElement('button')

        div.className = "pokemon-card"
        
        img.className = "pokemon-image"
        img.src = pokemon.sprites.front_default
        img.alt = `Cover photo of ${pokemon.name}`

        h2.className = "pokemon-name"
        h2.textContent = pokemon.name
        
        subDiv.className = "pokemon-buttons"
        editBtn.classList.add("button")
        editBtn.classList.add("edit")
        editBtn.textContent = "Edytuj"
        editBtn.onclick = () => navigateToEditPage(pokemon.name)

        removeBtn.classList.add("button")
        removeBtn.classList.add("delete")
        removeBtn.textContent = "Usuń"
        removeBtn.onclick = () => removePokemon(pokemon.name)

        subDiv.appendChild(editBtn)
        subDiv.appendChild(removeBtn)

        div.appendChild(h2)
        div.appendChild(img)
        div.appendChild(subDiv)

        pokemonListWrapper.appendChild(div)
    })

    initCarousel(commonPokemons);
    items = document.querySelectorAll(".carousel-item")
 
})







