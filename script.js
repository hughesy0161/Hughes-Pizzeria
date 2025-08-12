// Contact Form Validation (existing)
function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contact-form').reset();
    } else {
        alert('Please fill out all fields.');
    }
}

// Online Ordering Cart Functionality
let cart = [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - £${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    toggleCart(); // Open cart after adding
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkout(event) {
    event.preventDefault();
    const name = document.getElementById('checkout-name').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();

    if (name && address && phone && cart.length > 0) {
        // In a real site, send order to backend or email service
        alert(`Order placed! Total: £${document.getElementById('cart-total').textContent}\nDetails: ${name}, ${address}, ${phone}\nItems: ${cart.map(item => item.name).join(', ')}`);
        cart = [];
        updateCart();
        toggleCart();
        document.getElementById('checkout-form').reset();
    } else {
        alert('Please fill out all fields and add items to cart.');
    }
}

// Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const name = item.getAttribute('data-name');
        const price = item.getAttribute('data-price');
        addToCart(name, price);
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
