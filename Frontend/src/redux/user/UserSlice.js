import { createSlice } from "@reduxjs/toolkit";

const initialState= {
        loading: false,
        currentUser: null,
        error: null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers :{
        signInStart : (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess :(state,action)=>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
});

export const  {signInStart,signInSuccess,signInFailure,signOutSuccess} = userSlice.actions;

export default userSlice.reducer;