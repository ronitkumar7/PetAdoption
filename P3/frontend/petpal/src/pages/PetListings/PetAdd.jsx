import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function PetAdd({show, setShow}) {
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [petName, setPetName] = useState("");
    const petNameChange = (event) => {
        setPetName(event.target.value);
    }
    const [petBreed, setPetBreed] = useState("");
    const petBreedChange = (event) => {
        setPetBreed(event.target.value);
    }
    const [petAge, setPetAge] = useState("");
    const petAgeChange = (event) => {
        const inputValue = event.target.value;
        if (/^[0-9]\d*$/.test(inputValue) || inputValue === '') {
            setPetAge(inputValue);
        }
    }
    const [petGender, setPetGender] = useState("");
    const petGenderChange = (event) => {
        setPetGender(event.target.value);
    }
    const [petSize, setPetSize] = useState("");
    const petSizeChange = (event) => {
        setPetSize(event.target.value);
    }
    const [petDesc, setPetDesc] = useState("");
    const petDescChange = (event) => {
        setPetDesc(event.target.value);
    }

    const [petImage, setPetImage] = useState(null);
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setPetImage(imageFile);
    };
    
    const handleClose = () => {
        setShow(false)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        if(petImage){
            formData.append('avatar', petImage);
        }
        formData.append('status', 'AVAILABLE');
        const capitalizedPetName = petName.charAt(0).toUpperCase() + petName.slice(1);
        formData.append('name', capitalizedPetName);
        formData.append('breed', petBreed);
        formData.append('age', petAge);
        formData.append('gender', petGender);
        formData.append('size', petSize);
        formData.append('description', petDesc);
    
        console.log('FormData:', formData);

        fetch('http://127.0.0.1:8000/listings/', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
        body: formData,
        }).then((response) => response.json());
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
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        value={petName}
                        onChange={petNameChange}
                        required
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Breed</Form.Label>
                    <Form.Control
                        type="text"
                        value={petBreed}
                        onChange={petBreedChange}
                        required
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Age</Form.Label>
                    <Form.Control
                        type="number"
                        value={petAge}
                        onChange={petAgeChange}
                        required
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Gender</Form.Label>
                    <Form.Control
                        type="text"
                        value={petGender}
                        onChange={petGenderChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Size</Form.Label>
                    <Form.Control
                        type="text"
                        value={petSize}
                        onChange={petSizeChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={petDesc}
                        onChange={petDescChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Image</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={handleImageChange} 
                    />
                    </Form.Group>
                    {petImage && (
                        <img
                            src={URL.createObjectURL(petImage)}
                            alt="Selected Pet"
                            style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                        />
                    )}
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

export default PetAdd;

