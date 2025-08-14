const API_URL = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("userList");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch user data
async function fetchUserData() {
  // Clear the current content and error message
  userList.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    // Loop through the users and display their details
    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");

      userCard.innerHTML = `
        <strong>Name:</strong> ${user.name} <br />
        <strong>Email:</strong> ${user.email} <br />
        <strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}
      `;

      userList.appendChild(userCard);
    });
  } catch (error) {
    errorDiv.textContent = `Error fetching data: ${error.message}`;
  }
}

// Initial fetch when the page loads
fetchUserData();

// Reload button to refetch user data
reloadBtn.addEventListener("click", fetchUserData);
