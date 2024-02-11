import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import ConfigAdmin from './pages/ConfigAdmin/ConfigAdmin';
import Private from './Private';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route
          path='/administrador'
          element={
            <Private>
              <ConfigAdmin />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
