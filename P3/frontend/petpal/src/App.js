import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetListings from './pages/PetListings';
import Applications from './pages/Applications';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { APIContext, useAPIContext } from './contexts/APIContext';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import Team from './pages/Team';
import { Blogs, BlogsPersonal } from './pages/Blogs';
import { Blog, BlogPersonal } from './pages/Blog';
import { NewBlog, ChangeBlog } from './pages/BlogForm';
import CurrentProfile from './pages/CurrentProfile';
import UpdateProfile from './pages/UpdateProfile';
import OutsideProfile from './pages/OutsideProfile';
import Shelters from './pages/Shelters';
import ShelterComments  from './pages/ShelterComments';
import ApplicationComments from './pages/ApplicationComments';

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="currProfile" element={<CurrentProfile />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="profile/:profID" element={<OutsideProfile />} />
          <Route path="shelters" element={<Shelters />} />
          <Route path="petListings" element={<PetListings />} />
          <Route path="Applications" element={<Applications />} />
          <Route path="Notifications" element={<Notifications />} />
          <Route path="teams/:teamID" element={<Team />} />
          <Route path="blogs/personal" element={<BlogsPersonal />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:blogID/personal" element={<BlogPersonal />} />
          <Route path="blog/:blogID" element={<Blog />} />
          <Route path="blogform/:blogID" element={<ChangeBlog />} />
          <Route path="blogform" element={<NewBlog />} />
          <Route path="shelter/:shelId/comments" element={<ShelterComments />} />
          <Route path="application/:appId/comments" element={<ApplicationComments />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </APIContext.Provider>;
}

export default App;
