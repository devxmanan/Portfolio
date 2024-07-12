let menuline1 = document.getElementById("menuline1");
let menuline2 = document.getElementById("menuline2");
let menuline3 = document.getElementById("menuline3");
let menuicon = document.getElementById("menuicon");
let currentTheme = localStorage.getItem("theme");
window.onload = loadtheme();
function loadtheme() {
    document.querySelector('body').classList.add(currentTheme)
    if (currentTheme == "light") {
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-moon-o")
    } else {
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-sun-o")
    }
}
menuline1.style.transform = "none";
let sidebar = document.getElementById("sidebar");
function toggleMenu() {
    if (menuline1.style.transform == "none") {
        menuline1.style.position = "relative";
        menuline1.style.top = "7px";
        menuline1.style.transform = "rotate(45deg)";
        menuline2.style.transform = "rotateY(90deg)";
        menuline3.style.transform = "rotate(-45deg)";
        menuline3.style.position = "relative";
        menuline3.style.bottom = "7px";
        sidebar.style.width = "50vw";

    }
    else {
        menuline1.style.transform = "none";
        menuline2.style.transform = "none";
        menuline3.style.transform = "none";
        menuline1.style.position = "sticky";
        menuline3.style.position = "sticky";
        sidebar.style.width = "0vw";
    }
}
function cvBtn(){
  alert("This feature will be available soon");
}

function switchTheme() {
    document.querySelector('body').classList.remove("light", "dark")
    if (currentTheme == "light") {
        currentTheme = "dark"
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-sun-o")
    } else {
        currentTheme = "light"
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-moon-o")
    }
    localStorage.setItem("theme", currentTheme)
    document.querySelector('body').classList.add(currentTheme)
}