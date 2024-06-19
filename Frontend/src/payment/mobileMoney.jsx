import React, { useState } from 'react';
import axios from 'axios';
import useMobile from './useMobile';

const MobileMoney = () => {
    // const [email, setEmail] = useState('');
    // const [amount, setAmount] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [currency, setCurrency] = useState('RWF'); // Default to RWF for Rwanda Mobile Money
    const [input, setInput] = useState({
        email: "",
        amount: "",
        phoneNumber: "",
        currency: "RWF"
      })
    const { loading, applyPayment } = useMobile();
      const handlePayment = async(e) => {
        e.preventDefault();
        const {amount, email, phoneNumber, currency} = input
        console.log('inputs :', input)
        await applyPayment(input)
      }

    return (
        <div>
            <h1>Mobile Money Payment</h1>
            <input
                type="email"
                placeholder="Email"
                value={input.email}
                onChange={(e) => setInput({...input, email: e.target.value})}
            />
            <input
                type="number"
                placeholder="Amount"
                value={input.amount}
                onChange={(e) => setInput({...input, amount: e.target.value})}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={input.phoneNumber}
                onChange={(e) => setInput({...input, phoneNumber: e.target.value})}
            />
            <select value={input.currency} onChange={(e) => setInput({...input, currency: e.target.value})}>
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
