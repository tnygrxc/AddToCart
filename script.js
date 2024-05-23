let cartCount = 0;
let totalPrice = 0.00;
const cartItems = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    totalPrice += productPrice;

    cartItems.push({ name: productName, price: productPrice });

    updateCartDisplay();
  });
});

document.getElementById('confirm-cart').addEventListener('click', () => {
  const customerName = document.getElementById('customer-name').value;
  const customerAddress = document.getElementById('customer-address').value;
  const customerContact = document.getElementById('customer-contact').value;

  if (customerName && customerAddress && customerContact) {
    displayReceipt(customerName, customerAddress, customerContact);
    resetCart();
  } else {
    alert("Please fill in all customer information fields.");
  }
});

function updateCartDisplay() {
  document.getElementById('cart').innerText = `Cart (${cartCount})`;
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = `${item.name} - ₱${item.price.toFixed(2)}`;
    cartItemsList.appendChild(listItem);
  });
  document.getElementById('total-price').innerText = totalPrice.toFixed(2);

  document.getElementById('confirm-cart').style.display = cartCount > 0 ? 'block' : 'none';
}

function displayReceipt(customerName, customerAddress, customerContact) {
  document.getElementById('receipt-customer-name').innerText = customerName;
  document.getElementById('receipt-customer-address').innerText = customerAddress;
  document.getElementById('receipt-customer-contact').innerText = customerContact;

  const receiptItemsList = document.getElementById('receipt-items');
  receiptItemsList.innerHTML = '';
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = `${item.name} - ₱${item.price.toFixed(2)}`;
    receiptItemsList.appendChild(listItem);
  });
  document.getElementById('receipt-total-price').innerText = totalPrice.toFixed(2);

  document.getElementById('receipt').style.display = 'block';
}

function resetCart() {
  cartCount = 0;
  totalPrice = 0.00;
  cartItems.length = 0;
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-address').value = '';
  document.getElementById('customer-contact').value = '';
  updateCartDisplay();
}
