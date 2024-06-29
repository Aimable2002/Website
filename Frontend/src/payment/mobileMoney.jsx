import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMobile from './useMobile';

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

const MobileMoney = () => {
    // const [email, setEmail] = useState('');
    // const [amount, setAmount] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [currency, setCurrency] = useState('RWF'); // Default to RWF for Rwanda Mobile Money
    const [input, setInput] = useState({
        email: "",
        amount: "",
        phoneNumber: "",
        currency: "RWF",
        unit: "MONTH"
      })
    const { loading, applyPayment } = useMobile();
      const handlePayment = async(e) => {
        e.preventDefault();
        const {amount, email, phoneNumber, currency, unit} = input
        console.log('inputs :', input)
        await applyPayment(input)
      }


    // const handlePayment = async (e) => {
    //     e.preventDefault();
    //     const { amount, email, phoneNumber, currency, unit } = input;
    //     console.log('inputs:', input);
    //     const transactionId = await applyPayment(input);
    //     if (transactionId) {
    //       const verificationData = await verifyTransaction(transactionId);
    //       console.log('Verification Data:', verificationData);
    //     }
    //   };

    // return (
    //   <div>
    //         <h1>Mobile Money Payment</h1>
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             value={input.email}
    //             onChange={(e) => setInput({...input, email: e.target.value})}
    //         />
    //         <input
    //             type="number"
    //             placeholder="Amount"
    //             value={input.amount}
    //             onChange={(e) => setInput({...input, amount: e.target.value})}
    //         />
    //         <input
    //             type="tel"
    //             placeholder="Phone Number"
    //             value={input.phoneNumber}
    //             onChange={(e) => setInput({...input, phoneNumber: e.target.value})}
    //         />
    //         <select value={input.unit} onChange={(e) => setInput({...input, unit: e.target.value})}>
    //             <option value="month">FRW (Month)</option>
    //             <option value="2months">FRW (2-Months)</option>a
    //             <option value="week">FRW (week)</option>
    //             {/* <!-- Add more currencies as needed --> */}
    //         </select>
    //         <select value={input.currency} onChange={(e) => setInput({...input, currency: e.target.value})}>
    //             <option value="UGX">UGX (Uganda)</option>
    //             <option value="GHS">GHS (Ghana)</option>
    //             <option value="RWF">RWF (Rwanda)</option>
    //             {/* <!-- Add more currencies as needed --> */}
    //         </select>
    //         <button onClick={handlePayment}>Pay Now</button>
    //     </div>
    // );
      const [isMenu, setIsMenu] = useState()
      const handleMenu = (e)=> {
        e.preventDefault();
        setIsMenu(!isMenu)
      }
      const [paymentStatus, setPaymentStatus] = useState(null);
      useEffect(() => {
        const checkPaymentStatus = async () => {
            const userId = JSON.parse(localStorage.getItem('online-user')).userId; // Get userId from localStorage
            const token = JSON.parse(localStorage.getItem('online-user')).token; // Get token from localStorage

            try {
                const response = await axios.get(`https://website-s9ue.onrender.com/api/subscription/payment-status/${userId}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });

                setPaymentStatus(response.data.status);
                console.log('response status :', response.data)
            } catch (error) {
                console.error('Error checking payment status:', error);
            }
        };

        // Polling every 5 seconds
        const intervalId = setInterval(checkPaymentStatus, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);
    return (
        <div className='flex flex-col w-full'>
            <div style={{background: 'green', width: '100%', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px'}}>
                <div className={`hdr flex flex-row justify-between w-full px-10 mt-4 ${isMenu ? 'h-40' : 'h-20'}`}>
                    <div>Monthly Plan</div>
                    <div onClick={handleMenu}>{ !isMenu ? <MenuIcon /> : <ClearIcon /> }</div>
                </div>
                {isMenu && (
                    <div className='flex flex-col absolute top-12 gap-3 right-4'>
                        <button>Weekly plan</button>
                        <button>Monthly plan</button>
                        <button>2 Months plan</button>
                    </div>
                )}
            </div>
            <div className='w-full flex justify-center mt-0 align-middle' style={{ height: '80%'}}>
                <div style={{width: '80%', height: '80%'}}>
                    <form>
                        <label htmlFor="">email</label>
                        <input 
                            type="text" 
                            value={input.email}
                            onChange={(e) => setInput({...input, email: e.target.value})}    
                        />
                        <label htmlFor="">Amount</label>
                        <input 
                            type="number" 
                            value={input.amount}
                            onChange={(e) => setInput({...input, amount: e.target.value})}
                        />
                        <label htmlFor="">phone-number</label>
                        <input 
                            type="tel" 
                            value={input.phoneNumber}
                            onChange={(e) => setInput({...input, phoneNumber: e.target.value})}
                        />
                        <select style={{outline: 'none', border: 'none'}} value={input.unit} onChange={(e) => setInput({...input, unit: e.target.value})}>
                            <option value="MONTH">FRW (Month)</option>
                            <option value="2months">FRW (2-Months)</option>a
                            <option value="week">FRW (week)</option>
                        </select>
                        <select style={{outline: 'none', border: 'none'}} value={input.currency} onChange={(e) => setInput({...input, currency: e.target.value})}>
                            <option value="UGX">UGX (Uganda)</option>
                            <option value="GHS">GHS (Ghana)</option>
                            <option value="RWF">RWF (Rwanda)</option>
                        </select>
                    </form>
                    <div className='flex justify-center align-middle mt-10'>
                    <button 
                    style={{background: 'green', borderRadius: '10px'}}
                        className='px-12 py-2'
                        onClick={handlePayment}>{loading ? <span className='loading loading-ring'></span> : 'Pay Now'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MobileMoney;
