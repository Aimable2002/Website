import axios from 'axios'
import React, { useState } from 'react'

const useMobile = () => {
  const [loading, setLoading] = useState('')

  const applyPayment = async ({email, amount, phoneNumber, currency}) => {
    setLoading(true)
    try{
        const res = await axios.post('https://website-s9ue.onrender.com/mobile', {
            email,
            amount,
            phoneNumber,
            currency
        })
        const data = res.data
        console.log('data:', data.meta.authorization.redirect)
        if(!data){
            throw new Error ('error with data ')
        }
        console.log(data)
        if (data && data.meta && data.meta.authorization && data.meta.authorization.redirect) {
            window.location.href = data.meta.authorization.redirect;
        } else {
            console.log('Unexpected response format', response.data);
        }
    }catch(error){
        console.log('error :', error.message)
    }finally{
        setLoading(false)
    }
  }
  return { loading, applyPayment };
}

export default useMobile