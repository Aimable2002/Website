// src/store/useUserStore.js
import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  follows: [],
  likes: [],
  
  addFollow: async (userId) => {
    try {
      await axios.post(`/api/follow/${userId}`);
      set((state) => ({
        follows: [...state.follows, userId],
      }));
    } catch (error) {
      console.error('Error following user:', error);
    }
  },
  
  removeFollow: async (userId) => {
    try {
      await axios.delete(`/api/follow/${userId}`);
      set((state) => ({
        follows: state.follows.filter(id => id !== userId),
      }));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  },
  
  addLike: async (postId) => {
    try {
      await axios.post(`/api/like/${postId}`);
      set((state) => ({
        likes: [...state.likes, postId],
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  },
  
  removeLike: async (postId) => {
    try {
      await axios.delete(`/api/like/${postId}`);
      set((state) => ({
        likes: state.likes.filter(id => id !== postId),
      }));
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  },

  getFollows: async () => {
    try {
      const response = await axios.get('/api/follow');
      set({ follows: response.data });
    } catch (error) {
      console.error('Error fetching follows:', error);
    }
  },

  getLikes: async () => {
    try {
      const response = await axios.get('/api/like');
      set({ likes: response.data });
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  },
}));

export default useUserStore;
