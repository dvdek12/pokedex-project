
// import { showPokemonAlert } from "../utils/alert";


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pobranie danych z formularza
            const formData = new FormData(e.target);

            // Konwersja FormData na obiekt
            const formDataObject = Object.fromEntries(formData.entries());

            // Sprawdzenie czy pokemon o tej samej nazwie już istnieje
            if(localStorage.getItem(formDataObject.name) == null || localStorage.getItem(formDataObject.name).includes(" ")) {
                // pobranie pliku obrazu
                const imageFile = formData.get('image');
                var image64;

                // Stworzenie readera do konwersji pliku obrazu na Base64
                const reader = new FileReader();
                reader.onload = function (event) {
                    const base64Image = event.target.result; // Obraz w formacie Base64

                    // Zapisanie finalnej struktury danych 
                    image64 = base64Image;
                    var finalData = {
                        name: formDataObject.name,
                        height: formDataObject.height,
                        weight: formDataObject.weight,
                        sprites: {
                            front_default: image64,
                            other: {
                                showdown: {
                                    front_default: image64
                                }
                            }
                        }
                    };

                    // Dodanie danych do localStorage

                    try{
                        localStorage.setItem(finalData.name, JSON.stringify(finalData));
                        window.alert('Pokémon został dodany!');
                    }
                    catch (error) {
                        console.error('Błąd podczas zapisywania do localStorage:', error);
                        window.alert('Osiagnieto limit pokemonow!');
                    }

                };

                reader.readAsDataURL(imageFile); // Konwersja pliku na Base64

            } else {
                window.alert('Pokémon o tej nazwie już istnieje lub zawiera spacje!');
            }
        });
    } else {
        console.error('Formularz nie został znaleziony w DOM.');
    }
});


function mergeImagesFunc(){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img1 = new Image();
    const img2 = new Image();

    img1.src = '../assets/7.png';
    img2.src = '../assets/krab.png';



    img1.onload = function() {
        canvas.width = img1.width;
        canvas.height = img1.height;
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, 0);
        document.body.appendChild(canvas);

        const link = document.createElement('a');
        link.download = 'merged.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
} 

