import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { createTask } from "../api/tasks.api";

const Addtask = () => {


    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        dueDate: "",
        dueTime: "",
        category: "",
        status: "",
        progress: "",
        description: "",
    });

    const [errors, setErrors] = useState({});


    const handleClose = () => {
        setShow(false);

        setFormData({
            title: "",
            dueDate: "",
            dueTime: "",
            category: "",
            status: "",
            progress: "",
            description: "",
        });

        setErrors({});
    };

    const handleShow = () => setShow(true);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    function validateForm() {
        let newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.dueDate) {
            newErrors.dueDate = "Date is required";
        }

        if (!formData.dueTime) {
            newErrors.dueTime = "Time is required";
        }

        if (!formData.category) {
            newErrors.category = "Please select a category";
        }

        if (!formData.status) {
            newErrors.status = "Please select status";
        }

        if (
            formData.progress === "" ||
            formData.progress < 0 ||
            formData.progress > 100
        ) {
            newErrors.progress = "Progress must be between 0 and 100";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function sendTaskData(taskData) {
        try {
            const res = await createTask(taskData);

            if (res) {
                alert("Task Created Successfully")
            }
            else {
                alert("Error creating task")
            }
        } catch (e) {
            alert(e.message)
        }




    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        sendTaskData(formData);

        handleClose();
    }

    return (
        <>
            <button
                onClick={handleShow}
                className="btn btn-primary"
            >
                <i className="fa-solid fa-plus pe-2"></i>
                Create Your First Task
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Header
                    closeButton
                    className="bg-primary text-white"
                >
                    <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleSubmit}>

                        {/* Title */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                isInvalid={!!errors.title}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Date & Time */}
                        <Row className="mb-3">

                            <Col xs={12} md={6}>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.dueDate}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.dueDate}
                                </Form.Control.Feedback>
                            </Col>

                            <Col xs={12} md={6} className="mt-3 mt-md-0">
                                <Form.Control
                                    type="time"
                                    name="dueTime"
                                    value={formData.dueTime}
                                    onChange={handleChange}
                                    isInvalid={!!errors.dueTime}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.dueTime}
                                </Form.Control.Feedback>
                            </Col>

                        </Row>

                        {/* Category & Status */}
                        <Row className="mb-4">

                            <Col xs={12} md={6}>

                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    isInvalid={!!errors.category}
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Work">
                                        Work
                                    </option>

                                    <option value="Personal">
                                        Personal
                                    </option>

                                    <option value="Study">
                                        Learning
                                    </option>

                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>

                            </Col>

                            <Col xs={12} md={6} className="mt-3 mt-md-0">

                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}
                                >
                                    <option value="">
                                        Select Status
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Completed">
                                        Done
                                    </option>

                                    <option value="In Progress">
                                        To do
                                    </option>

                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    {errors.status}
                                </Form.Control.Feedback>

                            </Col>

                        </Row>

                        {/* Progress */}
                        <Form.Group className="mb-3">

                            <Form.Control
                                type="number"
                                placeholder="Progress (%)"
                                min="0"
                                max="100"
                                name="progress"
                                value={formData.progress}
                                onChange={handleChange}
                                isInvalid={!!errors.progress}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.progress}
                            </Form.Control.Feedback>

                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-4">

                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>

                        </Form.Group>

                        {/* Footer Buttons */}
                        <div className="d-flex justify-content-end gap-2">

                            <Button
                                variant="secondary"
                                onClick={handleClose}
                            >
                                Close
                            </Button>

                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>

                        </div>

                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default Addtask;