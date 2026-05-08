import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// import { toggle } from '../redux/slices/Buttonslice.jsx'
import { useAuth } from '../api/auth.api'
import Navbarmain from '../../Main/components/Navbar'
// import Loading from '../../loading/Loading '
import { useNavigate } from 'react-router-dom'
import { uploadFile } from '../../redux/slices/slices'


const Register = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const select = useSelector((state) => state.file.value)
    const [error, seterror] = useState(false)




    const [data, setdata] = useState({
        username: '',
        email: '',
        password: '',
        contact: '',
        file: ''
    })


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const a = await useAuth(data);

            if (a.token) {
                dispatch(uploadFile(a.user.file));
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
            <Button size='md' variant="primary" onClick={handleShow} style={{ background: '#6d5dff', color: '#fff', border: 'none' }}>
                Sign Up
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ background: '#6d5dff', color: '#fff', border: 'none' }}>
                    <Modal.Title >Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    {
                        (error) &&
                        <div className='border border-danger border-3 text-danger w-100 p-3 rounded' >Failed to register</div>



                    }

                    <form action="">
                        <div className='w-100 my-2 py-3'>
                            <input type="text" placeholder='Full name' name='username' id='username' required className='w-100 p-1' onChange={(e) =>
                                setdata((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            } />
                        </div>

                        <div className='w-100 my-2 py-3'>
                            <input type="email" placeholder='Email' name='email' id='email' required className='w-100 p-1' onChange={(e) =>
                                setdata((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            } />
                        </div>

                        <div className='d-flex flex-md-row mt-4  justify-content-between '>
                            <div>
                                <input type="password" placeholder='Password' name='password' id='password' required className='w-100 p-1' onChange={(e) =>
                                    setdata((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                } />
                            </div>
                            <div>
                                <input type="number" placeholder='Contact' name='contact' id='contact' required className='w-100 p-1' onChange={(e) =>
                                    setdata((prev) => ({
                                        ...prev,
                                        contact: e.target.value
                                    }))
                                } />
                            </div>
                        </div>

                        
                        <div className=' my-2 py-3 '>
                            <input
                                onChange={(e) =>
                                    setdata((prev) => ({
                                        ...prev,
                                        file: e.target.files[0]
                                    }))
                                }
                                type="file"
                            />
                        </div>
                        {/* Custom Bootstrap Button */}
                        {/* <button

                                    onClick={handleClick}
                                    className="btn btn-primary px-3 py-2"
                                    style={{ wordBreak: "break-all" }}
                                >
                                    <i className="fa-solid fa-cloud-arrow-up"></i> {fileName}
                                </button> */}

                        {/* </div> */}

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='bg-white text-secondary border none'>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} type='submit' style={{ background: '#6d5dff', color: '#fff', border: 'none' }} >
                        <i className="fa-solid fa-floppy-disk"></i> Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default Register