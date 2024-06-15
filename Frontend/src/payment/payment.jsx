import React from 'react';
import axios from 'axios';

const Payment = () => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:4000/create-payment', {
                amount: 1000,
                currency: 'FRW', // Change to the appropriate currency
                externalId: '123456',
                payer: {
                    partyIdType: 'MSISDN',
                    partyId: '0787462384' // Replace with the payer's phone number
                },
                payerMessage: 'Payment for services',
                payeeNote: 'Thank you for your business'
            });

            if (response.data.status === 'success') {
                console.log('Payment initiated successfully');
            } else {
                console.error('Payment initiation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>MTN Mobile Money Payment</h1>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
