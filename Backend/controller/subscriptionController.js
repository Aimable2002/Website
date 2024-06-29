import Subscription from "../Model/subscriptionModel.js";

import axios from 'axios'

const FLW_PUBLIC_KEY = process.env.FLW_PUBLIC_KEY;
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;


export const paymentSub = async (req, res) => {
    const { amount, email, currency } = req.body;

    console.log('colled')
     
    
    try {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {
            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency,
            redirect_url: 'http://localhost:4000/api/subscription/mobile-response',
            customer: {
                email,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
            },
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('email :', email)
        console.log('currency :', currency)
        console.log('phone_number :', amount)
        console.log('response.data :', response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}


export const OneTimePayment = async (req, res) => {
    //console.log('called :', req.body)
    const {_id: user} = req.user
    const { amount, email, phoneNumber, currency } = req.body;
    const webhookUrl = `https://website-s9ue.onrender.com/webhook/${user}`;

    // if(!amount || !email || !phoneNumber || !currency || !unit ){
    //     return res.status(409).json({message: 'fill the the field'})
    // }

    try {
        // const response = await axios.post('https://api.flutterwave.com/v3/charges', {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {
            // const response = await axios.post('https://api.flutterwave.com/v3/subscriptions', {

            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency: currency,
            email: email,
            payment_type: "mobilemoneyrwanda",
            redirect_url: 'http://localhost:2000/',
            phone_number: phoneNumber,
            customer: {
                email: email,
            },
            customizations: {
                title: 'Payment for items in cart',
                description: 'Payment for items in cart',
            },
            webhook_url: webhookUrl,
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const paymentStatus = response.data.status;
        //console.log('payment status :', response)
        if (paymentStatus === "success"){
            // const { start_date } = response.data.created_at;
        const start_date = new Date();
        const expiration_date = new Date(start_date);
        //expiration_date.setMonth(expiration_date.getMonth() + 1);  // Fixed 1-month duration

         // Calculate expiration date based on duration and unit
         if (amount === '100') {
            expiration_date.setDate(expiration_date.getDate() + 7);
        } else if (amount === '200') {
            expiration_date.setDate(expiration_date.getDate() + 1);
        } else if (amount === '300') {
            expiration_date.setDate(expiration_date.getDate() + 2);
        }
        //console.log('response :', response.data)
        const transactionId = response.data.id;
        console.log('transactionId :', transactionId)
        res.json({transactionId, ...response.data});
        // res.status(200).json({message: 'Payment successful',  data: response.data} );
        }else{
            console.log('technical error', response.data)
            res.status(200).json({message: 'Payment failed'})
        }
        // else{
        //     console.log('technical error', response.data)
        //     res.status(200).json({message: 'Payment failed',  data: response.data })
        // }

        

        
    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}




export const subscription = async(req, res) => {
    try{
        const {_id: user} = req.user
        const { amount, email, phoneNumber, currency } = req.body;

    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}