//FIREBASE CONFIGURATION

const firebaseConfig = {
    apiKey: "AIzaSyDpMgubNJgQKnUXpXLdqbX8ONeKUYlSVsE",
    authDomain: "portfolio-manan-2703.firebaseapp.com",
    databaseURL: "https://portfolio-manan-2703-default-rtdb.firebaseio.com",
    projectId: "portfolio-manan-2703",
    storageBucket: "portfolio-manan-2703.appspot.com",
    messagingSenderId: "76323952350",
    appId: "1:76323952350:web:48d1b1ff600a072f69944f"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

auth.onAuthStateChanged(function (user) {

    if (user) {
        console.log("User signed in:", user.uid);
        const navItem = document.getElementById("checkUser")
        const a = document.createElement('a');
        a.href = 'account.html';
        a.innerText = "Account";
        navItem.innerHTML = ""
        navItem.appendChild(a);
        const usersRef = database.ref("users");
        const userId = user.uid;
        usersRef.child(userId).once("value")
            .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                document.getElementById("account-username").innerHTML= userData.name
            document.getElementById("account-email").innerHTML += userData.email
            document.getElementById("account-uid").innerHTML += user.uid
            let d = new Date(userData.account_created)
            document.getElementById("account-created").innerHTML += d.toString()
            d= new Date(userData.last_login)
            document.getElementById("account-lastLogin").innerHTML += d.toString()
             } else {
            console.log("User not found.");
            }
    })
    .catch((error) => {
        console.error("Error reading user data:", error);
    });
    } else {
        console.log("User not signed in");
        const navItem = document.getElementById("checkUser")
        const a = document.createElement('a');
        a.href = 'login.html';
        a.innerText = "Login";
        navItem.innerHTML = ""
        navItem.appendChild(a);
    }
});


function register(event) {
    event.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(name, email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser
            var user_data = {
                email: email,
                name: name,
                password: password,
                account_created: Date.now(),
                last_login: Date.now()
            }
            alert("User Created Successfully!")

            const usersRef = database.ref("users");

            // Save user data using set()
            usersRef.child(user.uid).set(user_data)
                .then(() => {
                    alert("Data saved successfully!");
                    window.location.replace("account.html");
                })
                .catch((error) => {
                    alert(`Error saving data: ${error.message}`)
                });
        })
        .catch(function (error) {
            alert(`Error - ${error.message} Try Logging in instead`)
        });
}


function login(event) {
    event.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser
            var user_data = {
                last_login: Date.now()
            }
            alert("User Logged in successfully!")

            const usersRef = database.ref("users");

            // Save user data using set()
            usersRef.child(user.uid).update(user_data)
                .then(() => {
                    alert("Data updated successfully!");
                    window.location.replace("account.html");
                })
                .catch((error) => {
                    alert(`Error updating data: ${error.message}`)
                });
        })
        .catch(function (error) {
            alert(`Error - ${error.message}`)
        });
}
function logout(event){
    event.preventDefault()
    auth.signOut().then(() => {
        alert("User signed out successfully!");
        window.location.replace("login.html");
    }).catch((error) => {
        alert(`Error signing out: ${error.message}`);
    });
}

//ON LOAD FUNCTION
let currentTheme = localStorage.getItem("theme");

window.onload = load();
function load() {
    document.querySelector('body').classList.add(currentTheme)
    if (currentTheme == "light") {
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-moon-o")
    } else {
        document.getElementById("themeIcon").classList.remove("fa-moon-o", "fa-sun-o");
        document.getElementById("themeIcon").classList.add("fa-sun-o")
    }
}

//HAMBURGER AND THEME
let menuline1 = document.getElementById("menuline1");
let menuline2 = document.getElementById("menuline2");
let menuline3 = document.getElementById("menuline3");
let menuicon = document.getElementById("menuicon");


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