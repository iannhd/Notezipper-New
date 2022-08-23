import './App.css';
import './bootstrap.min.css'
import Footer from './components/Footer';
import Header from './components/Header';
// import MainScreen from './components/MainScreen';
import LandingPage from './screens/LandingPage/LandingPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/registerPage';
const App = () => {
  return (
    <Router>
    <Header/>
    <main>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/mynotes' element={<MyNotes/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
