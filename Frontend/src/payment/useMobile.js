import axios from 'axios'
import React, { useState } from 'react'

// const useMobile = () => {
//   const [loading, setLoading] = useState('')

//   const applyPayment = async ({email, amount, phoneNumber, currency}) => {
//     setLoading(true)
//     try{
//         const token = localStorage.getItem('online-user')
//         const res = await axios.post('http://localhost:4000/api/subscription/mobile', {
//             email,
//             amount,
//             phoneNumber,
//             currency
//         }, {
//             headers: {
//                 Authorization: `${JSON.parse(token).token}`,
//             }
//         })
//         const data = res.data
//         console.log('data:', data)
//         if(!data){
//             throw new Error ('error with data ')
//         }
//         console.log(data)
//         if (data && data.meta && data.meta.authorization && data.meta.authorization.redirect) {
//             window.location.href = data.meta.authorization.redirect;
//         } else if(data && data.meta && data.meta.authorization && data.meta.authorization.redirect) {
//             window.location.href = 'localhost:2000/mobile'
//         }
//         else {
//             alert('An error occurred. Please try again.');
//             console.log('Unexpected response format', data);
//         }
//         return response.data.transactionId;
//     }catch(error){
//         console.log('error :', error.message)
//     }finally{
//         setLoading(false)
//     }
//   }
//   return { loading, applyPayment };
// }

// export default useMobile










const useMobile = () => {
    const [loading, setLoading] = useState('');
  
    const applyPayment = async ({ email, amount, phoneNumber, currency }) => {
      setLoading(true);
      try {
        const token = localStorage.getItem('online-user');
        const res = await axios.post('https://website-s9ue.onrender.com/api/subscription/mobile', {
          email,
          amount,
          phoneNumber,
          currency
        }, {
          headers: {
            Authorization: `${JSON.parse(token).token}`,
          }
        });
  
        const data = res.data;
        if (!data) {
          throw new Error('error with data');
        }
  
        if (data && data.meta && data.meta.authorization && data.meta.authorization.redirect) {
          window.location.href = data.meta.authorization.redirect;
        }else {
          alert('An error occurred. Please try again.');
        }
  
        return data.transactionId;
      } catch (error) {
        console.log('error:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const verifyTransaction = async (transactionId) => {
      setLoading(true);
      try {
        const res = await axios.get(`https://website-s9ue.onrender.com/api/verify-transaction/${transactionId}`);
        const data = res.data;
        console.log('Verification response:', data);
        return data;
      } catch (error) {
        console.log('Error verifying transaction:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, applyPayment, verifyTransaction };
  };
  
  export default useMobile;
  