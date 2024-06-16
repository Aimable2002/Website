import axios from 'axios'
import React, { useState } from 'react'

const useMobile = () => {
  const [loading, setLoading] = useState('')

  const applyPayment = async ({email, amount, phoneNumber, currency}) => {
    setLoading(true)
    try{
        const res = await axios.post('/mobile', {
            email,
            amount,
            phoneNumber,
            currency
        })
        const data = res.data
        console.log('data')
        if(!data){
            throw new Error ('error with data ')
        }
        console.log(data)
        window.location ='/'
    }catch(error){
        console.log('error :', error.message)
    }finally{
        setLoading(false)
    }
  }
  return { loading, applyPayment };
}

export default useMobile