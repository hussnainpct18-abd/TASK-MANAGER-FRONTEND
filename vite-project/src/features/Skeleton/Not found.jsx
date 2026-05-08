import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const NoTasks = () => {
    return (
        <Container
            fluid
            className="min-vh-80 pt-5 d-flex align-items-center justify-content-center bg-light"
        >
            <Row className="w-100 justify-content-center">
                <Col xs={11} sm={10} md={8} lg={6} xl={5}>

                    <div
                        className="text-center p-5 shadow-lg bg-white"
                        style={{
                            borderRadius: "25px",
                        }}
                    >

                        {/* Icon */}
                        <div
                            className="d-flex justify-content-center align-items-center mx-auto mb-4"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                color: "white",
                                fontSize: "50px",
                            }}
                        >
                            <i className="fa-solid fa-clipboard-list"></i>
                        </div>

                        {/* Heading */}
                        <h1
                            className="fw-bold mb-3"
                            style={{
                                color: "#1e293b",
                                fontSize: "2.2rem",
                            }}
                        >
                            No Tasks Found
                        </h1>

                        {/* Description */}
                        <p
                            className="text-muted mb-4"
                            style={{
                                fontSize: "1rem",
                                lineHeight: "1.7",
                            }}
                        >
                            You don't have any tasks yet.
                            Start organizing your day by creating your tasks.
                        </p>

                        {/* Button */}
                        {/* <Button
                            variant="primary"
                            size="lg"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            Create New Task
                        </Button> */}

                        {/* Small Bottom Text */}
                        <p
                            className="text-secondary"
                            style={{
                                fontSize: "0.9rem",
                            }}
                        >
                            Stay productive. Stay organized.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NoTasks;