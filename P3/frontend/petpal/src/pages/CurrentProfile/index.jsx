import { useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import './style.css';
function CurrentProfile () {
    let navigate = useNavigate();
    const [seeker, setSeeker] = useState("hidden");
    const [shelter, setShelter] = useState("hidden");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_num, setPhoneNum] = useState("");
    const [location, setLocation] = useState("");
    const [preferences, setPreferences] = useState("");
    const [mission, setMission] = useState("");
    const [shelter_name, setShelterName] = useState("");
    const [profile_pic, setProfilePic] = useState("");


    useEffect(() => { 
        const url = `http://127.0.0.1:8000/accounts/shelter/` + localStorage.getItem("userId") + '/';
        const auth = "Bearer " + localStorage.getItem("apiToken");
        fetch(url, {
        method: "GET",
        headers: {
            "Authorization": auth
          }
      }).then(response => {
        if (response.ok){
        return response.json();
    }else{
        throw new Error("hi");
    }


})
      .then(json => {
        setFirstName(json["first_name"]);
        setLastName(json["last_name"]);
        setEmail(json["email"]);
        setPhoneNum(json["phone_num"]);
        setLocation(json["location"]);
        setProfilePic(json["profile_pic"]);
        if(localStorage.getItem("seeker_or_shelter") === true){
            setPreferences(json["preferences"]);
            setSeeker("present");
        } else{
            setShelter("present");
            setMission(json["mission_statement"]);
            setShelterName(json["shelter_name"]);
        }
    })
    .catch(() => navigate('/*'))
}, []);

    const editUser = () => {
        navigate('/updateProfile');
    };

    const viewComments = () => {
        navigate(`/shelter/${localStorage.getItem("userId")}/comments`);
    };
    
    return <>
    
    <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header pb-2">Profile</h2>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">First Name</h5>
            <input type="text" value={firstName} className="m-0 form-input border-0 rounded" placeholder="Enter your first name" id="first_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Last Name</h5>
            <input type="text" value={lastName} className="m-0 form-input border-0 rounded" placeholder="Enter your last name" id="last_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Username</h5>
            <input type="text-center" value={localStorage.getItem("userName")} className="m-0 form-input border-0 rounded" placeholder="Enter your username" id="username" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Password</h5>
            <p className="m-0 form-input border-0 rounded text-light"> Hidden</p>
            {/* <input type="password" className="m-0 form-input border-0 rounded" placeholder="Enter your password" id="password" /> */}
        </div>

        <div className="mb-3">
            <h5 className="text-light sub-header pb-2">Email</h5>
            <input type="email" value={email} className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Phone Number</h5>
            <input type="text-center" value={phone_num} className="m-0 form-input border-0 rounded" placeholder="Enter your phone number" id="phone_number" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Location</h5>
            <input type="text-center" value={location} className="m-0 form-input border-0 rounded" placeholder="Enter your location" id="location" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Profile Picture</h5>
            {/* <input type="file" className="m-0 form-input border-0 rounded" placeholder="Enter your profile picture" id="profile_pic" /> */}
            <img src={profile_pic} alt=""></img>
        </div>

        <div className={seeker}>
        <h5 className="text-light sub-header pb-2">Preferences</h5>
            <input type="text-center" value ={preferences} className="m-0 form-input border-0 rounded" placeholder="Enter your preferences" id="preferences" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Mission Statement</h5>
            <input type="text-center" value={mission} className="m-0 form-input border-0 rounded" placeholder="Enter your mission statement" id="mission_statement" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Shelter Name</h5>
        <input type="text-center" value={shelter_name} className="m-0 form-input border-0 rounded" placeholder="Enter your shelter name" id="shelter_name" />
        </div>


        <div>
            <button className="text-light bg-info border-0 rounded" onClick={editUser}>Edit</button>
            <p id="error_submit"></p>
        </div>

        <div className={shelter}>

<button className="text-light bg-info border-0 rounded" onClick={viewComments}>View Comments</button>

</div>
    </div>


    </>;


}


export default CurrentProfile;