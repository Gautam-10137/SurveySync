import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
const Category = () => {
    const [categories,setCategories]=useState([]);

   useEffect(()=>{
    const fetchCategory= async()=>{
        try{
            const token=localStorage.getItem('token');
            const response= await fetch('http://127.0.0.1:7000/polls/all',{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`${token}`
                }
            });
            const data=await response.json();
            for(let i=0;i<data.length;i++){
                setCategories([...categories,data[i].category]);
            }
            
          
        }
        catch(error){
            console.error('Error fetching Category :'+error);
        }
    }
    fetchCategory();
   },[])
  return (
    <div>
        <h2>Poll Categories:</h2>
      {categories.map((category,index)=>(
        <Link key={index} to={`/polls/category/${category}`} >{category}</Link>
      ))}
     
    </div>
  )
}

export default Category
