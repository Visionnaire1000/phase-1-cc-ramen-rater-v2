
// Set the base URL for the API
const baseURL = 'http://localhost:3000';

// Function to fetch and display ramen images on page load
function displayRamens() {
  fetch(`${baseURL}/ramens`)
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      ramenMenuDiv.innerHTML = ''; // Clear existing ramen menu if any
      ramens.forEach((ramen) => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
        ramenImage.dataset.id = ramen.id; // Store ramen ID for later reference
        ramenImage.classList.add('ramen-image');
        ramenImage.addEventListener('click', handleClick);
        ramenMenuDiv.appendChild(ramenImage);
      });
    })
    .catch((error) => console.error('Error fetching ramen data:', error));
}

// Function to handle clicking on a ramen image
function handleClick(event) {
  const ramenId = event.target.dataset.id;
  fetch(`${baseURL}/ramens/${ramenId}`)
    .then((response) => response.json())
    .then((ramen) => {
      const ramenDetailDiv = document.getElementById('ramen-detail');
      ramenDetailDiv.querySelector('.detail-image').src = ramen.image;
      ramenDetailDiv.querySelector('.detail-image').alt = ramen.name;
      ramenDetailDiv.querySelector('.name').textContent = ramen.name;
      ramenDetailDiv.querySelector('.restaurant').textContent = ramen.restaurant;
      document.getElementById('rating-display').textContent = ramen.rating;
      document.getElementById('comment-display').textContent = ramen.comment;
    })
    .catch((error) => console.error('Error fetching ramen details:', error));
}

// Function to handle form submission to add a new ramen
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    // POST the new ramen to the server
    fetch(`${baseURL}/ramens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then((response) => response.json())
      .then((ramen) => {
        // Add new ramen to the menu dynamically
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image;
        ramenImage.alt = ramen.name;
        ramenImage.dataset.id = ramen.id;
        ramenImage.classList.add('ramen-image');
        ramenImage.addEventListener('click', handleClick);
        ramenMenuDiv.appendChild(ramenImage);
      })
      .catch((error) => console.error('Error adding new ramen:', error));
  });
}

// Main function to start the program logic
function main() {
  // Display ramen images when the page loads
  displayRamens();

  // Attach the submit listener to the form
  addSubmitListener();
}

// Wait for the DOM to be fully loaded before starting
document.addEventListener('DOMContentLoaded', main);
