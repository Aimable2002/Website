// import { useEffect, useState } from 'react';
// import { useSocketContext } from '../context/socketContext';

// import axios from 'axios';
// import Conversation from '../pages/zustand/zustand';

// const useListenCount = () => {
//   const { socket } = useSocketContext();
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const {selectedUser, messages, setMessages} = Conversation();

//   useEffect(() => {
//     // Fetch initial unread counts
//     const fetchUnreadCounts = async () => {
//       try {
//         const token = localStorage.getItem('online-user')
//         const response = await axios.get(`/api/message/unreadCount/${selectedUser._id}`, {
//             headers: {
//                 Authorization: `${JSON.parse(token).token}`
//             }
//         });
//         const counts = response.data.reduce((acc, item) => {
//           acc[item._id] = item.count;
//           return acc;
//         }, {});
//         setUnreadCounts(counts);
//       } catch (error) {
//         console.error('Error fetching unread counts:', error);
//       }
//     };

//     fetchUnreadCounts();

//     socket?.on("newMessage", (newMessage) => {
//       setUnreadCounts(prevCounts => ({
//         ...prevCounts,
//         [newMessage.senderId]: (prevCounts[newMessage.senderId] || 0) + 1
//       }));
//     });

//     return () => socket?.off("newMessage");
//     },[socket, setMessages, messages, selectedUser?._id])

//   return { unreadCounts };
// };

// export default useListenCount;
