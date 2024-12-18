import Navbar from './Components/Navbar'
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Components/Signup'
import LandingPage from './Components/Landingpage';
import Dashboard from './Components/User/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import ExampleSlider from './Components/Swiper';
import AdminDashboard from './Components/Admin/AdminDashboard';






function App() {

  return (
<>
<Navbar />
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/swiper" element={<ExampleSlider />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
</>
  )
}

export default App