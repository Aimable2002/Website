import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';

const PaymentPage = ({ userId }) => {
    const [amount, setAmount] = useState('');
    const [customer, setCustomer] = useState({ email: '', name: '' });
    const {AuthUser} = useAuthContext();
    const { paymentStatus, initiatePayment, isInitiatingPayment } = usePayment(AuthUser);


    return (
        <div>
            <h1>Initiate Payment</h1>

            {paymentStatus && (
                <div>
                    <h2>Payment Successful</h2>
                    <p>Transaction Reference: {paymentStatus.data.tx_ref}</p>
                    <p>Amount: {paymentStatus.data.amount}</p>
                    <p>Customer: {paymentStatus.data.customer.name}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
