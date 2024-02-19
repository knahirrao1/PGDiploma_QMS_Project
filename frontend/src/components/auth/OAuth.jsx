import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/UserSlice';

const OAuth = () => {
    const dispatch = useDispatch
    //we have to use firebase for giving that popup to select google account and create a different post request to the backend 
    // for the backend if the user exist sign in the user if not create a new user
    const auth = getAuth(app);
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try{
            const resultFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultFromGoogle);
            const res = await axios.post(`${server}/google`,
            { 
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email : resultFromGoogle.user.email,
                    //googlePhotoUrl : resultFromGoogle.user.photoURL,
                })
            })
            if(res.status === 200){
                dispatch(signInSuccess(res.data))
                //navigate("/sign-up");
              }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <button type='button' className='btn-btn-success' onClick={handleGoogleClick}>
        <AiFillGoogleCircle  className='w-6 h-6 mr-2'/>
        continue with google
    </button>
  )
}

export default OAuth;