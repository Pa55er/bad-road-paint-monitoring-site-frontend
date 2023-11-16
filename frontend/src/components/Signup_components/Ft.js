import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import Loader from '../Loader';
import './Ft.css';

export default function Ft() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleErrorAlert() {
        if(errors.name) {
            alert(errors.name.message);
        }
        else if(errors.email) {
            alert(errors.email.message);
        }
        else if(errors.password) {
            alert(errors.password.message);
        }
        else if(errors.tel) {
            alert(errors.tel.message);
        }
    }

    const navigate = useNavigate();
    
    function handleSignupCancel(e) {
        e.preventDefault();
        navigate("/signin");
    }

    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        try {
            setLoading(true);
            const response = await axios.post("/backend/signup", data);
            if(response.data.status === 40000) {
                alert("You are not on the whitelist!\n");
            }
            else if(response.data.status === 40001) {
                alert("This email is already in use!\nPlease use another email.\n");
            }
            else if(response.data.status === 200) {
                alert("Your account has been successfully created!\n");
                navigate("/signin");
            }
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
        }
        setLoading(false);
    };

    if (loading) return <Loader type="spin" color="#2D9CDB" message="Please wait a moment..." />;

    return(
        <div id='ft'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id='name_box'>
                    <input
                        type='text'
                        name='name'
                        className='ft_input'
                        placeholder='Type your Name here.'
                        {...register("name", {
                            required: 'Name is required!',
                            minLength: {
                                value: 8,
                                message: 'The name must be between 8 and 20 characters long!',
                            },
                            maxLength: {
                                value: 20,
                                message: 'The name must be between 8 and 20 characters long!',
                            }
                        })}
                    />
                </div>
                <div id='email_box'>
                    <input
                        type='email'
                        name='email'
                        className='ft_input'
                        placeholder='Type your Email here.'
                        {...register("email", {
                            required: 'Email is required!',
                            maxLength: {
                                value: 45,
                                message: 'Email must be less than 45 characters long!',
                            },
                            pattern: {
                              value: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i,
                              message: 'Email is not valid!'
                            }
                        })}
                    />
                </div>
                <div id='ps_box'>
                    <input
                        type='password'
                        name='password'
                        className='ft_input'
                        placeholder='Type your password here.'
                        {...register("password", {
                            required: 'Password is required!',
                            minLength: {
                                value: 8,
                                message: 'The password must be between 8 and 20 characters long!',
                            },
                            maxLength: {
                                value: 20,
                                message: 'The password must be between 8 and 20 characters long!',
                            }
                        })}
                    />
                </div>
                <div id='pn_box'>
                    <input
                        type='tel'
                        name='tel'
                        className='ft_input'
                        placeholder='Type your Phone number here.'
                        {...register("tel", {
                            required: 'Phone Number is required!',
                            minLength: {
                                value: 9,
                                message: 'Phone Number must be between 9 and 13 characters long!',
                            },
                            maxLength: {
                                value: 13,
                                message: 'Phone Number must be between 9 and 13 characters long!',
                            }
                        })}
                    />
                </div>
                <button
                    type='submit'
                    id='signup_button'
                    onClick={handleErrorAlert} >
                    Sign up
                </button>
                <button id='cancel_button' onClick={handleSignupCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );

}
