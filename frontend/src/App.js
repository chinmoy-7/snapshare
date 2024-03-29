
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import logo from './imgs/logo.png'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import HomePage from './components/HomePage';
import Weather from './components/Weather';
import Landing from './components/landing'
import BookSearch from './components/booksearch'

function App() {
  return (
    <>
      <header>
        {/* <img src={logo} /> */}
      </header>
        <BrowserRouter>
        <AuthContextProvider>         
           <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/welcome' element={<Welcome/>}/>
              <Route path='/home' element={<HomePage/>}/>
              <Route path='/weather' element={<Weather/>}/>
              <Route path='/book-landing' element={<Landing/>}/>
              <Route path='/booksearch' element={<BookSearch/>}/>

              
          </Routes>
          </AuthContextProvider>

        </BrowserRouter>
    </>
  );
}

export default App;
