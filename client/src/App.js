import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreatePoll from './components/Poll/createPoll'
import Home from './components/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/Register/Register'
import PollDetails from './components/Voting/PollDetails'
import Login from './components/Login/Login'
import AvailablePolls from './components/Dashboard/AvailablePolls'
import PollList from './components/Poll/PollList'
const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" exact  element={<Home/>}/>
          <Route path="/polls/:pollId" element={<PollDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-poll" element={<CreatePoll/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/polls" element={<AvailablePolls/>}/>
        </Routes>
      
      </BrowserRouter>
      

    </div>
  )
}

export default App
