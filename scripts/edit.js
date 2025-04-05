let pokemon = {}


const getPokemonFromURL = () => {
    const params = new URLSearchParams(window.location.search)
    const pokemonName = params.get('pokemon')
    pokemon = JSON.parse(localStorage.getItem(pokemonName))
    console.log(pokemon);
    
}

const createPokemonCard = ({ name, sprites, height, weight }) => {
    console.log(name);
    
    const card = document.createElement('div');
    card.className = 'pokemon-edit-card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'pokemon-edit-image';
    const img = document.createElement('img');
    img.src = sprites.front_default;
    img.alt = name;
    img.width =500;
    imageContainer.appendChild(img);

    const details = document.createElement('div');
    details.className = 'pokemon-details';
    
    const title = document.createElement('h1');
    title.textContent = name.toUpperCase();
    
    const heightLabel = document.createElement('label');
    heightLabel.textContent = 'Height';
    const heightInput = document.createElement('input');
    heightInput.type = 'text';
    heightInput.value = height
    
    const weightLabel = document.createElement('label');
    weightLabel.textContent = 'Weight';
    const weightInput = document.createElement('input');
    weightInput.type = 'text';
    weightInput.value = weight
    
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
        if(heightInput.value != "" && weightInput.value != "") {
            const updatedPokemon = {
                ...pokemon,
                height: heightInput.value,
                weight: weightInput.value
            }
            localStorage.setItem(name, JSON.stringify(updatedPokemon));
            alert('Pokemon edytowany pomyslnie!');
        } else {
            alert('Pola nie moga byc puste!');
        }
    }

    details.appendChild(title);
    details.appendChild(heightLabel);
    details.appendChild(heightInput);
    details.appendChild(weightLabel);
    details.appendChild(weightInput);
    details.appendChild(saveButton);

    card.appendChild(imageContainer);
    card.appendChild(details);

    document.getElementById('pokemon-container').appendChild(card);
}

const createSoundPlay = ({ cries }) => {
    const audio = document.createElement('audio')
    audio.src = cries.latest
    audio.id = "pokemon-sound"
    audio.volume = 0.5
    audio.preload = "auto"

    document.querySelector('.abt-container').appendChild(audio)
}

document.getElementById('play-sound').addEventListener('click', function() {
    const audio = document.getElementById('pokemon-sound');
    audio.play();
});

const createStatsGrid = ({ stats }) => {
    if(stats){
        stats.forEach(s => {
            const { base_stat, stat } = s
            const { name } = stat

             // Tworzenie głównego diva
            const button = document.createElement("div");
            button.className = "attack-button";

            // Tworzenie nazwy ataku
            const attackName = document.createElement("span");
            attackName.className = "attack-name";
            attackName.textContent = name;

            // Tworzenie wartości ataku
            const attackPower = document.createElement("span");
            attackPower.className = "attack-power";
            attackPower.textContent = base_stat;

            // Dodanie elementów do przycisku
            button.appendChild(attackName);
            button.appendChild(attackPower);

            document.querySelector('.stat-container').appendChild(button)
        })
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    getPokemonFromURL();
    createPokemonCard(pokemon)
    createStatsGrid(pokemon)
    createSoundPlay(pokemon)
})