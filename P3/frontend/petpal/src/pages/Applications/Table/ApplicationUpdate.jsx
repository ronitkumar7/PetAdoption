import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DisplayTime from './DisplayTime';

function ApplicationUpdate({show, setShow, pet, application, isShelter}) {
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [petName, setPetName] = useState(pet.name);
    const petNameChange = (event) => {
        setPetName(event.target.value);
    }
    
    const [petStatus, setPetStatus] = useState(application.status);
    const petSeekerChange = (event) => {
        setPetStatus("WITHDRAWN")
    };
    const petAcceptance = (event) => {
        setPetStatus("ACCEPTED")
    };
    const petRejection= (event) => {
        setPetStatus("DENIED")
    };
    
    const handleClose = () => {
        setShow(false)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        //UPDATE APPLICATION
        const formData = new FormData();
        formData.append('status', petStatus);

        fetch(`http://127.0.0.1:8000/applications/${application.id}/`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
        body: formData,
        }).then((response) => {
        response.json()
        console.log(response)});
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Update Application"}</Modal.Title>
            </Modal.Header>
            {errorDisplay}
            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={pet.name}
                        readOnly={true}
                    />
                    <>
                    {pet.avatar &&
                        <img
                            src={pet.avatar}
                            alt="Selected Pet"
                            style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                    }
                    </>
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Applicant</Form.Label>
                    <Form.Control
                        type="text"
                        value={application.applicant}
                        readOnly={true}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Shelter</Form.Label>
                    <Form.Control
                        type="text"
                        value={application.shelter}
                        readOnly={true}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        value={application.email}
                        readOnly={true}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Phone 1</Form.Label>
                    <Form.Control
                        type="text"
                        value={application.phone1}
                        readOnly={true}
                    />
                    </Form.Group> 
                    {application.phone2 &&
                        <Form.Group className="mb-3">
                        <Form.Label>Phone 2</Form.Label>
                        <Form.Control
                            type="text"
                            value={application.phone2}
                            readOnly={true}
                        />
                        </Form.Group> 
                    }
                    <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={application.description}
                        readOnly={true}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Time Created</Form.Label>
                    <DisplayTime creationTime = {application.creation_time} oneLine={true}/>
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Last Updated</Form.Label>
                    <DisplayTime creationTime = {application.last_update_time} oneLine={true}/>
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Status</Form.Label>
                    <Form.Control
                        type="text"
                        value={petStatus}
                        readOnly={true}
                    />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {!isShelter &&
                        <Button type="submit" variant="primary" onClick={petSeekerChange}>
                        Withdraw Application
                        </Button>
                    }
                    {isShelter &&
                    <>
                        <Button type="submit" variant="primary" onClick={petRejection}>
                            Reject
                        </Button>
                        <Button type="submit" variant="primary" onClick={petAcceptance}>
                            Accept
                        </Button>
                    </>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    );
  
}

export default ApplicationUpdate;

