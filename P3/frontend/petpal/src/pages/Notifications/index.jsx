import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { APIContext } from "../../contexts/APIContext";

function Notifications() {
    const [query, setQuery] = useState({limit: 5, offset: 0});
    const [ isNext, setIsNext ] = useState(false);
    const [ isPrev, setIsPrev ] = useState(false);
    const [ notifs, setNotifs ] = useState([]);
    const [ searchParams, _setSearchParams ] = useSearchParams();
    //const { setPage } = useContext(APIContext);

    useEffect(() => {
        const { limit, offset } = query;
        fetch(`http://127.0.0.1:8000/notifications/?limit=${limit}&offset=${offset}&sort=creation_time`, {
          headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDA4NDgxLCJpYXQiOjE3MDE5MjIwODEsImp0aSI6IjQ3ODkwNjI4MmU4OTQ4Yzg4MGRlYmNkYzIzNjQ0MjRlIiwidXNlcl9pZCI6MX0.tkOOe3ibt-woQmehLZtYxsJf5pyDqb8IU2R-TnQ5ALQ"
          }
        })
        .then(response => response.json())
        .then(json => {
          setIsNext(json.next !== null);
          setIsPrev(json.previous !== null);
          setNotifs(json.results.filter((notif) => searchParams.get("filter") === null || searchParams.get("filter") === notif.state));
        });
    }, [query]);

    const readNotif = id => () => {
      fetch(`http://127.0.0.1:8000/notifications/${id}/`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDA4NDgxLCJpYXQiOjE3MDE5MjIwODEsImp0aSI6IjQ3ODkwNjI4MmU4OTQ4Yzg4MGRlYmNkYzIzNjQ0MjRlIiwidXNlcl9pZCI6MX0.tkOOe3ibt-woQmehLZtYxsJf5pyDqb8IU2R-TnQ5ALQ"
        },
        body: JSON.stringify({
            'state': 'read',
        })
      }).then(() => setQuery({...query}));
    }

    const deleteNotif = id => () => {
      fetch(`http://127.0.0.1:8000/notifications/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxOTkwODgzLCJpYXQiOjE3MDE5MDQ0ODMsImp0aSI6IjYzYjNjMjlmNjNlZDQ0MTA5NDdlNzljYjcxOTY4YjdlIiwidXNlcl9pZCI6MX0.nfzGLKFq91QxFV8iGz8kUlFzs7lG8cGm1eHScKQkhng"
        }
      }).then(() => setQuery({...query}));
    }
    
    return <> 
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
          <h2 className="text-light sub-header">Notifications:</h2>

          {notifs.map(notif => (
            <div className={notif.state==="read" ? "cotainer-sm bg-secondary m-3 p-3 rounded" : "cotainer-sm bg-info m-3 p-3 rounded"} key={notif.id}>
                <h5 className="text-light notification-header">Notification:</h5>
                <p className="text-light">{notif.message}</p>

                <div className="pb-2">
                  <Link to={notif.link} className="text-light">Check it out</Link>
                </div>

                { notif.state === "unread" 
                ? <button className="text-light bg-primary border-0 rounded" onClick={readNotif(notif.id)}>Read</button>
                : <></> }
                
                <button className="text-light bg-danger border-0 rounded" onClick={deleteNotif(notif.id)}>Delete</button>
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

export default Notifications;