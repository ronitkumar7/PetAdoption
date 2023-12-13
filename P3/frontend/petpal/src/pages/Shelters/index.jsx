import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './style.css';

function Shelters() {
    const [ query, setQuery ] = useState({limit: 5, offset: 0});
    const [ shelters, setShelters ] = useState([]);
    const [ isNext, setIsNext ] = useState(false);
    const [ isPrev, setIsPrev ] = useState(false);
    let navigate = useNavigate();
    
    useEffect(() => {
        const url = `http://127.0.0.1:8000/accounts/shelters/?limit=${query.limit}&offset=${query.offset}`;
        const auth = "Bearer " + localStorage.getItem("apiToken");
        fetch(url, {
        method: "GET",
        headers: {
            "Authorization": auth
          }
      })
        .then(response => {
          if (response.ok){
          return response.json();
      }else{
          throw new Error("hi");
      }
  
  
  })
        .then(json => {
            setIsNext(json.next !== null);
            setIsPrev(json.previous !== null);
            setShelters(json.results);
        })
        .catch(() => navigate('/*'));
    }, [ query, navigate ]);

    return <>
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
          <h2 className="text-light sub-header">Shelters</h2>

          {shelters.map(shelter => (
            <div className="cotainer-sm bg-info m-3 p-3 rounded" key={shelter.id}>
                <h5 className="text-light notification-header">Shelter Name {shelter.shelter_name}</h5>
                <h5 className="text-light notification-header">Mission Statement {shelter.mission_statement}</h5>
                <h5 className="text-light notification-header">Location {shelter.location}</h5>
                <h5 className="text-light notification-header">Phone Number {shelter.phone_num}</h5>
                <div className="pb-2">
                  <Link to={`/profile/${shelter.id}`} className="text-light">More Details</Link>
                </div>
            </div>
          ))}

          <p className="m-0">
          { isPrev
            ? <button className="text-dark bg-light border-0 rounded" onClick={() => setQuery({...query, offset: query.offset - 5})}>Previous</button>
            : <></> }
          { isNext 
            ? <button className="text-dark bg-light border-0 rounded" onClick={() => setQuery({...query, offset: query.offset + 5})}>Next</button>
            : <></> }
          </p>
        </div>
    </>;
}


export default Shelters;