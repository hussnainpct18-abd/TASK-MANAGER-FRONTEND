import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { Container, Row, Col, Card, Nav, InputGroup } from "react-bootstrap";
import { createTask, updateTaskById } from '../api/tasks.api';
import { editSlice } from '../../redux/slices/editData'
import { useSelector, useDispatch } from 'react-redux';
import { uploadData } from '../../redux/slices/editData';
const Topaddtask = () => {
    const [show, setShow] = useState(false);
    const [update, setupdate] = useState(false)

    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        dispatch(uploadData(null));
    };
    const handleShow = () => setShow(true);

    const editData = useSelector(state => state.edit.value);


    const [task, settask] = useState({
        title: "",
        dueDate: "",
        dueTime: "",
        category: "",
        status: "",
        progress: "",
        description: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (update) {
                const res = updateTaskById(editData._id, task);
                if (res) {
                    alert("Task Updated Successfully");
                }
                handleClose(false)
            } else {
                const res = createTask(task);

                if (res.task) {
                    alert("Task created successfully");
                }

                // settask(null);
                handleClose(false)
            }
        } catch (e) {
            alert(e.message);
        }
    }

    useEffect(() => {
        if (editData) {
            setupdate(true);
            setShow(true);
            settask(editData);
        }
    }, [editData]);



    return (
        <>



            <button onClick={handleShow} variant="primary" className='btn btn-primary'>
                <i className="fa-solid fa-plus pe-2"></i>
                Add Task
            </button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton className='bg-primary text-white'>
                    <Modal.Title >Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form>

                        {/* Title */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                onChange={(e) => {
                                    settask((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                    }))
                                }}
                                value={task.title}
                                required type="text" placeholder="Title" />
                        </Form.Group>

                        {/* Date & Time */}
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                <Form.Control
                                    onChange={(e) => {
                                        settask((prev) => ({
                                            ...prev,
                                            dueDate: e.target.value
                                        }))
                                    }}
                                    value={task.dueDate}
                                    required type="date" />
                            </Col>
                            <Col xs={12} md={6} className="mt-3 mt-md-0">
                                <Form.Control
                                    onChange={(e) => {
                                        settask((prev) => ({
                                            ...prev,
                                            dueTime: e.target.value
                                        }))
                                    }}
                                    value={task.dueTime}
                                    required type="time" />
                            </Col>
                        </Row>

                        {/* Category & Status */}
                        <Row className="mb-4">
                            <Col xs={12} md={6}>
                                <Form.Select
                                    onChange={(e) => {
                                        settask((prev) => ({
                                            ...prev,
                                            category: e.target.value
                                        }))
                                    }}
                                    value={task.category}
                                    required>
                                    <option>Category</option>
                                    <option>Work</option>
                                    <option>Personal</option>
                                    <option>Learning</option>

                                </Form.Select>
                            </Col>

                            <Col xs={12} md={6} className="mt-3 mt-md-0">
                                <Form.Select
                                    onChange={(e) => {
                                        settask((prev) => ({
                                            ...prev,
                                            status: e.target.value
                                        }))
                                    }}
                                    value={task.status}
                                    required>
                                    <option>Status</option>
                                    <option>Pending</option>
                                    <option>Done</option>
                                    <option>To do</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Control
                                onChange={(e) => {
                                    settask((prev) => ({
                                        ...prev,
                                        progress: e.target.value
                                    }))
                                }}
                                value={task.progress}
                                required
                                type="number"
                                placeholder="Progress (%)"
                                min="0"
                                max="100"
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-4">
                            <Form.Control
                                onChange={(e) => {
                                    settask((prev) => ({
                                        ...prev,
                                        description: e.target.value
                                    }))
                                }}
                                required
                                as="textarea"
                                rows={3}
                                placeholder="Description"
                                value={task.description}
                            />
                        </Form.Group>

                        {/* Buttons */}


                    </Form>










                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} style={{ background: '#6d5dff', color: '#fff', border: 'none' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Topaddtask