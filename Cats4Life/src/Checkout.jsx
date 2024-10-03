import { Link } from 'react-router-dom'; 
import './Checkout.css';
import { useEffect, useState } from 'react';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]); // Cart items   
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        ccv: '',
        expiryDate: '',
        email: '',
        phone: '',
    });

    // Function to retrieve cart items from localStorage
    const getCartItems = () => {
        const items = localStorage.getItem('cartItems');
        return items ? JSON.parse(items) : [];
    };

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
    }, []);

    // Function to handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle "Checkout" button
    const handleCheckout = () => {
        alert("Thank you for your puurrrchase! Click Home to return to the homepage! ");
       
    };

    // Function to handle "Home" button click (clear cart and form)
    const handleHomeClick = () => {
        localStorage.removeItem('cartItems'); // Clear cart items from localStorage
        setCartItems([]); // Clear cart 
        setFormData({ // Reset 
            name: '',
            cardNumber: '',
            ccv: '',
            expiryDate: '',
            email: '',
            phone: '',
        });
    };

    //Home button sends you back to main page and clear cart and form
    return (
        <div>
            <div className="header">
                <Link to="/" onClick={handleHomeClick}> {/* Links Home button to the main App.jsx page. */}
                    <button className="home-button">Home</button>
                </Link>
            </div>

            <h2>Checkout</h2>
            <div className="cart">
                {cartItems.length > 0 ? (
                    cartItems.map((cat, index) => (
                        <div key={index} className="cart-item">
                            <img src={cat.url} alt={cat.CatName} />
                            <div>
                                <h3>{cat.CatName}</h3>
                                <p>Price: ${cat.CatPrice}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>
            {/* Form For user details to be filled in to complete purchase */}
            <div className="total">
                <h3>Total: ${cartItems.reduce((total, cat) => total + parseFloat(cat.CatPrice), 0).toFixed(2)}</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Long Card Number:</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>CCV:</label>
                    <input type="text" name="ccv" value={formData.ccv} onChange={handleChange} required />
                </div>
                <div>
                    <label>Expiry Date (MM/YY):</label>
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <button type="submit">Checkout</button>
            </form>
        </div>
    );
};

export default Checkout;
