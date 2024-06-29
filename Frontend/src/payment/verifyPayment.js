import React from 'react'

const verifyPayment = () => {
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
}

export default verifyPayment