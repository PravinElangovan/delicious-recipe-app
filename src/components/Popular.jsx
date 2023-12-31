import React, { useEffect,useState } from 'react'
import styled from "styled-components"
import {Splide,SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import {Link} from 'react-router-dom';

function Popular() {
  const [popular,setPopular] = useState([]);
  useEffect(()=>{
    getPopular()
  },[])
  const getPopular = async () =>{
    const check = localStorage.getItem('popular');
    
    if(check){
      setPopular(JSON.parse(check))
    }
    else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      
      localStorage.setItem("popular",JSON.stringify(data.recipes));
      
    }
    
    
    
  }
  return (
    <Wrapper>
   
      <h3>Trending..</h3>
      <Splide options={{
        perPage:4,
        breakpoints:{
          1080:{
            perPage:3,
          },
          740:{
            perPage:1,
          },
        },
        arrows:false,
        pagination:false,
        drag:"free",
        gap:"2.5rem",
      }}>
      {
        popular.map((recipe)=>{
          return(
            <SplideSlide key={recipe.id}>
            <Card>
            <Link to={ `/recipe/${recipe.id}`}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt="recipe-img"  />
            <Gradient/>
            </Link>
            </Card>
            </SplideSlide>
          )
        })
      }
      </Splide>
    </Wrapper>
  )
}


//Styles


const Wrapper = styled.div`
margin:2.5rem 0rem;
h3{
  font-size:1.4rem;
}

`
const Card = styled.div`

    min-height:12rem;
    border-radius: 2rem;
    overflow: hidden;
    position:relative;
  

    img{
      border-radius:2rem;
      position:absolute;
      left:0;
      width:100%;
      height:100%;
      object-fit:cover;
    }
    p{
      position:absolute;
      z-index:10;
      top:60%;
      left:0%;
      bottom:0%
      transform:translate(-50%,0%);
      color:white;
      width:100%;
      text-align:center;
      font-weight:600;
      font-size:1rem;
      height:40%;
      display:flex;
      justify-content:center;
      align-items:center;
    }
`
const Gradient=styled.div`
    z-index:3;
    position:absolute;
    height:100%;
    width:100%;
    background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))
`

export default Popular