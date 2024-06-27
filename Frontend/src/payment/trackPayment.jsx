// src/VerifyTransaction.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyTransaction = () => {
    const [transactionId, setTransactionId] = useState('');
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [error, setError] = useState(null);

    const verifyTransaction = async () => {
        try {
            const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
                headers: {
                    Authorization: `Bearer YOUR_SECRET_KEY`, 
                },
            });
            setTransactionStatus(response.data);
            setError(null);
        } catch (err) {
            setTransactionStatus(null);
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div>
            <h1>Verify Transaction</h1>
            <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
            />
            <button onClick={verifyTransaction}>Verify</button>
            {transactionStatus && (
                <div>
                    <h2>Transaction Status</h2>
                    <pre>{JSON.stringify(transactionStatus, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default VerifyTransaction;