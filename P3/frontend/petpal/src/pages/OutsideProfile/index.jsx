import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './style.css';
function OutsideProfile () {
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
    const [seeker_or_shelter, setSeekerOrShelter] = useState(true);
    const { profID } = useParams();

    useEffect(() => { 
        const url = `http://127.0.0.1:8000/accounts/shelter/` + profID + '/';
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
        setSeekerOrShelter(json["seeker_or_shelter"]);
        if(json["seeker_or_shelter"] === true){
            setPreferences(json["preferences"]);
            setSeeker("present");
        } else{
            setShelter("present");
            setMission(json["mission_statement"]);
            setShelterName(json["shelter_name"]);
        }
        if(json["seeker_or_shelter"] === true){
            const url = `http://127.0.0.1:8000/accounts/user/` + profID + '/';
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
    
    
    }).catch(() => navigate('/*'))
        };


    })
    .catch(() => navigate('/*'))
    
}, [navigate, profID, seeker_or_shelter]);

const viewComments = () => {
    navigate(`/shelter/${profID}/comments`);
};
    return <div className="outsideProf">
    
    <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header pb-2">Profile</h2>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">First Name</h5>
            <input type="text" value={firstName} className="m-0 form-input border-0 rounded"  id="first_name" readOnly/>
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Last Name</h5>
            <input type="text" value={lastName} className="m-0 form-input border-0 rounded"  id="last_name" readOnly/>
        </div>


        <div className="mb-3">
            <h5 className="text-light sub-header pb-2">Email</h5>
            <input type="email" value={email} className="m-0 form-input border-0 rounded"  id="email"readOnly />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Phone Number</h5>
            <input type="text-center" value={phone_num} className="m-0 form-input border-0 rounded"  id="phone_number" readOnly/>
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Location</h5>
            <input type="text-center" value={location} className="m-0 form-input border-0 rounded"  id="location" readOnly/>
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Profile Picture</h5>
            <img src={profile_pic} alt=""  ></img>
        </div>

        <div className={seeker}>
        <h5 className="text-light sub-header pb-2">Preferences</h5>
            <input type="text-center" value ={preferences} className="m-0 form-input border-0 rounded"  id="preferences" readOnly/>
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Mission Statement</h5>
            <input type="text-center" value={mission} className="m-0 form-input border-0 rounded"  id="mission_statement" readOnly />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Shelter Name</h5>
        <input type="text-center" value={shelter_name} className="m-0 form-input border-0 rounded"  id="shelter_name" readOnly/>
        </div>


        <div className={shelter}>

<button className="text-light bg-info border-0 rounded" onClick={viewComments}>View Comments</button>

</div>

    </div>


    </div>;


}


export default OutsideProfile;