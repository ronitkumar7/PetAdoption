// import { useContext} from "react";
import {  useNavigate } from "react-router-dom";
import {decodeJwt} from "jose";
import './style.css';
function Login () {
    let navigate = useNavigate();

    const loginUser = () => {
        
        const formdata = new FormData();

        formdata.append("username", document.getElementById("username").value);
        formdata.append("password", document.getElementById("password").value);

        fetch(`http://127.0.0.1:8000/api/token/`, {
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

            const claims = decodeJwt(json["access"]);
            const username = document.getElementById("username").value;
            localStorage.setItem('apiToken', json["access"]);
            localStorage.setItem('userName', username);
            localStorage.setItem('userId', claims["user_id"]);

            const url = `http://127.0.0.1:8000/accounts/shelter/` + localStorage.getItem("userId") + '/';
            const auth = "Bearer " + localStorage.getItem('apiToken');
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
                    localStorage.setItem("seeker_or_shelter", json["seeker_or_shelter"]);
                    navigate("/petListings");
                })
                .catch(() => document.getElementById("error_login").innerText = "Username and/or password incorrect.");
        
    })
    .catch(() => document.getElementById("error_login").innerText = "Username and/or password incorrect.")

};
        
    
        return <>
    
    <div className="container mt-1 bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header pb-2">Login</h2>



        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Username</h5>
        <label for="username" className="mb-3 white">  </label>
            <input type="text-center" className="m-0 form-input border-0 rounded" placeholder="Enter your username" id="username" />
        </div>

        <div className="mb-3">
        <h5 className="text-light sub-header pb-2">Password</h5>
            <input type="password" className="m-0 form-input border-0 rounded" placeholder="Enter your password" id="password" />
        </div>

       


        <div>
            <button className="text-light bg-info border-0 rounded" onClick={loginUser}>Login</button>
            <p id="error_login"></p>
        </div>
    </div>
    </>;

}


export default Login;