let menuline1 = document.getElementById("menuline1");
let menuline2 = document.getElementById("menuline2");
let menuline3 = document.getElementById("menuline3");
let menuicon = document.getElementById("menuicon");
let currentTheme = localStorage.getItem("theme");
window.onload = loadTheme();
function loadTheme() {
    document.querySelector('body').classList.add(currentTheme)
if (currentTheme == "light") {
   document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-sun-o")
    } else {
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
               document.getElementById("themeIcon").classList.add("fa-moon-o")
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

const firebaseConfig = {
    apiKey: "AIzaSyB4EFPA7uiUm0Dt4aGUJjieRh72vFpAuQY",
    authDomain: "manan-portfolio-2703.firebaseapp.com",
    databaseURL: "https://manan-portfolio-2703-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "manan-portfolio-2703",
    storageBucket: "manan-portfolio-2703.appspot.com",
    messagingSenderId: "731134889047",
    appId: "1:731134889047:web:fc2bdcd2dbae0ea8e86712",
    measurementId: "G-RDFYDLG2PM"
};

firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const contactFormDB = firebase.database().ref('contactForm');


document.getElementById("contactForm").addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let subject = document.getElementById('subject').value;
    console.log(name, email, number, subject);
})

function switchTheme() {
    document.querySelector('body').classList.remove("light", "dark")
    if (currentTheme == "light") {
        currentTheme = "dark"
    } else {
        currentTheme = "light"
    }
    localStorage.setItem("theme", currentTheme)
    document.querySelector('body').classList.add(currentTheme)
}