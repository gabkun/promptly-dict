import Navbar from './Components/Navbar'
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Components/Signup'
import LandingPage from './Components/Landingpage';





function App() {

  return (
<>
<Navbar />
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
</>
  )
}

export default App