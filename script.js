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
var loading = true;
auth.onAuthStateChanged(function (user) {

    if (user) {
        const navItem = document.getElementById("checkUser")
        const a = document.createElement('a');
        a.href = 'account.html';
        a.innerText = "Account";
        navItem.innerHTML = ""
        navItem.appendChild(a);
        loading = false

        if (window.location.pathname === '/account.html') {
            loading = true
            const usersRef = database.ref("users");
            const userId = user.uid;
            usersRef.child(userId).once("value")
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData) {
                        document.getElementById("account-username").innerHTML = userData.name
                        document.getElementById("account-email").innerHTML += userData.email
                        document.getElementById("account-uid").innerHTML += user.uid
                        let d = new Date(userData.account_created)
                        document.getElementById("account-created").innerHTML += d.toString()
                        d = new Date(userData.last_login)
                        document.getElementById("account-lastLogin").innerHTML += d.toString()
                        document.getElementById("account-type").innerHTML += userData.account_type
                        loading = false
                    } else {
                        document.getElementById("account-username").innerHTML = "USER DATA NOT FOUND!"
                        loading = false
                    }
                })
                .catch((error) => {
                    console.log("Error reading user data:", error);
                    loading = false
                });
        } else {
            document.getElementById("account-username").innerHTML = "USER DATA NOT FOUND!"
        }
    } else {
        const navItem = document.getElementById("checkUser")
        const a = document.createElement('a');
        a.href = 'login.html';
        a.innerText = "Login";
        navItem.innerHTML = ""
        navItem.appendChild(a);
        loading = false
    }
});


function register(event) {
    event.preventDefault()
    loading = true
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {

            let localUser = {
                email: email,
                name: name,
                password: password,
                account_created: Date.now(),
                last_login: null,
                account_type: "user"
            }
            let user = auth.currentUser;
            localStorage.setItem("user_data", JSON.stringify(localUser))
            user.sendEmailVerification();
            alert("Email verification has been sent!. Please verify.")
            loading = false
            auth.signOut().then(() => {
                window.location.replace("login.html");
            }).catch((error) => {
                alert(`Error signing out: ${error.message}`);
            });
        })
        .catch(function (error) {
            alert(`Error - ${error.message}`)
            loading = false
        });
}


function login(event) {
    event.preventDefault()
    loading = true
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let localUser = JSON.parse(localStorage.getItem("user_data"))
    if (!localUser) {
        localUser = {
            last_login: true
        }
    }
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            let user = auth.currentUser
            if (user.emailVerified) {
                const usersRef = database.ref("users");
                if (!localUser.last_login) {
                    usersRef.child(user.uid).set(localUser)
                        .then(() => {
                            localStorage.removeItem('user_data')
                        })
                        .catch((error) => {
                            alert(`Error saving data: ${error.message}`)
                        });
                }

                localUser = {
                    last_login: Date.now()
                }
                usersRef.child(user.uid).update(localUser)
                    .then(() => {
                        loading = false
                        window.location.replace("account.html");
                    })
                    .catch((error) => {
                        loading = false
                        alert(`Error updating data: ${error.message}`)
                    });
            } else {
                auth.signOut()
                loading = false
                alert("Your email is not verified. Please verify your email first!")
            }
        })
        .catch(function (error) {
            loading = false
            alert(`Error - ${error.message}`)
        });
}
function logout(event) {
    event.preventDefault()
    loading = true
    auth.signOut().then(() => {
        loading = false
        window.location.replace("login.html");
    }).catch((error) => {
        loading = false
        alert(`Error signing out: ${error.message}`);
    });
}
function forgetPass() {
    loading = true
    let email = document.getElementById("email").value
    auth.sendPasswordResetEmail(email).then(() => {
        loading = false
        document.getElementById('forgetpass').innerHTML = `A Password Reset link has been sent to the above email.`
        document.getElementById('ref').classList.add('refvisible')

    }).catch((error) => {
        loading = false
        document.getElementById('forgetpass').innerHTML = `Please provide valid email.\nError: ${error.message}.`
        document.getElementById('ref').classList.add('refvisible')
    })
}
function refClick() {
    document.getElementById('forgetpass').innerHTML = "Forgot Password?"
    document.getElementById('ref').classList.remove('refvisible')
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
//LOADING
setInterval(function () {
    if (loading === true) {
        document.getElementById('loader').classList.add('loader-active')
    } else {
        document.getElementById('loader').classList.remove('loader-active')
    }
}, 100)
//HAMBURGER AND THEME
let navbarOpen = false
function toggleMenu() {
    if (!navbarOpen) {
        navbarOpen = true
        document.getElementById('sidebar').classList.add('sidebar-open')
        document.getElementById('menuline1').classList.add('menuline-1-open')
        document.getElementById('menuline2').classList.add('menuline-2-open')
        document.getElementById('menuline3').classList.add('menuline-3-open')
    } else {
        navbarOpen = false
        document.getElementById('sidebar').classList.remove('sidebar-open')
        document.getElementById('menuline1').classList.remove('menuline-1-open')
        document.getElementById('menuline2').classList.remove('menuline-2-open')
        document.getElementById('menuline3').classList.remove('menuline-3-open')
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