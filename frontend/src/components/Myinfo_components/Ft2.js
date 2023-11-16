import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from '../Loader';
import './Ft2.css';

export default function Ft2({ userName, userEmail }) {

    const isMounted = useRef(false);
    const [phoneNumValue, setPhoneNum] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function loadingMyinfo() {
        try {
            setLoading(true);
            const response = await axios.post("/backend/myinfo", {
                email: userEmail
            });
            setPhoneNum(response.data.tel);
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
            navigate("/signin", {
                replace: true
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isMounted.current) {
            loadingMyinfo();
            isMounted.current = true;
        }
    });

    function handleMyinfoBack() {
        navigate('/list', {
            state: {
                userName: userName,
                userEmail: userEmail
            },
            replace: true
        })
    }

    // 리액트 hook form
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    function handleMyinfoResetPW() {
        if(errors.old) {
            alert(errors.old.message);
        }
        else if(errors.new) {
            alert(errors.new.message);
        }
        else if(errors.confirm) {
            alert(errors.confirm.message);
        }
    }

    async function onSubmit(data) {
        try {
            setLoading(true);
            data.email = userEmail;
            delete data.confirm;
            const response = await axios.put("/backend/myinfo", data);
            if(response.data.status === 40000) {
                alert("Failed to change!\n");
            }
            else if(response.data.status === 200) {
                alert("Your password changed successfully!\nPlease sign in again.\n");
                navigate('/signin', {
                    replace: true
                })
            }
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
            navigate("/signin", {
                replace: true
            });
        }
        setLoading(false);
    };

    async function handleMyinfoDelete() {
        try {
            setLoading(true);
            const response = await axios.delete("/backend/myinfo", {
                data: {
                    email: userEmail
                },
            });
            if(response.data.status === 200) {
                alert("Your account has been successfully deleted!\n");
                navigate("/signin", {
                    replace: true
                });
            }
            else {
                alert("Failed to delete account!\n");
            }
        } catch (error) {
            alert("Cannot connect with Backend server!\n");
            navigate("/signin", {
                replace: true
            });
        }
        setLoading(false);
    }

    if (loading) return <Loader type="spin" color="#2D9CDB" message="Please wait a moment..." />;

    return(
        <div id='ft_2'>
            <div id='ft_2_nameLabel'>
                Name :
            </div>
            <div className='ft_2_infoRectangle'>
                <div id='ft_2_nameValue' className='ft_2_infoValue'>
                    {userName}
                </div>
            </div>
            <div id='ft_2_emailLabel'>
                Email :
            </div>
            <div className='ft_2_infoRectangle'>
                <div id='ft_2_emailValue' className='ft_2_infoValue'>
                    {userEmail}
                </div>
            </div>
            <div id='ft_2_pnLabel'>
                Phone Number :
            </div>
            <div className='ft_2_infoRectangle'>
                <div id='ft_2_pnValue' className='ft_2_infoValue'>
                    {phoneNumValue}
                </div>
            </div>
            <button id='ft_2_backbutton' onClick={handleMyinfoBack}>
                {'<'} Back
            </button>
            <div id='Myinfo_input_rectangle'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='Myinfo_input_oldLabel'>
                        Old password :
                    </div>
                    <div className='Myinfo_input_rectangle_1'>
                        <input
                            type='password'
                            name='old'
                            className='Myinfo_input_value'
                            placeholder='Type old passwrod here.'
                            {...register("old", {
                                required: 'Old Password is required!',
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
                    <div id='Myinfo_input_newLabel'>
                        New password :
                    </div>
                    <div className='Myinfo_input_rectangle_1'>
                        <input
                            type='password'
                            name='new'
                            className='Myinfo_input_value'
                            placeholder='Type new password here.'
                            {...register("new", {
                                required: 'New password is required!',
                                minLength: {
                                    value: 8,
                                    message: 'The password must be between 8 and 20 characters long!',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'The password must be between 8 and 20 characters long!',
                                },
                                validate: {
                                    check: (val) => {
                                        if (getValues("old") === val) {
                                            return 'New password must be different with old password!';
                                        }
                                    },
                                }
                            })}
                        />
                    </div>
                    <div id='Myinfo_input_confirmLabel'>
                        Confirm password :
                    </div>
                    <div className='Myinfo_input_rectangle_1'>
                        <input
                            type='password'
                            name='confirm'
                            className='Myinfo_input_value'
                            placeholder='Type new password here again.'
                            {...register("confirm", {
                                required: 'Confirm Password is required!',
                                validate: {
                                    check: (val) => {
                                    if (getValues("new") !== val) {
                                        return 'Confirm password must be same with new password!';
                                    }
                                    },
                                },
                            })}
                        />
                    </div>
                    <button
                        type='submit'
                        id='Myinfo_input_save'
                        onClick={handleMyinfoResetPW} >
                        Change Password
                    </button>
                </form>
            </div>
            <div id='ft_2_deleteLabel'>
                Wanna delete account?
            </div>
            <button id='ft_2_deletebutton' onClick={handleMyinfoDelete}>
                Delete
            </button>
        </div>
    );
}
