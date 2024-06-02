import { create } from 'zustand';

const initialState = {
    selectedpost:  JSON.parse(localStorage.getItem('selectedpost')) ||null,
    likes: [],
    follow: [],
    posts: []
};

const relationShip = create((set) => ({
    ...initialState,
    setUser: (user) => {
        if(!user) {
            localStorage.removeItem('selectedpost')
        }else{
        localStorage.setItem('selectedpost', JSON.stringify(user));
    }
        set({ selectedUser: user });
    },
    setLikes: (likes) => set({ likes }),
    setFollow: (follow) => set({ follow }),
    setPosts: (posts) => set({ posts })
}));

export default relationShip;