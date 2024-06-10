import React, { createContext, useReducer, useContext } from 'react';
import './App.css'; // Importing the CSS file

// Create a context for the cart
const CartContext = createContext();

// Initial state
const initialState = {
    products: [
        {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://specs-tech.com/wp-content/uploads/2020/01/iPhone-9-600x600.jpg",
            "images": [
                "https://specs-tech.com/wp-content/uploads/2020/01/iPhone-9-600x600.jpg",
            ],
            "quantity": 1
        },
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
            "images": [
                "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
            ],
            "quantity": 1
        },
        {
            "id": 3,
            "title": "Samsung Universe 9",
            "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
            "price": 1249,
            "discountPercentage": 15.46,
            "rating": 4.09,
            "stock": 36,
            "brand": "Samsung",
            "category": "smartphones",
            "thumbnail": "https://i5.walmartimages.com/asr/80aad70e-23d9-4bac-b938-2a64c5e7a563.2e769bfe8c5e1dc83053b6edb4d053ff.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
            "images": [
                "https://i5.walmartimages.com/asr/80aad70e-23d9-4bac-b938-2a64c5e7a563.2e769bfe8c5e1dc83053b6edb4d053ff.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
            ],
            "quantity": 1
        },
        {
            "id": 4,
            "title": "OPPOF19",
            "description": "OPPO F19 is officially announced on April 2021.",
            "price": 280,
            "discountPercentage": 17.91,
            "rating": 4.3,
            "stock": 123,
            "brand": "OPPO",
            "category": "smartphones",
            "thumbnail": "https://gumlet.assettype.com/digitalterminal/import/uploads/news/1617775291s_oppo.jpg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
            "images": [
                "https://gumlet.assettype.com/digitalterminal/import/uploads/news/1617775291s_oppo.jpg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
            ],
            "quantity": 1
        },
        {
            "id": 5,
            "title": "Huawei P30",
            "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            "price": 499,
            "discountPercentage": 10.58,
            "rating": 4.09,
            "stock": 32,
            "brand": "Huawei",
            "category": "smartphones",
            "thumbnail": "https://i1.wp.com/mobilecryptotech.com/wp-content/uploads/2019/03/IMG_20190316_215658.jpg?fit=1920%2C1920&ssl=1",
            "images": [
                "https://i1.wp.com/mobilecryptotech.com/wp-content/uploads/2019/03/IMG_20190316_215658.jpg?fit=1920%2C1920&ssl=1",
            ],
            "quantity": 1
        }
    ],
    totalQuantity: 5,
    totalAmount: 3476
};

// Reducer function to manage state updates
const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREASE_QUANTITY':
            return updateQuantity(state, action.payload.id, 1);
        case 'DECREASE_QUANTITY':
            return updateQuantity(state, action.payload.id, -1);
        default:
            return state;
    }
};

// Helper function to update the quantity
const updateQuantity = (state, id, change) => {
    const products = state.products.map(product => {
        if (product.id === id) {
            return { ...product, quantity: Math.max(product.quantity + change, 0) };
        }
        return product;
    });

    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);

    return { ...state, products, totalQuantity, totalAmount };
};

// Cart provider component
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access cart context
const useCart = () => useContext(CartContext);

// Cart item component
const CartItem = ({ product }) => {
    const { dispatch } = useCart();

    const increaseQuantity = () => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: { id: product.id } });
    };

    const decreaseQuantity = () => {
        if (product.quantity > 0) {
            dispatch({ type: 'DECREASE_QUANTITY', payload: { id: product.id } });
        }
    };

    return (
      <div className='container'>
        <div className="cart-item">
            <div className="product-image">
                <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-details">
                <h3>{product.title}</h3>
                <p>Description: {product.description}</p>
                <p>Brand: {product.brand}</p>
                <p>Rating: {product.rating}</p>
                <div className="price-and-quantity">
                    <p>Price: ${product.price}</p>
                    <div className="quantity-controls">
                        <button onClick={increaseQuantity}>+</button>
                        <span>{product.quantity}</span>
                        <button onClick={decreaseQuantity}>-</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

// Cart component
const Cart = () => {
  const { state } = useCart();

  return (
      <div className="cart">
          <h2 className='shop'>Shopping Cart</h2>
          <div className="cart-items">
              {state.products.map(product => (
                  <CartItem key={product.id} product={product} />
              ))}
          </div>
          <div className="cart-summary">
              <h2>Total Quantity: {state.totalQuantity}</h2>
              <h2>Total Amount: ${state.totalAmount}</h2>
          </div>
      </div>
  );
};

// App component
const App = () => (
    <CartProvider>
        <Cart />
    </CartProvider>
);

export default App;
