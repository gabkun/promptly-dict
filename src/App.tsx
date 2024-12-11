import { useState } from 'react'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Components/Signup'
import PrivateRoute from './routes/PrivateRoute';
import LandingPage from './Components/Landingpage';




function App() {
  const [count, setCount] = useState(0)

  return (
<>
<Navbar />
<LandingPage />
<Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
</>
  )
}

export default App