import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ApplicationAdd({show, setShow}) {
    const [errorDisplay, setErrorDisplay] = useState(<></>);

    const [applicant, setApplicant] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [petListing, setPetListing] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
  
    // Change functions
    const handleApplicantChange = (event) => setApplicant(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePetListingChange = (event) => setPetListing(event.target.value);
    const handlePhone1Change = (event) => setPhone1(event.target.value);
    const handlePhone2Change = (event) => setPhone2(event.target.value);

    const handleClose = () => {
        setShow(false)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("applicant", applicant);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("petlisting", petListing);
        formData.append("phone1", phone1);
        formData.append("phone2", phone2);
    
        console.log('FormData:', formData);

        console.log(
            JSON.stringify({
                "applicant": applicant,
                "description": description,
                "email": email,
                "petlisting": petListing,
                "phone1": phone1,
                "phone2": phone2
            })
        )
        fetch('http://127.0.0.1:8000/applications/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
        body: JSON.stringify({
            "applicant": applicant,
            "description": description,
            "email": email,
            "petlisting": petListing,
            "phone1": phone1,
            "phone2": phone2
        }),
        }).then((response) => {
            response.json()
            console.log(response)})
        .catch(error => console.error('Error:', error));
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Pet Listing"}</Modal.Title>
            </Modal.Header>
            {errorDisplay}
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Applicant</Form.Label>
                <Form.Control
                type="text"
                value={applicant}
                onChange={handleApplicantChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="text"
                value={email}
                onChange={handleEmailChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Pet Listing</Form.Label>
                <Form.Control
                type="text"
                value={petListing}
                onChange={handlePetListingChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone 1</Form.Label>
                <Form.Control
                type="text"
                value={phone1}
                onChange={handlePhone1Change}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone 2</Form.Label>
                <Form.Control
                type="text"
                value={phone2}
                onChange={handlePhone2Change}
                />
            </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary">
                    Save Changes
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
  
}

export default ApplicationAdd;

