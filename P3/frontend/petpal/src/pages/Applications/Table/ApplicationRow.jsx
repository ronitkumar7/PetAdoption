import React from 'react';
import PetUpdate from './ApplicationUpdate';
import PetInfo from './PetInfo';
import { useState, useEffect } from "react";
import ImageComponent from './ImageComponent';

const ApplicationRow = ({application}) => {
  const [petListing, setPetListing] = useState();
  const [avatar, setAvatar] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]); 
  
  console.log("Application: ", application)
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/listings/${application.petlisting}/`, 
    {headers: {
      "Authorization": "Bearer " + localStorage.getItem('apiToken')
    },
    }).then(response => response.json())
    .then(json => {
        console.log("Pet: ",json)
        setPetListing(json)
        setAvatar(json.avatar)
    });
}, []);

  return(
  <tr>
    <td> <PetInfo pet={petListing} application={application}/> </td>
    {screenWidth >= 520 && (<td> <ImageComponent imageUrl={avatar}/> </td>)}
  </tr>);
};
export default ApplicationRow;