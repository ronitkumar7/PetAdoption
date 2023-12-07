import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './style.css';

function Blogs() {
    const [ query, setQuery ] = useState({limit: 5, offset: 0});
    const [ blogs, setBlogs ] = useState([]);
    const [ isNext, setIsNext ] = useState(false);
    const [ isPrev, setIsPrev ] = useState(false);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/blogs/all/?limit=${query.limit}&offset=${query.offset}`)
        .then(response => response.json())
        .then(json => {
            setIsNext(json.next !== null);
            setIsPrev(json.previous !== null);
            setBlogs(json.results);
        });
    }, [ query ]);

    return <>
        <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
          <h2 className="text-light sub-header">Blog Posts:</h2>

          {blogs.map(blog => (
            <div className="cotainer-sm bg-info m-3 p-3 rounded" key={blog.id}>
                <h5 className="text-light notification-header">Post: {blog.title}</h5>
                <p className="text-light blog-body">{blog.body}</p>

                <div className="pb-2">
                  <Link to={`/blog/${blog.id}`} className="text-light">Read more</Link>
                </div>
            </div>
          ))}

          <div className="pb-2">
            <Link to={`/blogs/personal`} className="text-light h4">Your Blogs</Link>
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
    </>;
}

function BlogsPersonal() {
  const [ query, setQuery ] = useState({limit: 5, offset: 0});
  const [ blogs, setBlogs ] = useState([]);
  const [ isNext, setIsNext ] = useState(false);
  const [ isPrev, setIsPrev ] = useState(false);
  
  useEffect(() => {
      fetch(`http://127.0.0.1:8000/blogs/?limit=${query.limit}&offset=${query.offset}`, {
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDY3NjU2LCJpYXQiOjE3MDE5ODEyNTYsImp0aSI6IjJkNDg5NmRjZDMyMTQ2YWM4ODJlZTRlNDMxMDA4OGE1IiwidXNlcl9pZCI6MX0.HG6Q_4mUou5u_fhH2Lbv1EQPy30G970jHdMXOXo_7UA"
        }
      })
      .then(response => response.json())
      .then(json => {
          setIsNext(json.next !== null);
          setIsPrev(json.previous !== null);
          setBlogs(json.results);
      });
  }, [ query ]);

  return <>
      <div className="container-sm bg-primary mt-5 mb-5 p-3 rounded">
        <h2 className="text-light sub-header">Your Blog Posts:</h2>

        {blogs.map(blog => (
          <div className="cotainer-sm bg-info m-3 p-3 rounded" key={blog.id}>
              <h5 className="text-light notification-header">Post: {blog.title}</h5>
              <p className="text-light blog-body">{blog.body}</p>

              <div className="pb-2">
                <Link to={`/blog/${blog.id}/personal`} className="text-light">View</Link>
              </div>
          </div>
        ))}

        <div className="pb-2">
          <Link to={`/blogform`} className="text-light h4">Create New Blog</Link>
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
  </>;
}

export { Blogs, BlogsPersonal };