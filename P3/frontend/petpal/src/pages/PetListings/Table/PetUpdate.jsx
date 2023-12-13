import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ApplicationAdd from './ApplicationAdd';

function PetUpdate({show, setShow, pet, isDetail, applying, setApplying}) {
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [petName, setPetName] = useState(pet.name);
    const petNameChange = (event) => {
        setPetName(event.target.value);
    }
    const [petBreed, setPetBreed] = useState(pet.breed);
    const petBreedChange = (event) => {
        setPetBreed(event.target.value);
    }
    const [petAge, setPetAge] = useState(pet.age);
    const petAgeChange = (event) => {
        const inputValue = event.target.value;
        if (/^[0-9]\d*$/.test(inputValue) || inputValue === '') {
            setPetAge(inputValue);
        }
    }
    const [petGender, setPetGender] = useState(pet.gender);
    const petGenderChange = (event) => {
        setPetGender(event.target.value);
    }
    const [petSize, setPetSize] = useState(pet.size);
    const petSizeChange = (event) => {
        setPetSize(event.target.value);
    }
    const [petDesc, setPetDesc] = useState(pet.desc);
    const petDescChange = (event) => {
        setPetDesc(event.target.value);
    }

    const [petStatus, setPetStatus] = useState(pet.status);
    const petStatusChange = (event) => {
        setPetStatus(event.target.value);
    }

    const [petImage, setPetImage] = useState();
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setPetImage(imageFile);
        console.log(imageFile)
    };
    
    const handleClose = () => {
        setShow(false)
    };
    const createListing = (event) => {
        event.preventDefault();
        setApplying(true)
        handleClose()
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        (petImage && formData.append('avatar', petImage));
        formData.append('status', petStatus);
        const capitalizedPetName = petName.charAt(0).toUpperCase() + petName.slice(1);
        formData.append('name', capitalizedPetName);
        formData.append('breed', petBreed);
        formData.append('age', petAge);
        formData.append('gender', petGender);
        formData.append('size', petSize);
        formData.append('description', petDesc);
    
        console.log('Update:', formData);

        fetch(`http://127.0.0.1:8000/listings/${pet.id}/`, {
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
    const options = ['PENDING', 'AVAILABLE', 'ADOPTED', 'WITHDRAWN'];
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Update a Pet Listing"}</Modal.Title>
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
                        readOnly={isDetail}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Breed</Form.Label>
                    <Form.Control
                        type="text"
                        value={petBreed}
                        onChange={petBreedChange}
                        readOnly={isDetail}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Age</Form.Label>
                    <Form.Control
                        type="number"
                        value={petAge}
                        onChange={petAgeChange}
                        readOnly={isDetail}
                    />
                    </Form.Group> 
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Gender</Form.Label>
                    <Form.Control
                        type="text"
                        value={petGender}
                        onChange={petGenderChange}
                        readOnly={isDetail}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Size</Form.Label>
                    <Form.Control
                        type="text"
                        value={petSize}
                        onChange={petSizeChange}
                        readOnly={isDetail}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Pet Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={petDesc}
                        onChange={petDescChange}
                        readOnly={isDetail}
                    />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pet Status</Form.Label>
                        <Form.Select
                            value={petStatus}
                            onChange={petStatusChange}
                            readOnly={isDetail}
                        >
                            {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {!isDetail &&
                        <>
                            <Form.Group className="mb-3">
                            <Form.Label>Pet Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={handleImageChange} 
                                readOnly={isDetail}
                            />
                            </Form.Group>
                            {petImage &&
                                <img
                                    src={petImage ? URL.createObjectURL(petImage) : pet.avatar}
                                    alt="Selected Pet"
                                    style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                                />
                            }
                        </>
                    }
                    {isDetail &&
                        <>
                        {pet.avatar &&
                            <img
                                src={petImage ? URL.createObjectURL(petImage) : pet.avatar}
                                alt="Selected Pet"
                                style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                            />
                        }
                        <br></br>
                        </>
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {!isDetail &&
                        <Button type="submit" variant="primary">
                        Save Changes
                        </Button>
                    }
                    {isDetail &&
                        <Button variant="primary" onClick={createListing}>
                        Apply
                        </Button>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    );
  
}

export default PetUpdate;

