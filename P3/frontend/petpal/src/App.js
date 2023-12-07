import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetListings from './pages/PetListings';
import Layout from './components/Layout';
import Home from './pages/Home';
import { APIContext, useAPIContext } from './contexts/APIContext';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import Team from './pages/Team';
import { Blogs, BlogsPersonal } from './pages/Blogs';
import { Blog, BlogPersonal } from './pages/Blog';
import { NewBlog, ChangeBlog } from './pages/BlogForm';

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="petListings" element={<PetListings />} />
          <Route path="Notifications" element={<Notifications />} />
          <Route path="teams/:teamID" element={<Team />} />
          <Route path="blogs/personal" element={<BlogsPersonal />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:blogID/personal" element={<BlogPersonal />} />
          <Route path="blog/:blogID" element={<Blog />} />
          <Route path="blogform/:blogID" element={<ChangeBlog />} />
          <Route path="blogform" element={<NewBlog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </APIContext.Provider>;
}

export default App;
