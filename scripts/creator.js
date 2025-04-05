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
                    localStorage.setItem(finalData.name, JSON.stringify(finalData));
                    // const alertMessage = `Pokemon ${finalData.name} has been added`
                    // showPokemonAlert(alertMessage)
                    window.alert('dodano')
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

