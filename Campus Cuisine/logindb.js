const firebaseConfig = {
  apiKey: "AIzaSyCV_UkRna0dpsaGS5cF2gWiSC8IK9cQn94",
  authDomain: "campus-cuisine2024.firebaseapp.com",
  projectId: "campus-cuisine2024",
  storageBucket: "campus-cuisine2024.appspot.com",
  messagingSenderId: "337522707956",
  appId: "1:337522707956:web:75bca90131c0582d0c3da1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function googleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  // Add prompt option to force sign-in prompt every time
  provider.setCustomParameters({ prompt: 'select_account' });

  // Sign out current user if exists
  firebase.auth().signOut().then(() => {
    // Sign in with Google
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        // Display toast message
        Toastify({
          text: "Logged in as " + user.displayName + " from Google login",
          duration: 3000,
          gravity: "bottom",
          position: 'center',
          backgroundColor: "green",
          className: "success",
        }).showToast();

        // Create profile picture element
        var profilePic = document.createElement('img');
        profilePic.src = user.photoURL;
        profilePic.style.width = '2.5rem';
        profilePic.style.height = '2.5rem';
        profilePic.style.borderRadius = '50%'; // Apply border-radius to make it circular

        // Create logout option element
        var logoutOption = document.createElement('div');
        logoutOption.id = 'logoutOption'; // Add id for easy reference
        logoutOption.innerHTML = 'Logout';
        logoutOption.style.position = 'absolute';
        logoutOption.style.top = '.7rem'; // Adjust the top position as needed
        logoutOption.style.left = '94%'; // Center horizontally
        logoutOption.style.transform = 'translateX(-50%)'; // Center horizontally
        logoutOption.style.padding = '0.5rem';
        logoutOption.style.backgroundColor = '#fff';
        logoutOption.style.border = '1px solid #ccc';
        logoutOption.style.borderRadius = '0.5rem';
        logoutOption.style.cursor = 'pointer';
        logoutOption.addEventListener('click', signOut);

        // Append profile picture and logout option to btnLogin-popup
        var btnLoginPopup = document.getElementById('btnLogin-popup');
        btnLoginPopup.innerHTML = '';
        btnLoginPopup.appendChild(profilePic);
        btnLoginPopup.appendChild(logoutOption);

        // Redirect or do whatever you need after successful sign-in
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // Handle errors
      });
  }).catch((error) => {
    // Handle sign-out errors
  });
}

function signOut() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('User signed out');
    // Reset btnLogin-popup to initial state
    var btnLoginPopup = document.getElementById('btnLogin-popup');
    btnLoginPopup.innerHTML = '';
    btnLoginPopup.classList.add('userlogin');
    btnLoginPopup.classList.add('bx-user'); // Add the class "userlogin"
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

document.getElementById('googlelogin').addEventListener('click', function (event) {
  event.preventDefault();
  googleSignIn();
});



// Function to display toast message for registration
function showToast(message, className) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: 'center',
    className: className,
    backgroundColor: "green",
  }).showToast();
}


function register() {
  if (!navigator.onLine) {
    // Display a message indicating the internet connection is required
    Toastify({
      text: 'Internet connection is required to register.',
      duration: 2000,
      gravity: "bottom",
      position: 'center',
      className: "error",
      backgroundColor: "red",
    }).showToast();
    return;
  }

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById("username").value;

  // Validate email, password, and username
  if (!validate_email(email) || !validate_password(password) || !validate_field(username)) {
    Toastify({
      text: "Please provide valid email, password, and username.",
      duration: 2000,
      gravity: "bottom",
      position: 'center',
      className: "toast",
      backgroundColor: "orange",
    }).showToast();
    return;
  }

  // Create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;

      // Store additional user data in Firebase Realtime Database
      const userRef = database.ref('users/' + user.uid);
      userRef.set({
        email: email,
        username: username,
        // Add more user data as needed
      });

      Toastify({
        text: 'User registration successful!',
        duration: 2000,
        gravity: "bottom",
        position: 'center',
        className: "success",
        backgroundColor: "green",
      }).showToast();
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      Toastify({
        text: errorMessage,
        duration: 2000,
        gravity: "bottom",
        position: 'center',
        className: "error",
        backgroundColor: "red",
      }).showToast();
    });
}

function validate_email(email) {
  const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(String(email).toLowerCase());
}

function validate_password(password) {
  return password.length >= 8;
}

function validate_field(field) {
  return field && field.trim().length > 0;
}

document.getElementById('placeOrderButton').addEventListener('click', () => {
  // Get the user's display name
  const userDisplayName = getUserDisplayName();

  // Construct the data to be saved
  const orderData = {
      user: userDisplayName,
      items: cartItems,
      totalItems: cartCount,
      timestamp: firebase.database.ServerValue.TIMESTAMP // Add server timestamp
  };

  // Push the order data to Firebase Realtime Database
  firebase.database().ref('orders').push(orderData)
      .then(() => {
          // Alert and reset the cart if successful
          alert('Order placed successfully!');
          cartCount = 0;
          cartItems = [];
          cartCountElement.textContent = cartCount;
          cartCountElement.style.display = 'none'; // Hide the count after placing order
          modal.style.display = "none"; // Hide the modal
      })
      .catch((error) => {
          // Handle errors
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again.');
      });
});
