import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreatePoll from './components/Poll/createPoll'
import Home from './components/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/auth/Register'
import PollDetails from './components/Voting/PollDetails'
import Login from './components/auth/Login'
import AvailablePolls from './components/Dashboard/AvailablePolls'
import PollList from './components/Poll/PollList'
import PollResult from './components/Result/PollResult'
import Result from './components/Result/Result'
import Profile from './components/profile/Profile'
import Category from './components/Dashboard/Category'
import PerCategory from './components/Dashboard/PerCategory'
const App = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" exact  element={<Home isLoggedIn={isLoggedIn}/>}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/polls/:pollId" exact element={<PollDetails/>}/>      
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-poll" element={<CreatePoll/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/polls" element={<AvailablePolls/>}/>
          <Route path="/polls/results" element={<Result/>}/>
          <Route path="/polls/:pollId/results" exact element={<PollResult/>}></Route>
          <Route path="/polls/:userId/profile" exact element={<Profile/>}></Route>
          <Route path="/polls/category" exact element={<Category/>}></Route>
          <Route path="/polls/category/:categoryId" exact element={<PerCategory/>}></Route>
        </Routes>
      </BrowserRouter>
      

    </div>
  )
}

export default App
