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

    // Func to handle when "Proceed to Payment" button is clicked
    const handleCheckout = () => {
        alert("Thank you for your purchase!");
        
    };

    return (
        <div>
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
