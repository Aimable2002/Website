import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:4000/create-payment', {
                amount,
                currency: 'USD',
                email,
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
            <h1>Flutterwave Payment</h1>
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
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;

