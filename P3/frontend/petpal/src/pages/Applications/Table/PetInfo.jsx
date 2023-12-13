import React from 'react';
import ApplicationUpdate from './ApplicationUpdate';
import DisplayTime from './DisplayTime';
import { useState } from "react";

const PetInfo = ({pet, application}) => {
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
  if (!pet){
    return <></>
  }
  return(
  <div>
    <h2><strong>{pet.name}</strong></h2>
    <div style={containerStyle}>
      <div style={div1Style}>
        {application.applicant && (
          <h5>{`Applicant: ${application.applicant}`}</h5>
        )}
        {application.shelter && (
          <h5 style={{color: '#0d6efd'}}>{`${pet.shelter_username}`}</h5>
        )}
        {application.email && (
          <h5>{application.email}</h5>
        )}
        {application.phone1 && (
          <h5>{application.phone1}</h5>
        )}
        {application.creation_time && (
          <>
          <h5>Time Created</h5>
          <DisplayTime creationTime = {application.creation_time} oneLine={false}/>
          </>
        )}
        {application.last_update_time && (
          <>
          <h5>Last Updated</h5>
          <DisplayTime creationTime = {application.last_update_time} oneLine={false}/>
          </>
        )}
      </div>
      <div style={div2Style}>
          <p>
              <ApplicationUpdate 
              show={show}
              setShow={setShow}
              pet={pet}
              application={application}
              isShelter={true}
              />

              <button onClick={handleShow} style={buttonStyle}>Update</button>
          </p>
      </div>
    </div>
    <h4>{`status: ${application.status}`}</h4>
  </div>
  );
    
};
export default PetInfo;