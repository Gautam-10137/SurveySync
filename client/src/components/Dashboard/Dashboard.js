import React from 'react'
import {Link} from 'react-router-dom'
const Dashboard = () => {
  return (
    <div>
      <h2>Poll Forms:</h2>
      <ul>
        <li>
            <Link to="/create-poll"> Create a New Poll</Link>
        </li>
        <li>
            <Link to="/polls">View Available Polls</Link>
        </li>
        <li>
          <Link to="/polls/results">Results</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dashboard
