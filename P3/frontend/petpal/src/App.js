import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetListings from './pages/PetListings';
import Layout from './components/Layout';
import Home from './pages/Home';
import { APIContext, useAPIContext } from './contexts/APIContext';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import Team from './pages/Team';
import Games from './pages/Games';

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="petListings" element={<PetListings />} />
          <Route path="Notifications" element={<Notifications />} />
          <Route path="teams/:teamID" element={<Team />} />
          <Route path="games" element={<Games />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </APIContext.Provider>;
}

export default App;
