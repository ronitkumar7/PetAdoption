import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import { Row } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import PetAdd from './PetAdd';

function Players() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [ players, setPlayers ] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
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

    const query = useMemo(() => ({
        breedSearch : searchParams.get("breedSearch") ?? "",
        statusSearch : searchParams.get("statusSearch") ?? "",
        shelterSearch : searchParams.get("shelterSearch") ?? "",
        genderSearch : searchParams.get("genderSearch") ?? "",
        page : parseInt(searchParams.get("page") ?? 1),
        nameSort : searchParams.getAll("nameSort") ?? "",
        ageSort : searchParams.getAll("ageSort") ?? "",
    }), [searchParams]);

    useEffect(() => {
        const {breedSearch, statusSearch, shelterSearch, genderSearch, page, nameSort, ageSort} = query;
        const offset = (page - 1) * 2
        fetch(`http://127.0.0.1:8000/listings/filters/?sort1=${ageSort}&sort2=${nameSort}&fKeyword1=${breedSearch}&fKeyword1=${breedSearch}&fKeyword1=${breedSearch}&fKeyword2=${statusSearch}&fKeyword3=${shelterSearch}&fKeyword4=${genderSearch}&limit=2&filter1=breed&filter2=status&filter3=shelter&filter4=gender&offset=${offset}`)
        .then(response => response.json())
        .then(json => {
            setPlayers(json.results)
            const newTotal = Math.max(Math.ceil(json.count / 2), 1)
            setTotalPages(newTotal)
            if(page > newTotal){
                setSearchParams({...query, page: newTotal})
            }
        });
    }, [query]);

    return <>
        <div>
            <label style={{marginRight : "2rem"}}>Search Breed: 
                <input 
                    value={query.search} 
                    onChange={event => setSearchParams({...query, breedSearch: event.target.value, page:1})} 
                />
            </label>
            <label style={{marginRight : "2rem"}}>Search Status: 
            <select
                value={query.search} 
                onChange={event => setSearchParams({...query, statusSearch: event.target.value, page:1})} 
                style={{
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    marginLeft: '0.5rem',
                }}
                >

                <option value="AVAILABLE">AVAILABLE</option>
                <option value="PENDING">PENDING</option>
                <option value="WITHDRAWN">WITHDRAWN</option>
                <option value="ADOPTED">ADOPTED</option>
            </select>
            </label>

            <label style={{marginRight : "2rem"}}>Search Shelter: 
                <input 
                    value={query.search} 
                    onChange={event => setSearchParams({...query, shelterSearch: event.target.value, page:1})} 
                />
            </label>
            <label>Search Gender: 
                <input 
                    value={query.search} 
                    onChange={event => setSearchParams({...query, genderSearch: event.target.value, page:1})} 
                />
            </label>
        </div> 
        <div className="checkbox-group">
            <p style={{ margin: 0, padding: 0 }}>Sort By:</p>
            <label>Name
                <input type="checkbox" 
                onChange={event => { 
                    if (event.target.checked) { 
                        setSearchParams({...query, nameSort:"name", page: 1});
                    } else {
                        setSearchParams({...query, nameSort:"", page: 1});
                    }
                }} />
            </label>
            <label style={{ marginLeft: '1rem' }}>Age
                <input type="checkbox" 
                onChange={event => { 
                    if (event.target.checked) { 
                        setSearchParams({...query, ageSort:"age", page: 1});
                    } else {
                        setSearchParams({...query, ageSort:"", page: 1});
                    }
                }}/>
                
            </label>
        </div>
        <p>
            <PetAdd 
            show={show}
            setShow={setShow}
            />

            <button onClick={handleShow} style={buttonStyle}>Add a Pet</button>
        </p>
        <div style={{   display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',}}>
            <Table pets={players} striped bordered responsive/>
        </div>
        <p>
        { query.page < totalPages
          ? <button onClick={() => setSearchParams({...query, page: query.page + 1})} style={buttonStyle}>Next</button>
          : <></> }
        { query.page > 1 
          ? <button onClick={() => setSearchParams({...query, page: query.page - 1})} style={buttonStyle}>Previous</button>
          : <></> }
        </p>
        <p className="pb-5">Page {query.page} out of {totalPages}.</p>
    </>;
}
export default Players;