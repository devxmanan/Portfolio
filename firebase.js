
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
function register() {
    let full_name = document.getElementById("signup-name").value
    let email = document.getElementById("signup-email").value
    let password = document.getElementById("signup-password").value

    auth.createUserWithEmailAndPassword(email, password).then(function () {
        var user = auth.currentUser
        var database_ref = database.ref()

        var user_data = {
            email: email,
            full_name: full_name,
            password: password,
            last_login: Date.now()
        }
        database_ref.child('users/' + user.uid).set(user_data)
        alert("User Created Successfully!")
    }).catch(function (error) {
        alert("Error:", error)
    })
}