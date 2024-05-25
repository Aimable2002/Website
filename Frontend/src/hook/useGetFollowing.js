import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useGetFollowing = (userId) => {
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFollowing = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('online-user');
            console.log(token)
            const res = await axios.get(`http://localhost:4000/api/action/following/${userId}`,{}, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            });

            const data = res.data
            console.log('data :', data)
            if(!data){
                throw new Error ('no data fetched')
            }

            setFollowing(data)
        }catch(error){
            console.log('fail to fetch following on client')
        }finally{
            setLoading(false)
        }
    }
    if(userId?._id){
        getFollowing()
    }else{
        setFollowing([])
    }
  },[userId?._id])
  return {loading, following}
}


export default useGetFollowing
