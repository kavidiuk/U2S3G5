// Function to submit the form data
document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form data
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;

  // Prepare data for API request
  const productData = {
    name: productName,
    price: parseFloat(productPrice) // Convert to float
    // Add other properties as needed
  };

  // Make API request (POST)
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMTUzNjMyNWM5NzAwMTg3ZmEwMzkiLCJpYXQiOjE2OTk2MTYwNTQsImV4cCI6MTcwMDgyNTY1NH0.A0UdmmhOvueQQo5wkmuRrLREPZGA-qAxhpjq2K5l9fY"
    },
    body: JSON.stringify(productData)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((newProduct) => {
      // Update the product list with the new product
      fetchAndDisplayProducts();

      // Clear the form
      resetForm();
    })
    .catch((error) => console.error("There was a problem with the fetch operation:", error.message));
});

// Function to reset the form
function resetForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
}

// Fetch and display existing products on page load
fetchAndDisplayProducts();

// Function to fetch and display existing products
function fetchAndDisplayProducts() {
  fetch("https://striveschool-api.herokuapp.com/api/product")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((products) => {
      // Update the product table with existing products
      const productTableBody = document.getElementById("productTableBody");
      productTableBody.innerHTML = ""; // Clear existing content

      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description || ""}</td>
      <td>${product.brand || ""}</td>
      <td>${product.price}</td>
      <td>${product._id}</td>
      <td>${product.userId}</td>
      <td>${product.createAt || ""}</td>
      <td>${product.updateAt || ""}</td>
      <td>Action buttons here</td>
    `;
        productTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("There was a problem with the fetch operation:", error.message));
}