import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

function UpdateProfile () {
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
    const [userName, setUserName] = useState("");


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
        setUserName(json["username"]);
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
    .catch(() => navigate('/*'))}, [navigate]);


    const updateUser = () => {
        const formdata = new FormData();
        formdata.append("first_name", document.getElementById("first_name").value);
        formdata.append("last_name", document.getElementById("last_name").value);
        formdata.append("username", document.getElementById("username").value);
        if (document.getElementById("password").value !== ""){
            formdata.append("password", document.getElementById("password").value);
        }
        formdata.append("email", document.getElementById("email").value);
        formdata.append("phone_num", document.getElementById("phone_number").value);
        formdata.append("location", document.getElementById("location").value);
        formdata.append("preferences", document.getElementById("preferences").value);
        formdata.append("mission_statement", document.getElementById("mission_statement").value);
        formdata.append("shelter_name", document.getElementById("shelter_name").value);
        if (document.getElementById("profile_pic").value !== ""){
            formdata.append("profile_pic", document.getElementById("profile_pic").files[0]);
        }

        
        if (localStorage.getItem("seeker_or_shelter") === true){
            const url = `http://127.0.0.1:8000/accounts/user/` + localStorage.getItem("userId") + '/';
            const auth = "Bearer " + localStorage.getItem("apiToken");
            fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": auth
              },
              body:formdata
          }).then(response => {
            if (response.ok){
             navigate('/currProfile');
        }else{
            throw new Error("hi");
        }
    
    
    })
          
          .catch(() => document.getElementById("error_update").innerText = "Update Profile Failed.");
        } else{
            const url = `http://127.0.0.1:8000/accounts/shelter/` + localStorage.getItem("userId") + '/';
            const auth = "Bearer " + localStorage.getItem("apiToken");
            fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": auth
              },
            body: formdata
          }).then(response => {
            if (response.ok){
              navigate('/currProfile');
        }else{
            throw new Error("hi");
        }
    
    
    })

          .catch(() => document.getElementById("error_update").innerText = "Update Profile Failed.");
    }

    };


    const deleteUser = () => {

        
        if (localStorage.getItem("seeker_or_shelter") === true){
            const url = `http://127.0.0.1:8000/accounts/user/` + localStorage.getItem("userId") + '/';
            const auth = "Bearer " + localStorage.getItem("apiToken");
            fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": auth
              }
          }).then(response => {
            if (response.ok){
                localStorage.setItem("apiToken", "");
                navigate('/login');
        }else{
            throw new Error("hi");
        }
    
    
    })

          .catch(() => document.getElementById("error_delete").innerText = "Delete Profile Failed.");
          
          

        } else{
            const url = `http://127.0.0.1:8000/accounts/shelter/` + localStorage.getItem("userId") + '/';
            const auth = "Bearer " + localStorage.getItem("apiToken");
            fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": auth
              }
          }).then(response => {
            if (response.ok){
                localStorage.setItem("apiToken", "");
                navigate('/login');
        }else{
            throw new Error("hi");
        }
    
    
    })

          .catch(() => document.getElementById("error_delete").innerText = "Delete Profile Failed.");
          
    }

    };
    
    return <div className="UpdateProfile">
    
    <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header pb-2">Update Profile</h2>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">First Name</h5>
            <input type="text" defaultValue={firstName} className="m-0 form-input border-0 rounded" placeholder="Enter your first name" id="first_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Last Name</h5>
            <input type="text" defaultValue={lastName} className="m-0 form-input border-0 rounded" placeholder="Enter your last name" id="last_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Username</h5>
            <input type="text-center" value={userName} className="m-0 form-input border-0 rounded" placeholder="Enter your username" id="username" readOnly/>
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Password</h5>
            {/* <p className="m-0 form-input border-0 rounded text-light"> Hidden</p> */}
            <input type="password" className="m-0 form-input border-0 rounded" placeholder="Enter a new password" id="password" />
        </div>

        <div className="mb-3">
            <h5 className="text-light sub-header pb-2">Email</h5>
            <input type="email" defaultValue={email} className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Phone Number</h5>
            <input type="text-center" defaultValue={phone_num} className="m-0 form-input border-0 rounded" placeholder="Enter your phone number" id="phone_number" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Location</h5>
            <input type="text-center" defaultValue={location} className="m-0 form-input border-0 rounded" placeholder="Enter your location" id="location" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Change Profile Picture</h5>
            <input type="file" defaultValue={profile_pic} className="m-0 form-input border-0 rounded" placeholder="Enter your profile picture" id="profile_pic" />
            {/* <img src={profile_pic} alt="no picture provided" ></img> */}
        </div>

        <div className={seeker}>
        <h5 className="text-light sub-header pb-2">Preferences (To receive no notifications, enter "None")</h5>
            <input type="text-center" defaultValue ={preferences} className="m-0 form-input border-0 rounded" placeholder="Enter your preferences" id="preferences" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Mission Statement</h5>
            <input type="text-center" defaultValue={mission} className="m-0 form-input border-0 rounded" placeholder="Enter your mission statement" id="mission_statement" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Shelter Name</h5>
        <input type="text-center" defaultValue={shelter_name} className="m-0 form-input border-0 rounded" placeholder="Enter your shelter name" id="shelter_name" />
        </div>


        <div>
            <button className="text-light bg-info border-0 rounded" onClick={updateUser}>Update Profile</button>
            <p id="error_update"></p>
        </div>

        <div>
            <button className="text-light bg-info border-0 rounded" onClick={deleteUser}>Delete Account</button>
            <p id="error_delete"></p>
        </div>
    </div>
    </div>;


}


export default UpdateProfile;