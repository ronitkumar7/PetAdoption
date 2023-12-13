import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './style.css';

function Blog() {
    let navigate = useNavigate();
    const [ query, setQuery ] = useState({});
    const [ blog, setBlog ] = useState({});
    const { blogID } = useParams();
    const [ liked, setLiked ] = useState({likeID: 0, isLike: 0});
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/blogs/${blogID}/`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Not Found");
            }
        })
        .then(json => {
            setBlog(json);
        })
        .catch(() => navigate('/*'));

        fetch(`http://127.0.0.1:8000/blogs/${blogID}/likes/`, {
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
            if(json.length === 0) {
                setLiked({likeID: 0, isLike: 0});
            }
            else if(json[0].isLike) {
                setLiked({likeID: json[0].id, isLike: 1});
            }
            else {setLiked({likeID: json[0].id, isLike: -1});}
        })
        .catch(() => navigate('/*'));
    }, [query]);

    const createLike = isLike => () => {
        fetch(`http://127.0.0.1:8000/blogs/${blogID}/likes/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
          body: JSON.stringify({
              'isLike': isLike,
          })
        }).then(() => setQuery({...query}));
    }
  
    const changeLike = isLike => () => {
        fetch(`http://127.0.0.1:8000/blogs/likes/${liked.likeID}/`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('apiToken')
        },
            body: JSON.stringify({
                'isLike': isLike,
            })
        }).then(() => setQuery({...query}));
    }

    const deleteLike = () => () => {
        fetch(`http://127.0.0.1:8000/blogs/likes/${liked.likeID}/`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('apiToken')
            }
        }).then(() => setQuery({...query}));
    }

    return <>
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
            <h2 className="text-light sub-header">{blog.title}</h2>
            <div className="cotainer-sm bg-light m-3 p-3 rounded">
                <p className="text-dark">{blog.body}</p>

                { liked.isLike === 0 
                ? <>
                    <button className="text-light bg-primary border-0 rounded" onClick={createLike(true)}>Like</button>
                    <button className="text-light bg-primary border-0 rounded" onClick={createLike(false)}>Dislike</button>
                </>
                : <>
                    <button className={liked.isLike === 1 ? "text-light bg-success border-0 rounded" : "text-light bg-primary border-0 rounded"} onClick={liked.isLike === 1 ? deleteLike() : changeLike(true)}>Like</button>
                    <button className={liked.isLike === -1 ? "text-light bg-success border-0 rounded" : "text-light bg-primary border-0 rounded"} onClick={liked.isLike === -1 ? deleteLike() : changeLike(false)}>Dislike</button>
                </>
                }
            </div>

            <div className="pb-2">
                <Link to={'/blogs'} className="text-light h5">More Blogs</Link>
            </div>
        </div>
    </>;
}

function BlogPersonal() {
    let navigate = useNavigate();
    const [ query, setQuery ] = useState({});
    const [ blog, setBlog ] = useState({});
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
            setBlog(json);
        })
        .catch(() => navigate('/*'));
    }, [query]);

    const deleteBlog = () => () => {
        fetch(`http://127.0.0.1:8000/blogs/${blogID}/personal/`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('apiToken')
            }
        }).then(() => navigate('/blogs/personal'));
    };

    return <>
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
            <h2 className="text-light sub-header">{blog.title}</h2>
            { !blog.detail
                ? <>
                    <div className="cotainer-sm bg-light m-3 p-3 rounded">
                        <p className="text-dark">{blog.body}</p>
                    </div>

                    <div className="pb-3">
                        <Link to={`/blogform/${blogID}`} className="text-light h5">Modify</Link>
                    </div>            
                    <div className="pb-3">
                        <button className="text-light bg-danger border-0 rounded" onClick={deleteBlog()}>Delete</button>
                    </div>
                </>
                : <>
                    <p className="text-light">This blog does not exist, or does not belong to you!</p>  
                </>
            }
            <div className="pb-3">
                <Link to={'/blogs/personal'} className="text-light h5">Personal Blogs</Link>
            </div> 

        </div>
    </>;
}

export { Blog, BlogPersonal };