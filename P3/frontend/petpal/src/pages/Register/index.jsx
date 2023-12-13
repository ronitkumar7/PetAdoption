import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
function Register () {
    let navigate = useNavigate();
    const [seeker, setSeeker] = useState("hidden");
    const [shelter, setShelter] = useState("hidden");
    const [seekerButton, setSeekerButton] = useState("present");
    const [shelterButton, setShelterButton] = useState("present");
    const createUser = () => {
        if (shelter === "hidden" && seeker==="hidden"){
            document.getElementById("error_submit").innerText = "Must choose to be a seeker or shelter";
            return;
        }
        else{
            document.getElementById("error_submit").innerText = "";

        }
        var flag = false;

        if(document.getElementById("username").value===""){
            document.getElementById("error_username").innerText = "Fill out a username";
            flag = true;
        }else{
            document.getElementById("error_username").innerText = "";
        }
        if(document.getElementById("password").value===""){
            document.getElementById("error_password").innerText = "Fill out a password";
            flag = true;
        }else{
            document.getElementById("error_password").innerText = "";
        }
        if(flag === true){
            return;
        }
        const formdata = new FormData();
        formdata.append("first_name", document.getElementById("first_name").value);
        formdata.append("last_name", document.getElementById("last_name").value);
        formdata.append("username", document.getElementById("username").value);
        formdata.append("password", document.getElementById("password").value);
        formdata.append("email", document.getElementById("email").value);
        formdata.append("phone_num", document.getElementById("phone_number").value);
        formdata.append("location", document.getElementById("location").value);
        formdata.append("preferences", document.getElementById("preferences").value);
        formdata.append("mission_statement", document.getElementById("mission_statement").value);
        formdata.append("shelter_name", document.getElementById("shelter_name").value);
        if (document.getElementById("profile_pic").value !== ""){
            formdata.append("profile_pic", document.getElementById("profile_pic").files[0]);
        }

        if (shelter==="hidden"){
            fetch(`http://127.0.0.1:8000/accounts/users/`, {
            method: "POST",
            body: formdata
          }).then(response => {
            if (response.ok){
            return response.json();
        }else{
            throw new Error("hi");
        }
    
    
    })
          .then(json => {
                // const id = json["id"];
                // setUsers({...users, [json["username"]]: id});
                navigate('/login');
            
          })
          .catch(() => document.getElementById("error_submit").innerText = "Sign Up failed");
        } else{
            fetch(`http://127.0.0.1:8000/accounts/shelters/`, {
            method: "POST",
            body: formdata
          }).then(response => {
            if (response.ok){
            return response.json();
        }else{
            throw new Error("hi");
        }
    
    
    })
          .then(json => {
                // const id = json["id"];
                // setUsers({...users, [json["username"]]: id});
                navigate('/login');
            
          })
          .catch(() => document.getElementById("error_submit").innerText = "Sign Up failed");
    }
        
    };

    const changeSeeker = () => {
        if (seeker === "hidden") {
            setSeeker("present");
            setShelter("hidden");
            setShelterButton("hidden");
        }
    };

    const changeShelter = () => {
        if (shelter === "hidden") {
            setSeeker("hidden");
            setShelter("present");
            setSeekerButton("hidden");
        };
    };
    
    
        return <>
    
    <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header pb-2">Sign Up</h2>

        <div className={seekerButton}>
                <button className=" text-light bg-info border-0 rounded" onClick={changeSeeker}>I'm a Seeker</button>
            </div>

            <div className={shelterButton}>
                <button className="text-light bg-info border-0 rounded" onClick={changeShelter}>I'm a Shelter Owner</button>
            </div>



        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">First Name</h5>
            <input type="text" className="m-0 form-input border-0 rounded" placeholder="Enter your first name" id="first_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Last Name</h5>
            <input type="text" className="m-0 form-input border-0 rounded" placeholder="Enter your last name" id="last_name" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Username</h5>
        <label for="username" className="mb-3 white">  </label>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your username" id="username"  />
            <p id="error_username"></p>
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Password</h5>
            <input type="password" className="m-0 form-input border-0 rounded" placeholder="Enter your password" id="password" />
            <p id="error_password"></p>
        </div>

        <div className="mb-3">
            <h5 className="text-light sub-header pb-2">Email</h5>
            <input type="email" className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Phone Number</h5>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your phone number" id="phone_number" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Location</h5>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your location" id="location" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Profile Picture</h5>
            <input type="file" className="m-0 form-input border-0 rounded" placeholder="Enter your profile picture" id="profile_pic" />
        </div>

        <div className={seeker}>
        <h5 className="text-light sub-header pb-2">Preferences</h5>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your preferences" id="preferences" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Mission Statement</h5>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your mission statement" id="mission_statement" />
        </div>

        <div className={shelter}>
        <h5 className="text-light sub-header pb-2">Shelter Name</h5>
        <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your shelter name" id="shelter_name" />
        </div>


        <div>
            <button type="submit" className="text-light bg-info border-0 rounded" onClick={createUser}>Sign Up</button>
            <p id="error_submit"></p>
        </div>
    </div>
    </>;

    // return <>

    //         <div>
    //             <button className="text-light bg-info border-0 rounded" onClick={CreateSeeker}>I'm a Seeker</button>
    //         </div>

    //         <div>
    //             <button className="text-light bg-info border-0 rounded" onClick={CreateSeeker}>I'm a Shelter Owner</button>
    //         </div>
    //         </>;

    //     <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
    //         <h2 className="text-light sub-header pb-2">Sign Up</h2>
    //         <div className="mb-3">
    //             <input type="text" className="m-0 form-input border-0 rounded" placeholder="Enter your first name" id="first_name" />
    //         </div>
    //         <div className="mb-3">
    //             <input type="text" className="m-0 form-input border-0 rounded" placeholder="Enter your last name" id="last_name" />
    //         </div>
    //         <div className="mb-3">
    //         <label for="email" className="mb-3 white"> Email </label>
    //             <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your username" id="username" />
    //         </div>
    //         <div className="mb-3">
    //             <input type="password" className="m-0 form-input border-0 rounded" placeholder="Enter your password" id="password" />
    //         </div>
    //         <div className="mb-3">
    //             <input type="email" className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
    //         </div>
    //         <div>
    //         <input type="radio" class="form-check-input info-input FCI" id="radio1" name="optradio" value="option1" />
    //         <label class="form-check-label info-label" for="radio1" id="radio1-label1">I am a pet seeker</label>
    //         </div>
    //         <div class="mt-2">
    //         <input type="radio" class="form-check-input info-input FCI" id="radio2" name="optradio" value="option2" />
    //         <label class="form-check-label info-label" for="radio2" id="radio1-label2">I am the owner of a pet shelter</label>
    //         </div>
    //         {/* <div className="mb-2">
    //             <input type="email" className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
    //         </div> */}
    //         {/* <div className="mb-3">
    //             <input type="text" className="m-0 form-input border-0 rounded" placeholder="Enter your email" id="email" />
    //         </div> */}
    //         <div>
    //             <button className="text-light bg-info border-0 rounded" onClick={createUser}>Sign Up</button>
    //         </div>
    //     </div>
    // </>;
}


export default Register;