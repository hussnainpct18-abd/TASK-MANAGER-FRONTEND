import React from 'react'
import { Nav } from 'react-bootstrap'
import Login from '../../auth/pages/Login'
import Register from '../../auth/pages/Register'
import Welcome from '../../Welcome/welcome'
import '../components/style.css'

const Board = ({setuser}) => {
    return (
        <>

            <Nav  className='d-flex flex-row justify-content-between border border none  shadow back'>
                <Nav.Item className="w-25  d-flex align-items-center justify-content-center">
                    <img
                        sizes='sm'
                        src="/Assests/EVSLogo.png"
                        alt="EVS LOGO"
                        className="img-fluid object-fit-contain "
                        style={{ maxWidth: "80%", maxHeight: "75%" }}
                    />
                </Nav.Item>
                <div className='d-flex flex-row gap-3 mt-sm-3 p-3 '>
                    <Nav.Item className='mt-4' >
                        <Login setuser={setuser}></Login>
                    </Nav.Item>
                    <Nav.Item className='mt-4'>
                        <Register></Register>
                    </Nav.Item>
                </div>
            </Nav>
            <div>
                <Welcome></Welcome>
            </div>


        </>

    )
}

export default Board