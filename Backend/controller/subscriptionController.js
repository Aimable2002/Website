import Subscription from "../Model/subscriptionModel.js";

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
            redirect_url: 'https://website-s9ue.onrender.com/account',
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
    console.log('called')
    const {_id: user} = req.user
    console.log('user :', user)
    const { amount, email, phoneNumber, currency } = req.body;

    try {
        // const response = await axios.post('https://api.flutterwave.com/v3/charges', {
        const response = await axios.post('https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda', {
            // const response = await axios.post('https://api.flutterwave.com/v3/subscriptions', {

            tx_ref: `hooli-tx-${Date.now()}`,
            amount: amount,
            currency: currency,
            email: email,
            payment_type: "mobilemoneyrwanda",
            redirect_url: 'https://website-s9ue.onrender.com/', 
            phone_number: phoneNumber,
            customer: {
                email: email,
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

        const { start_date } = response.data.created_at;
        const expiration_date = new Date(start_date);
        //expiration_date.setMonth(expiration_date.getMonth() + 1);  // Fixed 1-month duration

         // Calculate expiration date based on duration and unit
         if (unit === 'days') {
            expiration_date.setDate(expiration_date.getDate() + 1);
        } else if (unit === 'weeks') {
            expiration_date.setDate(expiration_date.getDate() + (1 * 7));
        }
        const subscription = new Subscription({
            email,
            userId: user,
            amount,
            currency,
            status: response.data.status,
            start_date: new Date(start_date),
            expiration_date
        })
        
        await subscription.save();

        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment link:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}




// console.log('amount :', amount)
//         console.log('phoneNumber :', phoneNumber)
//         console.log('response :', response.data)