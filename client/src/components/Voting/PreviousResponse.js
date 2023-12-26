import React,{useState,useEffect} from 'react'

const PreviousResponse = ({pollId}) => {
  const [responseDetail,setResponseDetail]=useState({});

  useEffect(()=>{
    const fetchResponseDetails=async()=>{
        const response=await fetch(`http://127.0.0.1:7000/polls/`)
    }
  },[]);
  return (
    <div>
       
    </div>
  )
}

export default PreviousResponse
