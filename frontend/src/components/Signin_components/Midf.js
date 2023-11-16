import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import Loader from '../Loader';
import './Midf.css';

export default function Midf() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleErrorAlert() {
        if(errors.email) {
            alert(errors.email.message);
        }
        else if(errors.password) {
            alert(errors.password.message);
        }
    }

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        try {
            setLoading(true);
            const response = await axios.post("/backend/signin", data);
            if(response.data.status === 40000) {
                alert("Signin failed!\nPlease try again.\n");
            }
            else if(response.data.status === 200) {
                alert("Signin was successful!\n");
                navigate("/list", {
                    state: {
                        userName: response.data.name,
                        userEmail: data.email
                    }
                });
            }
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
        }
        setLoading(false);
    };

    return(
        <div id='component_2_1'>
            {loading && <Loader type="spin" color="#2D9CDB" message="Please wait a moment..." />}
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='Rectangle_1'>
                        <input
                            type='email'
                            name='email'
                            className='mid_input'
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
                    <div id='Rectangle_2'>
                        <input
                            type='password'
                            name='password'
                            className='mid_input'
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
                    <button
                        type='submit'
                        id='signin_button'
                        onClick={handleErrorAlert} >
                        Sign in
                    </button>
                </form>
            }
        </div>
    );
}
