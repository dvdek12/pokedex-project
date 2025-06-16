document.addEventListener('DOMContentLoaded', function() {
    let basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));    
    if (basePath.endsWith('/pages')) {
        basePath = basePath.substring(0, basePath.lastIndexOf('/pages'));
    }
    const menuItems = [
        { text: "Home Page", link: basePath+"/index.html" },
        { text: "Pokedex", link: basePath+"/pages/pokedex.html" },
        { text: "Creator", link: basePath+"/pages/creator.html" },
    ]

    const menu = document.querySelector(".navbar-menu");
            
    menuItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = item.text;
        a.href = item.link;
        li.appendChild(a);
        menu.appendChild(li);
    });


    const toggleButton = document.querySelector('.navbar-toggle');
    
    // Funkcja do przełączania menu
    function toggleMenu() {
        menu.classList.toggle('active');
        toggleButton.classList.toggle('active');
    }
    
    // Nasłuchiwanie kliknięcia na przycisk hamburgera
    toggleButton.addEventListener('click', toggleMenu);
    
    // Zamknięcie menu po kliknięciu na link (opcjonalne)
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});