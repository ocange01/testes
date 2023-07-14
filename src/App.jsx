import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin';
import Registration from './pendaftaran';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
