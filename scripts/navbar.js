document.addEventListener("DOMContentLoaded", () => {
    const menuItems = [
        { text: "Strona główna", link: "../index.html" },
        { text: "Pokedex", link: "./pages/pokedex.html" },
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