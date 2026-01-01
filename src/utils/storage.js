/*
  Simple helper functions to manage data in LocalStorage.
  This keeps our component code clean and easy to read.
*/

// CART FUNCTIONS

// Get all items currently in the cart
export const getCart = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
};

// Save a list of items to the cart
export const saveCart = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Notify other components that cart data has changed
    window.dispatchEvent(new Event('storage'));
};

// Add a single item to the cart
export const addToCart = (newItem) => {
    const currentCart = getCart();
    const existingItem = currentCart.find(item => item.id === newItem.id);

    let updatedCart;
    if (existingItem) {
        // If item exists, increase quantity
        updatedCart = currentCart.map(item =>
            item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        // If item is new, add it with quantity 1
        updatedCart = [...currentCart, { id: newItem.id, quantity: 1 }];
    }

    saveCart(updatedCart);
};

// Update the quantity of a specific item
export const updateItemQuantity = (itemId, newQuantity) => {
    const currentCart = getCart();

    // If quantity is 0 or less, remove the item
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const updatedCart = currentCart.map(item => {
        if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });
    saveCart(updatedCart);
};

// Remove an item from the cart
export const removeFromCart = (itemId) => {
    const currentCart = getCart();
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
};

// Clear the cart completely
export const clearCart = () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
};

// --- ORDER FUNCTIONS ---

// Get the list of past orders
export const getOrders = () => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
};

// Save a new order
export const saveOrder = (order) => {
    const currentOrders = getOrders();
    const updatedOrders = [...currentOrders, order];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
};
