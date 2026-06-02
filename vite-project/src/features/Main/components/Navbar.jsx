import React, { useState } from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import Addtask from './Addtask'
import Topaddtask from './Topaddtask'
import { getTasks } from '../api/tasks.api'
import { getPersonalTasks, getWorkTasks, getFavTasks, getLearningTasks } from '../api/category.api'
import MorningJogCard from '../../Card/components/Card'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from '../../loading/Loading '
import SkeletonCard from '../../Skeleton/Skeleton'
import Notasks from './Notasks'
import { logOut } from '../../auth/api/auth.api'
import NoTasks from '../../Skeleton/Not found'
import './Navbar.css'

const API = import.meta.env.VITE_API_URL;

const Navbarmain = () => {
    const [skeleton, setskeleton] = useState(3)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    // const file = useSelector((state) => state.file.value);

    const file = localStorage.getItem("image");

    const [task, settask] = useState([])

    const [profile, setprofile] = useState();

    const [loading, setLoading] = useState(false)

    let arr;


    async function handleShowTask() {

        try {
            setLoading(true);
            const res = await getTasks();
            if (!res.task) {
                alert(res.message);
                return;
            }
            let arr = await res.task;
            settask(arr);
            setskeleton(arr.length);

            navigate('/dashboard/card', { state: arr });
        } finally {
            setLoading(false);
        }
    }


    async function handleShowFav() {
        try {
            setLoading(true);
            const res = await getFavTasks();
            if (!res.task) {
                let arr = null;
                navigate('/dashboard/notfound')
                return;
            }
            let arr = await res.task;
            settask(arr);

            setskeleton(arr.length);
            navigate('/dashboard/card', { state: arr });
        } finally {
            setLoading(false);
        }
    }


    async function handleShowWork() {
        try {
            setLoading(true);
            const res = await getWorkTasks();
            if (!res.task) {
                alert(res.message);
                return;
            }
            let arr = await res.task;
            settask(arr);

            setskeleton(arr.length);
            navigate('/dashboard/card', { state: arr });


        } finally {
            setLoading(false);
        }

    }
    async function handleShowPersonal() {
        try {
            setLoading(true);
            const res = await getPersonalTasks();
            if (!res.task) {
                alert(res.message);
                return;
            }
            let arr = await res.task;
            settask(arr);

            setskeleton(arr.length);
            navigate('/dashboard/card', { state: arr });
        } finally {
            setLoading(false);
        }

    }
    async function handleShowLearning() {
        try {
            setLoading(true);
            const res = await getLearningTasks();
            if (!res.task) {
                alert(res.message);
                return;
            }
            let arr = await res.task;
            settask(arr);
            setskeleton(arr.length);
            navigate('/dashboard/card', { state: arr });
        } finally {
            setLoading(false);
        }

    }

    async function handleLogout() {

        const res = await logOut();
        if (res) {
            navigate('/');
        }
    }

    return (
        <>


            <Navbar expand="lg" className="evs-navbar px-3">

                <Navbar.Brand className="d-flex align-items-center">
                    <img
                        src="/Assests/EVSLogo.png"
                        alt="EVS LOGO"
                        className="img-fluid object-fit-contain"
                        style={{ width: "clamp(80px, 15vw, 160px)", height: "auto" }}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 mt-3 mt-lg-0">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center w-100 gap-3">

                            {/* LEFT BUTTONS */}
                            <div className="evs-left-group">
                                <button onClick={handleShowTask} className="evs-nav-btn btn">
                                    <i className="fa-solid fa-list-check"></i>All Tasks
                                </button>
                                <div className="evs-divider d-none d-lg-block" />
                                <button onClick={handleShowFav} className="evs-nav-btn btn">
                                    <i className="fa-solid fa-bookmark"></i>Favourite
                                </button>
                                <div className="evs-divider d-none d-lg-block" />
                                <button onClick={handleShowWork} className="evs-nav-btn btn">
                                    <i className="fa-solid fa-briefcase"></i>Work
                                </button>
                                <div className="evs-divider d-none d-lg-block" />
                                <button onClick={handleShowPersonal} className="evs-nav-btn btn">
                                    <i className="fa-solid fa-user-plus"></i>Personal
                                </button>
                                <div className="evs-divider d-none d-lg-block" />
                                <button onClick={handleShowLearning} className="evs-nav-btn btn">
                                    <i className="fa-solid fa-book-open-reader"></i>Learning
                                </button>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="evs-right-group ms-lg-auto">

                                <NavDropdown
                                    id="profile-dropdown"
                                    align="end"
                                    title={
                                        <img
                                            src={file
                                                ? `${API}/uploads/${file}`
                                                : "/Assests/default.png"}
                                            alt="Profile"
                                            width="40"
                                            height="40"
                                            style={{ objectFit: "cover", cursor: "pointer" }}
                                            className='rounded-circle'
                                        />
                                    }
                                >

                                    <NavDropdown.Item onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-2" />Logout</NavDropdown.Item>
                                </NavDropdown>

                                <Topaddtask />
                            </div>

                        </div>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

            <Container className='border none shadow p-3 rounded fw-bolder fs-6 ' style={{ color: '#6d5dff' }}>
                <i className="fa-solid fa-list-check"></i> All Tasks


            </Container>

            <div className="d-flex justify-content-center align-items-center text-center">

                {loading ? (

                    < div className="d-flex flex-wrap gap-2 ms-5 pt-5">
                        {
                            [...Array(skeleton)].map((i) => (
                                <SkeletonCard key={Math.random()} />
                            ))
                        }


                    </div>



                ) : (
                    task.length === 0 ? <Notasks></Notasks> :

                        <Outlet />
                )}
            </div>

        </>
    )
}

export default Navbarmain