import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hasil from './page/hasil';
import Registration from './page/pendaftaran';
import Admin from './page/admin';
import Login from './page/login';
import PrintPage from './tampilan print/cetak';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/hasil" element={<Hasil />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/print" component={PrintPage} />

      </Routes>
    </Router>
  );
}

export default App;
