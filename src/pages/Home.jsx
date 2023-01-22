import React, { useState, useEffect } from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fab005;
  }
`;

const Home = () => {
  const [loading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);

  console.log(items.results)

useEffect(() => {
  setIsLoading(true)
  try {
    fetch('http://dev3.elemental.co.za/elemental-cms/front_end/get_knowledge')
    .then(response => response.json())
    .then(data => setItems(data))
    setIsLoading(false)
  } catch (e) {
    setHasError(e);
    console.error(e)
  }
}, [])


  return (
    <Wrapper>
      <h1>Home</h1>
    </Wrapper>
  );
};

export default Home;
