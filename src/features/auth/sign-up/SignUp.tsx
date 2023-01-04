import React from 'react';
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {loginTC} from "../auth-slice";

const SignUp = () => {

    const dispatch = useAppDispatch()
    const register = () => {
        dispatch(loginTC({email:"dsfsd@gmail.com",
        password:"32423",phone:"dfsssfasfsd",username:"testUser"}))
    }
    return (
        <div>
            <button onClick={() => {
                register()
            }}> common reg this</button>
        </div>
    );
};

export default SignUp;