import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { loginAuth } from '../api/auth.api'
import { useNavigate } from 'react-router-dom'
import { uploadFile } from '../../redux/slices/slices'


const Login = () => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const select = useSelector((state) => state.file.value)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setdata] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const a = await loginAuth(data);
            if (a.token) {
                dispatch(uploadFile(a.user.file));
                localStorage.setItem("image", a.user.file);
                alert(a.message);
                navigate('/dashboard');

            }
        } catch (error) {
            alert("Some Error Occured");
        }


        setdata(null);

        handleClose();



    }


    return (
        <>
            <Button size='md' variant="primary" onClick={handleShow} className='border border-primary bg-white text-primary'>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ background: '#6d5dff', color: '#fff', border: 'none' }}>
                    <Modal.Title >Login</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <form action="">


                        <div className='w-100 my-2 py-3'>
                            <label className='mb-1'> Email:</label>
                            <input type="email" placeholder='Enter your Email' name='email' id='email' required className='w-100 p-1' required
                                onChange={
                                    (e) => {
                                        setdata((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }
                                }

                            />
                        </div>

                        <div className='mb-3'>
                            <label className='mb-1'>Password :</label>
                            <input type="password" placeholder='Enter your Password' name='password' id='password' required className='w-100 p-1' required
                                onChange={
                                    (e) => {
                                        setdata((prev) => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }
                                }


                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='bg-white text-secondary border none'>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} style={{ background: '#6d5dff', color: '#fff', border: 'none' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default Login;