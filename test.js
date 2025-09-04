const cartIcon=document.querySelector('.cart-icon')
const cartTab=document.querySelector('.cart-tab')
const cartValue = document.querySelector('.cart-value')
const cartList = document.querySelector('.cart-list')
const cartTotal = document.querySelector('.cart-total')
const cardList=document.querySelector('.card-list')

// Initialize cart array
let cart = [];

cartIcon.addEventListener('click',()=>cartTab.classList.add('cart-tab-active'))

const closeBtn=document.querySelector('.close-btn')
closeBtn.addEventListener('click',()=>cartTab.classList.remove('cart-tab-active'))

const productList = [
    {
        id: 1,
        name: "Double Beef Burger",
        price: "Rs.300",
        image: "images/burger.png"
    },
    {
        id: 2,
        name: "Veggie Pizza",
        price: "Rs.340",
        image: "images/pizza.png"
    },
    {
        id: 3,
        name: "Fried Chicken",
        price: "Rs.200", 
        image: "images/fried-chicken.png"
    },
    {
        id: 4,
        name: "Chicken Roll",
        price: "Rs.400",
        image: "images/chicken-roll.png"
    },
    {
        id: 5,
        name: "Sub Sandwich",
        price: "Rs.100",
        image: "images/sandwich.png"
    },
    {
        id: 6,
        name: "Chicken Lasagna",
        price: "Rs.230",
        image: "images/lasagna.png"
    },
    {
        id: 7,
        name: "Italian Spaghetti",
        price: "Rs.300",
        image: "images/spaghetti.png"
    },
    {
        id: 8,
        name: "Spring Roll",
        price: "Rs.430",
        image: "images/spring-roll.png"
    }
];
console.log(productList)

// Update cart badge
const updateCartBadge = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartValue.textContent = totalItems;
}

// Calculate and update total
const updateCartTotal = () => {
    const total = cart.reduce((sum, item) => {
        return sum + (parseFloat(item.price.replace('Rs.', '')) * item.quantity);
    }, 0);
    cartTotal.textContent = `Rs.${total}`;
}

// Add item to cart
const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartBadge();
    displayCartItems();
    updateCartTotal();
}

// Remove item from cart
const removeFromCart = (productId) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartBadge();
    displayCartItems();
    updateCartTotal();
}

// Display cart items
const displayCartItems = () => {
    cartList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price} x ${item.quantity}</p>
                <p>Total: Rs.${parseFloat(item.price.replace('Rs.', '')) * item.quantity}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
        `;
        cartList.appendChild(cartItem);

        // Add quantity control listeners
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        
        minusBtn.addEventListener('click', () => removeFromCart(item.id));
        plusBtn.addEventListener('click', () => addToCart(item));
    });
}

const showCards = () => {
    productList.forEach(product => {
        const orderCard = document.createElement('div')
        orderCard.classList.add('order-card')

        orderCard.innerHTML = `     
        <div class="card-image">
            <img src="${product.image}">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>`;
        
        cardList.appendChild(orderCard)

        const cardBtn = orderCard.querySelector('.card-btn')
        cardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(product);
        })
    })
}

// Initialize cart display
updateCartBadge();
showCards();