import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './style.css';

function NewBlog() {
    let navigate = useNavigate();

    const createBlog = () => {
        fetch(`http://127.0.0.1:8000/blogs/`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.getItem('apiToken')
            },
            body: JSON.stringify({
                'title': document.getElementById("title").value,
                'body': document.getElementById("body").value
            })
          }).then(() => {
            navigate('/blogs/personal');
          });
    }

    return <div className="blogform">
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
            <h2 className="text-light sub-header pb-2">Blog creation</h2>
            <div className="mb-3">
                <input type="text" className="m-0 form-input border-0 rounded" placeholder="Write the blog post's title here." id="title" />
            </div>
            <div className="mb-2">
                <textarea placeholder="Write your blog post here." className="form-input rounded" id="body" rows="20" />
            </div>
            <div>
                <button className="text-light bg-info border-0 rounded" onClick={createBlog}>Submit</button>
            </div>
        </div>

        <div className="mb-5">
            <Link className="text-dark h4" to={'/blogs/personal'}>Return to your blogs</Link>
        </div>
    </div>;
}

function ChangeBlog() {
    let navigate = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ body, setBody ] = useState("");
    const { blogID } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/blogs/${blogID}/personal/`, {
            headers: {
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Not Found");
            }
        })
        .then(json => {
            setTitle(json.title);
            setBody(json.body);
        })
        .catch(() => navigate('/*'));
    }, []);    
    
    const updateBlog = () => {
        fetch(`http://127.0.0.1:8000/blogs/${blogID}/personal/`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.getItem('apiToken')
            },
            body: JSON.stringify({
                'title': document.getElementById("title").value,
                'body': document.getElementById("body").value
            })
        }).then(() => {
            navigate(`/blog/${blogID}/personal`);
        });
    }

    return <div className="blogform">
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
            <h2 className="text-light sub-header pb-2">Modifying Blog: {title}</h2>
            <div className="mb-3">
                <input type="text" className="m-0 form-input border-0 rounded" placeholder="Write the blog post's title here." id="title" value={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div className="mb-2">
                <textarea placeholder="Write your blog post here." className="form-input rounded" id="body" rows="20" value={body} onChange={event => setBody(event.target.value)} />
            </div>
            <div>
                <button className="text-light bg-info border-0 rounded" onClick={updateBlog}>Submit</button>
            </div>
        </div>

        <div className="mb-5">
            <Link className="text-dark h4" to={'/blogs/personal'}>Return to your blogs</Link>
        </div>
    </div>;
}

export { NewBlog, ChangeBlog };