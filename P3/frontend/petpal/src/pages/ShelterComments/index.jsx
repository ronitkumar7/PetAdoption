import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import './style.css';

function ShelterComments() {
    const [ query, setQuery ] = useState({limit: 5, offset: 0});
    const [ comments, setComments ] = useState([]);
    const [ isNext, setIsNext ] = useState(false);
    const [ isPrev, setIsPrev ] = useState(false);
    const {shelId} = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {
        const url = `http://127.0.0.1:8000/comments/shelter/${shelId}/reviews/?limit=${query.limit}&offset=${query.offset}`;
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
            setComments(json.results);
        })
        .catch(() => navigate('/*'));
    }, [ query, navigate, shelId ]);

    const showReply = (commentId) => {
      document.getElementById(commentId).className = "present";

    };

    const createReply = (commentId) => {
      const url = `http://127.0.0.1:8000/comments/${commentId}/`;
        const auth = "Bearer " + localStorage.getItem("apiToken");
        const formdata = new FormData();
        formdata.append("text", document.getElementById(`body${commentId}`).value);
        formdata.append("rating", document.getElementById(`rating${commentId}`).value);
        fetch(url, {
        method: "POST",
        headers: {
            "Authorization": auth
          },
          body:formdata
      })
        .then(response => {
          if (response.ok){
            fetch(`http://127.0.0.1:8000/notifications/`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('apiToken')
            },
              body: JSON.stringify({
                  'owner': shelId,
                  'message': 'A comment was created on your profile.',
                  'link': `http://127.0.0.1:3000/shelter/${shelId}/comments`
              })
            })
            .then(() => response.json());
      }else{
          throw new Error("hi");
      }
        })
        
        .then(() => {
          document.location.reload();
        }).catch(() => {
          const error_id = `error${commentId}`;
          document.getElementById(error_id).innerText = "Comment Reply failed."
          
        });
  }



  const createComment = () => {
    const url = `http://127.0.0.1:8000/comments/shelter/${shelId}/reviews/`;
      const auth = "Bearer " + localStorage.getItem("apiToken");
      const formdata = new FormData();
      formdata.append("text", document.getElementById("text").value);
      formdata.append("rating", document.getElementById("rating").value);
      fetch(url, {
      method: "POST",
      headers: {
          "Authorization": auth
        },
        body:formdata
    })
      .then(response => {
        if (response.ok){            
          fetch(`http://127.0.0.1:8000/notifications/`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.getItem('apiToken')
          },
            body: JSON.stringify({
                'owner': shelId,
                'message': 'A comment was created on your profile.',
                'link': `http://127.0.0.1:3000/shelter/${shelId}/comments`
            })
          })
          .then(() => response.json());
    }else{
        throw new Error("hi");
    }
      })
      
      .then(() => {
        document.location.reload();
      }).catch(() => document.getElementById("error_create").innerText = "Comment Creation failed.");
}




    return <div className="ShelterComment">
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
          <h2 className="text-light sub-header">Comments</h2>

          {comments.map(comment => (
            <div className="cotainer-sm bg-info m-3 p-3 rounded" key={comment.id}>
                <h5 className="text-light notification-header">Comment {comment.id}</h5>

                {comment.rating &&
                <h5 className="text-light notification-header">Rating: {comment.rating}</h5>
                 }
                <p className="text-light ">{comment.text}</p>
                {comment.reply &&
                <h5 className="text-light notification-header">Reply to Comment {comment.reply}</h5> 
                }
                <div >
                <button className="text-dark bg-light border-0 rounded" onClick={() => showReply(comment.id)}>Reply</button>
            </div>
              <div id={comment.id} className="hidden">
                <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
            <h2 className="text-light sub-header pb-2">Reply</h2>
            <div className="mb-2">
                <textarea placeholder="Write your reply here." className="form-input rounded blog-body" id={`body${comment.id}`} rows="4" />
                <h5 className="text-light sub-header pb-2">Rating (1-5 stars)</h5>
                <input type="number" id={`rating${comment.id}`}  min="1" max="5" />
            </div>
            <div>
                <button className="text-light bg-info border-0 rounded" onClick={() => createReply(comment.id)}>Submit</button>
                <p id={`error${comment.id}`}></p>
            </div>
        </div>
            </div>
            </div>
          ))}

<h2 className="text-light sub-header pb-2">Add Comment</h2>
            <div className="mb-2">
                <textarea placeholder="Write your comment here." className="form-input rounded" id="text" rows="4" />

                <h5 className="text-light sub-header pb-2">Rating (1-5 stars)</h5>
                <input type="number" id="rating"  min="1" max="5" />
            </div>
            
            <div>
                <button className="text-light bg-info border-0 rounded blog-body" onClick={createComment}>Submit</button>
                <p id="error_create"></p>
            </div>
          
          <p className="m-0">
          { isPrev
            ? <button className="text-dark bg-light border-0 rounded" onClick={() => setQuery({...query, offset: query.offset - 5})}>Previous</button>
            : <></> }
          { isNext 
            ? <button className="text-dark bg-light border-0 rounded" onClick={() => setQuery({...query, offset: query.offset + 5})}>Next</button>
            : <></> }
          </p>
        </div>
    </div>;
}


export default ShelterComments;