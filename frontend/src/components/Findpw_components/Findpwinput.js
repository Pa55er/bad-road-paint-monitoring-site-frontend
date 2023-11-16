import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import Loader from '../Loader';
import './Findpwinput.css';

export default function Findpwinput() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleErrorAlert() {
        if(errors.email) {
            alert(errors.email.message);
        }
    }

    const navigate = useNavigate();
    
    function handleFindpwCancel() {
        navigate("/signin");
    }

    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        try {
            setLoading(true);
            const response = await axios.post("/backend/findpw", data);
            if(response.data.status === 40000) {
                alert("This email does not exist!\n");
            }
            else if(response.data.status === 200) {
                alert("A newly created password has been sent to your email!\n");
                navigate("/signin");
            }
            else {
                alert("Password update failed!\n");
            }
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
        }
        setLoading(false);
    };

    if (loading) return <Loader type="spin" color="#2D9CDB" message="Please wait a moment..." />;

    return (
        <div id='Findpwinput_rectangle_1'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id='Findpwniput_rectangle_2'>
                    <input
                        type='email'
                        name='email'
                        id='Findpwniput_email'
                        placeholder='Type your email here.'
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
                <button
                    type='submit'
                    id='Findpw_submit'
                    onClick={handleErrorAlert} >
                    Reset Password
                </button>
                <button
                    type='button'
                    id='Findpw_cancel'
                    onClick={handleFindpwCancel} >
                    Cancel
                </button>
            </form>
        </div>
    );
    
}
