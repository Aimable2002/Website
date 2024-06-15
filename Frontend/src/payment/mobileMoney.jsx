import React, { useState } from 'react';
import axios from 'axios';

const MobileMoney = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currency, setCurrency] = useState('RWF'); // Default to RWF for Rwanda Mobile Money

    const handlePayment = async () => {
        try {
            const response = await axios.post('https://website-s9ue.onrender.com/create-mobile-money-payment', {}, {
                amount,
                currency,
                email,
                phone_number: phoneNumber,
            });

            if (response.data.status === 'success') {
                window.location.href = response.data.data.link;
            } else {
                alert('Payment initiation failed.');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('An error occurred while initiating payment.');
        }
    };

    return (
        <div>
            <h1>Flutterwave Mobile Money Payment</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="UGX">UGX (Uganda)</option>
                <option value="GHS">GHS (Ghana)</option>
                <option value="RWF">RWF (Rwanda)</option>
                {/* <!-- Add more currencies as needed --> */}
            </select>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default MobileMoney;
