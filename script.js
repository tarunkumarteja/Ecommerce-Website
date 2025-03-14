const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
var totEle = document.getElementById('total');
var totEle2 = document.getElementById('total2');
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

document.addEventListener('DOMContentLoaded', function () {
    const removeButtons = document.querySelectorAll('.fa-times-circle');
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const cartItems = document.querySelector('tbody');
    const totEle = document.getElementById('total');
    const totEle2 = document.getElementById('total2');

    // Function to update the total amount in the cart
    function updateCartTotal() {
        let cartTotal = 0;
        cartItems.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
            const quantity = parseInt(row.querySelector('input[type="number"]').value);
            const subtotal = price * quantity;
            row.querySelector('td:nth-child(6)').textContent = `$${subtotal.toFixed(2)}`;
            cartTotal += subtotal;
        });
        // Update the total display in the DOM
        totEle.textContent = `$${cartTotal.toFixed(2)}`;
        totEle2.textContent = `$${cartTotal.toFixed(2)}`;
    }

    // Event listener to handle changes in quantity input fields
    cartItems.addEventListener('input', function (event) {
        if (event.target && event.target.matches('input[type="number"]')) {
            let quantity = parseInt(event.target.value);
            if (quantity < 1) {
                quantity = 1; // Ensure that the minimum quantity is 1
            }
            event.target.value = quantity;

            // Find the row for the corresponding item
            const row = event.target.closest('tr');
            const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
            row.querySelector('td:nth-child(6)').textContent = `$${(price * quantity).toFixed(2)}`;

            // Update the total cart value
            updateCartTotal();
        }
    });

    // Event listener to handle the removal of items
    cartItems.addEventListener('click', function (event) {
        if (event.target && event.target.matches('.fa-times-circle')) {
            const row = event.target.closest('tr');
            row.remove();
            // Update the total after item removal
            updateCartTotal();
        }
    });

    // Function to add an item to the cart (example)
    function addItemToCart(productName, productPrice, productImage) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${productImage}" alt="${productName}"></td>
            <td>${productName}</td>
            <td>$${productPrice}</td>
            <td><input type="number" value="1" min="1"></td>
            <td>$${productPrice}</td>
        `;
        cartItems.appendChild(newRow);

        // Update the total after adding the new item
        updateCartTotal();
    }

    // Example of adding an item dynamically (You can use this when needed)
    // addItemToCart("Cartoon Astronaut T-Shirt", 118.19, "img/products/f5.jpg");
});
