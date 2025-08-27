import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';



const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,          // 5% tax rate //
    grandTotal: 0,
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existingItem = state.products.find((product) => product.id === item.id);
      
    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     state.cartItems.push({ ...item, quantity: 1 });
    //   }
                                        // OR
    const isExist = state.products.find((product) => product._id === action.payload._id);
    if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
        // alert("Item added to the cart");
        toast.success('Item added to the cart.');
    } else {
    //    alert("Item already exists in the cart");  
    toast.error('Item already exists in the cart.');      
    }

    state.selectedItems = setSelectedItems(state);
    state.totalPrice = setTotalPrice(state);
    state.tax = setTax(state);
    state.grandTotal = setGrandTotal(state);
    // console.log('Add to Cart Action:', action.payload);
   
    },

    updateQuantity: (state, action) => {
        // console.log('Update Quantity Action:', action.payload);
        
        const products = state.products.map((product) => {
            // console.log('Current Product:', product);
            if (product._id === action.payload.id) {
                if (action.payload.type === 'increment') {
                    product.quantity += 1;
                } else if (action.payload.type === 'decrement' && product.quantity > 1) {
                    product.quantity -= 1;
                }
            }

            return product;
        });
        // Update the state with the new products array
        state.selectedItems = setSelectedItems(state);
        state.totalPrice = setTotalPrice(state);
        state.tax = setTax(state);
        state.grandTotal = setGrandTotal(state);

    },

    removeFromCart: (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload.id);
        state.selectedItems = setSelectedItems(state);
        state.totalPrice = setTotalPrice(state);
        state.tax = setTax(state);
        state.grandTotal = setGrandTotal(state);
    },

    clearCart: (state) => {
        state.products = [];
        state.selectedItems = 0;
        state.totalPrice = 0;
        state.tax = 0;
        state.grandTotal = 0;
    },

  },
})


// Utility functions
export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return Number (total + product.quantity);
}, 0)

export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number (total + (product.price * product.quantity));
}, 0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return Number (setTotalPrice(state) + setTax(state));
}


// Action creators are generated for each case reducer function
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
