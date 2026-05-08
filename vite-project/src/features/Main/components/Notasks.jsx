import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Addtask from './Addtask';

const Notasks = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <div className='d-flex flex-column justify-content-center align-items-center mt-5 pt-5'>
                <span
                    className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                        width: "50px",
                        height: "50px"
                    }}
                >
                    <i className="fa-solid fa-list-check text-black fw-bolder"></i>
                </span>
                <h4 className='fw-bolder mt-3'> No Tasks yet ?</h4>
                <p className=''>Get started by organizing your first task .Stay<br />Stay organized and boost your productivity</p>





                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}
                <Addtask></Addtask>


            </div>


        </>
    )
}

export default Notasks