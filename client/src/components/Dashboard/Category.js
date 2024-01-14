import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
const linkStyle={
  textDecoration: 'none',
  color:'#4a4949'
}
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
            console.log(data);
            let category=[];
            for(let i=0;i<data.length;i++){
              if(!category.includes(data[i].category)){
                category.push(data[i].category);
              }
            }
            setCategories(category);
  
          
        }
        catch(error){
            console.error('Error fetching Category :'+error);
        }
    }
    fetchCategory();
   },[])
  return (
    <div>
        <h2 id='category-label'>Poll Categories</h2>
      <div id="categories">
      {categories.map((category,index)=>(
        <div className='category-card' key={index}>
          <Link  to={`/polls/category/${category}`} style={linkStyle}>
            <img  className="category-image" src={require(`../../assets/${category}.jpeg`)}></img>
          {category}</Link>
          </div>
      ))}
      </div>
     
    </div>
  )
}

export default Category
