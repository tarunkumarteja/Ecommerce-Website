const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the necessary DOM elements
    const removeButtons = document.querySelectorAll('.fa-times-circle'); // Remove item buttons
    const quantityInputs = document.querySelectorAll('input[type="number"]'); // Quantity input fields
    const subtotals = document.querySelectorAll('td:nth-child(6)'); // Subtotal columns
    const prices = [118.19, 118.19, 118.19]; // Example prices for each item
    const totalDisplay = document.querySelector('#subtotal td strong'); // Total display in the cart tools section
    const cartItems = document.querySelector('tbody'); // Table body for cart items

    // Function to update the total amount in the cart
    function updateCartTotal() {
        let cartTotal = 0;
        subtotals.forEach((subtotal, index) => {
            cartTotal += parseFloat(subtotal.textContent.replace('$', ''));
        });
        totalDisplay.textContent = `$${cartTotal.toFixed(2)}`;
    }

    // Event listener to update subtotals when quantity is changed
    quantityInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const quantity = parseInt(input.value);
            if (quantity < 1) {
                input.value = 1; // Prevent negative or zero quantity
            }
            const subtotal = prices[index] * parseInt(input.value);
            subtotals[index].textContent = `$${subtotal.toFixed(2)}`;
            updateCartTotal();
        });
    });

    // Event listener for removing items from the cart
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove the item from the table
            const row = button.closest('tr');
            row.remove();

            // Update the total after removal
            updateCartTotal();
        });
    });

    // Function to add a new item to the cart (example)
    function addItemToCart(productName, productPrice, productImage) {
        // Create a new row for the cart item
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${productImage}" alt="${productName}"></td>
            <td>${productName}</td>
            <td>$${productPrice}</td>
            <td><input type="number" value="1" min="1"></td>
            <td>$${productPrice}</td>
        `;
        
        // Append the new row to the cart
        cartItems.appendChild(newRow);

        // Add event listener to the remove button of the new item
        const newRemoveButton = newRow.querySelector('.fa-times-circle');
        newRemoveButton.addEventListener('click', function() {
            newRow.remove();
            updateCartTotal();
        });

        // Add event listener to the quantity input of the new item
        const newQuantityInput = newRow.querySelector('input[type="number"]');
        newQuantityInput.addEventListener('input', function() {
            const newQuantity = parseInt(newQuantityInput.value);
            if (newQuantity < 1) {
                newQuantityInput.value = 1; // Prevent negative or zero quantity
            }
            const newSubtotal = productPrice * newQuantity;
            newRow.querySelector('td:nth-child(2)').textContent = `$${newSubtotal.toFixed(2)}`;
            updateCartTotal();
        });

        // Update the total after adding the new item
        updateCartTotal();
    }

    // Example of how to add a new item to the cart (you can use this to dynamically add items)
    // Add a sample item when the page loads (for demonstration purposes)
    // addItemToCart("Cartoon Astronaut T-Shirt", 118.19, "img/products/f1.jpg");
    // You can call addItemToCart() with new item details as needed
});
