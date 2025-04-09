import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Col, Row, Container, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FaEnvelope, FaPhone, FaPhoneAlt, FaUser } from "react-icons/fa";

const AdminTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const host = "http://localhost:3100";

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${host}/web-api/ticket/admin-tickets`);
            if (res.data.success) {
                setTickets(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch tickets:", err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        try {
            await axios.delete(`${host}/web-api/ticket/delete/${id}`);
            fetchTickets();
        } catch (err) {
            console.error("Delete error:", err.message);
        }
    };

    const handleStatusUpdate = async () => {
        if (!newStatus || !selectedTicket) return;
        try {
            await axios.put(`${host}/web-api/ticket/update-status/${selectedTicket._id}`, {
                status: newStatus
            });
            setShowModal(false);
            fetchTickets();
        } catch (err) {
            console.error("Update error:", err.message);
        }
    };

    const openStatusModal = (ticket) => {
        setSelectedTicket(ticket);
        setNewStatus(ticket.status || "Active");
        setShowModal(true);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Container fluid>
                    <Row className="mb-4">
                        <Col><h4>📅 Manage Tickets</h4></Col>
                    </Row>

                    {tickets.length === 0 ? (
                        <Row className="mb-4">
                            <Col><h5>No tickets found</h5></Col>
                        </Row>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Client</th>
                                    <th>Service Provider</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket, index) => (
                                    <tr key={ticket._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className={`badge ${ticket.status === "Active" ? "bg-primary" :
                                                ticket.status === "Completed" ? "bg-success" :
                                                    ticket.status === "Cancelled" ? "bg-danger" :
                                                        "bg-secondary"
                                            }`}>
                                                {ticket.status ? (ticket.status === 'Send To Admin' ? 'Sent to admin' : ticket.status) : "Pending"}
                                            </span>
                                        </td>
                                        <td>
                                            {ticket.client?.name}<br />
                                            <small>{ticket.client?.email}</small> <br />
                                            <small>{ticket.client?.phone}</small>
                                        </td>
                                        <td>
                                            {ticket.appointment?.serviceProvider?.name}<br />
                                            <small>{ticket.appointment?.serviceProvider?.email}</small> <br />
                                            <small>{ticket.appointment?.serviceProvider?.phone}</small>
                                        </td>
                                        <td>{ticket.message}</td>
                                        <td>{new Date(ticket.appointment?.appointment_datetime).toLocaleDateString()}</td>
                                        <td>{new Date(ticket.appointment?.appointment_datetime).toLocaleTimeString()}</td>
                                        <td>
                                            <Button variant="warning" size="sm" className="m-1" onClick={() => openStatusModal(ticket)}>Update Status</Button> <br />
                                            <Button variant="danger" size="sm" className="m-1" onClick={() => handleDelete(ticket._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {/* Status Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Ticket Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button variant="primary" onClick={handleStatusUpdate}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default AdminTickets;
