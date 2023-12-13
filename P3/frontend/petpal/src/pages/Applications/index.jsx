import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import { Row } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import ApplicationAdd from './ApplicationAdd';

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
        statusSearch : searchParams.get("statusSearch") ?? "",
        page : parseInt(searchParams.get("page") ?? 1),
        sort : searchParams.get("sort") ?? "",
    }), [searchParams]);

    useEffect(() => {
        const {statusSearch, page, sort} = query;
        const offset = (page - 1) * 2
        fetch(`http://127.0.0.1:8000/applications/?limit=2&offset=${offset}&filter=${statusSearch}&sort=${sort}`, 
        {headers: {
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
        }).then(response => response.json())
        .then(json => {
            setPlayers(json.results)
            const newTotal = Math.max(Math.ceil(json.count / 2), 1)
            if (isNaN(newTotal)) {
                setTotalPages(1);
              } else {
                setTotalPages(newTotal);
              }
            if(page > newTotal){
                setSearchParams({...query, page: newTotal})
            }
        });
    }, [query]);

    return <>
        <div>
            <label style={{marginRight : "2rem"}}>Search Status: 
            <select
                value={query.statusSearch || ""}
                onChange={(event) =>
                    setSearchParams({ ...query, statusSearch: event.target.value, page: 1 })
                }
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
                <option value=""></option>
                <option value="PENDING">PENDING</option>
                <option value="WITHDRAWN">WITHDRAWN</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="DENIED">DENIED</option>
            </select>
            </label>
            <label style={{marginRight : "2rem"}}>Sort By: 
            <select
                value={query.sort || ""}
                onChange={(event) =>
                    setSearchParams({ ...query, sort: event.target.value, page: 1 })
                }
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
                <option value="creation_time">Time Created</option>
                <option value="last_update_time">Time Updated</option>
            </select>
            </label>
        </div> 
        <p>
            <ApplicationAdd 
            show={show}
            setShow={setShow}
            />

            <button onClick={handleShow} style={buttonStyle}>Add a Application</button>
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