import logo from './logo.svg';
import './App.css';
import EventsMap from './components/EventsMap';
import Login from './components/Login';
import About from './components/About';
import { Routes, Route, Link} from 'react-router-dom';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import Event from './components/Events';
import SignUpAdmin from './components/SignUpAdmin';
import EventParticipants from './components/EventParticipants';
import ViewParticipants from './components/ViewParticipants';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/about' element = {<About />} />
          <Route path='/' element = { <About />} />
          <Route path='/login' element = { <Login />} />
          <Route path='/sign-up' element = { <SignUp/>} />
          <Route path='/contact' element = { <Contact /> } />
          <Route path='/add-event' element = {  <EventsMap /> } />
          <Route path='/events' element = {  <Event/> } />
          <Route path='/add-admin' element = { <SignUpAdmin />  } />
          {/* <Route path='/location' element = { <Location  } /> */}
          <Route path='/event-participants' element = { <EventParticipants />  } />
          <Route path='/view-participants' element = { <ViewParticipants />  } />
          
      </Routes>

      
    </div>
  );
}

export default App;
