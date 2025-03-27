document.addEventListener("DOMContentLoaded", () => {    
    let basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));    
    if (basePath.endsWith('/pages')) {
        basePath = basePath.substring(0, basePath.lastIndexOf('/pages'));
    }
    const menuItems = [
        { text: "Strona główna", link: basePath+"/index.html" },
        { text: "Pokedex", link: basePath+"/pages/pokedex.html" },
        { text: "Creator", link: basePath+"/pages/creator.html" },
    ]

    const menu = document.getElementById("menu");
            
    menuItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = item.text;
        a.href = item.link;
        li.appendChild(a);
        menu.appendChild(li);
    });
})