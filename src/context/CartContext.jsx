import React, { createContext, useContext, useReducer } from 'react';

// Actions du panier
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// État initial du panier
const initialState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0
};

// Fonction pour calculer le total et le nombre d'articles
const calculateCartTotals = (items) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { total, itemCount };
};

// Reducer du panier
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, selectedColor, selectedSize } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && 
                item.selectedColor === selectedColor && 
                item.selectedSize === selectedSize
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Article existe déjà, augmenter la quantité
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nouvel article
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedColor,
          selectedSize,
          quantity: 1,
          inStock: product.inStock
        };
        newItems = [...state.items, newItem];
      }

      const { total, itemCount } = calculateCartTotals(newItems);
      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { id, selectedColor, selectedSize } = action.payload;
      const newItems = state.items.filter(
        item => !(item.id === id && 
                 item.selectedColor === selectedColor && 
                 item.selectedSize === selectedSize)
      );
      const { total, itemCount } = calculateCartTotals(newItems);
      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, selectedColor, selectedSize, quantity } = action.payload;
      if (quantity <= 0) {
        // Si la quantité est 0 ou moins, supprimer l'article
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          payload: { id, selectedColor, selectedSize }
        });
      }

      const newItems = state.items.map(item =>
        item.id === id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount } = calculateCartTotals(newItems);
      return {
        ...state,
        items: newItems,
        total,
        itemCount
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
};

// Création du contexte
const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Fournisseur du contexte du panier
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Actions du panier
  const addToCart = (product, selectedColor = null, selectedSize = null) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, selectedColor, selectedSize }
    });
  };

  const removeFromCart = (id, selectedColor = null, selectedSize = null) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id, selectedColor, selectedSize }
    });
  };

  const updateQuantity = (id, quantity, selectedColor = null, selectedSize = null) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity, selectedColor, selectedSize }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Fonction pour vérifier si un produit est dans le panier
  const isInCart = (id, selectedColor = null, selectedSize = null) => {
    return state.items.some(
      item => item.id === id && 
              item.selectedColor === selectedColor && 
              item.selectedSize === selectedSize
    );
  };

  // Fonction pour obtenir la quantité d'un produit dans le panier
  const getItemQuantity = (id, selectedColor = null, selectedSize = null) => {
    const item = state.items.find(
      item => item.id === id && 
              item.selectedColor === selectedColor && 
              item.selectedSize === selectedSize
    );
    return item ? item.quantity : 0;
  };

  const value = {
    // État
    items: state.items,
    isOpen: state.isOpen,
    total: state.total,
    itemCount: state.itemCount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    
    // Utilitaires
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;