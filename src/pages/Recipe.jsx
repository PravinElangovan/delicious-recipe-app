import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  console.log(details);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
      <Buttons>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        </Buttons>
        {activeTab === "instructions" && (
            <div>
                <h3 dangerouslySetInnerHTML={{__html: details.summary }}></h3> 
                <h3>{details.instructions}</h3> 
            </div>
        )}
        {activeTab === "ingredients" && details.extendedIngredients && (
            <ul>
                {details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
        )}

        
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display:flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  h3{
    font-size:1rem;
    line-height:1.5rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.3rem;
  }

  ul {
    margin-top: 2rem;
  }
  img{
    width:330px;
    border-radius:1rem;
    @media(max-width:800px){
      width:350px;
      
    }
  }
  @media (max-width: 800px){
    display:flex;
    flex-direction:column;
    align-items:center;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 8rem;
  @media (max-width : 800px){
    margin-left:1.5rem;
    margin-top:2.5rem;
  }
`;
const Buttons = styled.div`
display:flex;
align-items:center;
justify-content:space-around;
`
export default Recipe;
