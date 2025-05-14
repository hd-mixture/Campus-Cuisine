
// loader container
document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.getElementById('loaderContainer');
    const content = document.querySelector('.content');
    
    // Simulate content loading
    setTimeout(() => {
        loaderContainer.classList.add('hidden');
        content.classList.add('visible');
    }, 2000); // Adjust time as necessary
});

// navtoggler

let navtoggler = document.querySelector('.nav-toggler');
letlinksContainer = document.querySelector('.links-container');

navtoggler.addEventListener('click', () => {
    navtoggler.classList.toggle('active');
    linksContainer.classList.toggle('active');
})

// about use review slider

let reviews = document.querySelectorAll('.review-wrapper');

let currentReviews = [0, 2];

let updateReviewSlider = (cards) => {

    cards.forEach((card_index) => {
        reviews[card_index].classList.add('active');
    })
}

setInterval(() => {
    currentReviews.forEach((card_index, i) => {
        reviews[card_index].classList.remove('active');

        currentReviews[i] = card_index >= reviews.length - 1 ? 0 : card_index + 1;

    })

    setTimeout(() => {
        updateReviewSlider(currentReviews)
    }, 250)

}, 5000)


updateReviewSlider(currentReviews)

//faq

let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq => {
    let ques = faq.querySelector('.question-box');

    ques.addEventListener('click', () => {
        faq.classList.toggle('active');
    })
})

// dish slide

let dishSlider = document.querySelector('.dish-slide');

let rotationVal = 0;

setInterval(() => {
    rotationVal += 120;

    dishSlider.style.transform = `translateY(-50%)  rotate(${rotationVal}deg)`;

}, 3000)

AOS.init();

document.addEventListener('DOMContentLoaded', (event) => {
    const addToCartButton = document.querySelector('.aboutMe');
    const cartCountElement = document.querySelector('.cart-count');
    const cartIcon = document.querySelector('.cart');
    const modal = document.getElementById("cartModal");
    const closeModal = document.querySelector(".close");
    const cartItemsList = document.getElementById("cartItemsList");
    let cartCount = 0;
    let cartItems = [];

    const items = ["Burger", "Fries", "Nuggets"];

    addToCartButton.addEventListener('click', () => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        cartItems.push(randomItem); // Add random item to cart array
        cartCount++;
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = 'inline'; // Show the count after the first click
    });

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        cartItemsList.innerHTML = ''; // Clear previous items
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            cartItemsList.appendChild(li);
        });
        modal.style.display = "block"; // Show the modal
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none"; // Hide the modal
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none"; // Hide the modal if clicked outside
        }
    });

    document.getElementById('placeOrderButton').addEventListener('click', () => {
        const userDisplayName = getUserDisplayName();
        alert(`Order placed by ${userDisplayName}!`); // Simulate order placement
        cartCount = 0;
        cartItems = [];
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = 'none'; // Hide the count after placing order
        modal.style.display = "none"; // Hide the modal
    });

    document.getElementById('downloadReceiptButton').addEventListener('click', () => {
        // Prepare receipt details
        const userDisplayName = getUserDisplayName(); // Assuming getUserDisplayName function is available
        const receiptDetails = `Restaurant: Campus Cuisine\nItems: ${cartItems.join(", ")}\nTotal Items: ${cartCount} \nUser: ${userDisplayName}`;
        // Create a fake receipt image URL (replace with actual URL or generate one)
        const receiptUrl = `https://via.placeholder.com/300x150?text=${encodeURIComponent(receiptDetails)}`;
        // Create a link element
        const link = document.createElement('a');
        // Set its href to the receipt URL
        link.href = receiptUrl;
        // Set the download attribute to force download
        link.download = 'receipt.jpg';
        // Append the link to the document body
        document.body.appendChild(link);
        // Click the link to trigger download
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
    });
});

// Function to get user's display name
function getUserDisplayName() {
    // Get the currently authenticated user
    const user = firebase.auth().currentUser;

    // If user is authenticated and display name exists, return the display name
    if (user && user.displayName) {
        return user.displayName;
    } else {
        return "Guest"; // Default to "Guest" if display name is not available
    }
}