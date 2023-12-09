import React from 'react'
import CreatePoll from './components/Poll/createPoll'
import PollList from './components/Poll/PollList'
import LoginForm from './components/Login/Login'
const App = () => {
  return (
    <div>
     {/* <CreatePoll/>  
     <PollList/> */}
     <LoginForm/>
     <CreatePoll/>
    </div>
  )
}

export default App
