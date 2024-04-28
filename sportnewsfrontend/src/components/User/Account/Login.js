import React, { useState } from 'react';
import '../Account/Login.scss'
import Register from './Register';
import { NavLink } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {loginUser} from '../../../services/account'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { usLoginSuccess } from '../../../redux/action/usAction';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()
    const defaultObjValueInput ={
        isValidEmail: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValueInput)
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          // Nếu phím Enter được nhấn, gọi hàm xử lý đăng nhập
          handleLogin();
        }
      };

    const dispatch = useDispatch(); 
    const handleLogin = async (e) => {
        setObjValidInput(defaultObjValueInput)
        if(!email){
            setObjValidInput({...defaultObjValueInput, isValidEmail: false})
            toast.error("Please enter your email!")
            return;
        }
        if(!password){
            setObjValidInput({...defaultObjValueInput, isValidPassword: false})
            toast.error("Please enter your password!")
            return;
        }
        let response = await loginUser(email, password);
        if(response && response.EC === 0){
            dispatch(usLoginSuccess(response.DT))       
            toast.success(response.EM)
            history.push('/home')
            setPassword("");
        }
        else{
            toast.error(response.EM)
            setPassword("");
        }
    };
    
    const [isShowRegister, setIsShowRegister] = useState(false);

    const handleClose = () => {
        setIsShowRegister(false);
    }
    return (
        <div className='login-container'>
            <div className='container'>
                <div className='row px-5 px-sm-0'>
                    <div className='content-left col-sm-7 d-none d-sm-block'>
                        <div className='loginTitle'>Sport News</div>

                    </div>

                    <div className='content-right col-12 col-sm-5' >

                        <div className='loginForm d-flex flex-column gap-3 py-sm-3 ' >
                            <div className='loginTitle d-sm-none'>
                                Sport News
                            </div>
                            
                            <input
                                type='text'
                                name='email'
                                id='email'
                                className={objValidInput.isValidEmail ? 'form-control' : 'is-invalid form-control'}
                                placeholder='Email address'
                                required
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                            
                            <input
                                type='password'
                                name='password'
                                id='password'
                                className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                onKeyDown={handleKeyDown}
                            />
                                
                            <button className='loginBtn btn btn-primary' onClick={() => handleLogin()}>Login</button>
                            <NavLink href='/forgot-pass' className='forgot-pass text-center'>Forgotten password?</NavLink>
                            <hr />
                            <div className='text-center'>
                            <button className='registerBtn btn btn-success'onClick={()=> setIsShowRegister(true)}>
                                Create New Account
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Register
                show={isShowRegister}
                handleClose={handleClose}
            />
        </div>
    );
};
export default Login;