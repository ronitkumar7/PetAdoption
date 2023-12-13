import React from 'react';
import PetUpdate from './PetUpdate';
import { useState } from "react";
import ApplicationAdd from './ApplicationAdd';

const PetInfo = ({pet}) => {
  let isShelter = true;
  console.log("seeker or shelter", localStorage.getItem("seeker_or_shelter"))
  if(localStorage.getItem("seeker_or_shelter") == "true"){
    isShelter = false;
  }
  console.log("isShelter", isShelter)
  const [applying, setApplying] = useState(false);
  const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };

  const containerStyle = {
    display: 'flex',
  };

  const div1Style = {
    flex: 1,
    paddingRight: '1rem',
  };

  const div2Style = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyle = {
    marginTop: '10px',
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
    color: '#ffffff', 
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem', 
    cursor: 'pointer', 
  };

  return(
  <div>
    <h2><strong>{pet.name}</strong></h2>
    <div style={containerStyle}>
      <div style={div1Style}>
        {pet.gender && !pet.breed && (
          <h5>{pet.gender}</h5>
        )}
        {!pet.gender && pet.breed && (
          <h5>{pet.breed}</h5>
        )}
        {pet.gender && pet.breed && (
          <h5>{`${pet.gender} ${pet.breed}`}</h5>
        )}
        {pet.size && (
          <p style={{ padding: '0', margin: '0' }}>{`size: ${pet.size}`}</p>
        )}
        {pet.age && (
          <p style={{ padding: '0', margin: '0' }}> {`${pet.age} year old`}</p>
        )}
        {pet.shelter_username && (
          <p style={{color: '#0d6efd', padding: '0', margin: '0' }}>{`${pet.shelter_username}`}</p>
        )}
      </div>
      <div style={div2Style}>
          <p>
              <PetUpdate 
              show={show}
              setShow={setShow}
              pet={pet}
              isDetail={!isShelter}
              applying={applying}
              setApplying={setApplying}
              />
              <ApplicationAdd 
                show={applying}
                setShow={setApplying}
                pet={pet}
              />
              <button onClick={handleShow} style={buttonStyle}>{isShelter ? 'Update' : 'Apply'}</button>
          </p>
      </div>
    </div>
    <h4>{`status: ${pet.status}`}</h4>
  </div>
  );
    
};
export default PetInfo;