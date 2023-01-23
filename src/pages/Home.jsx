import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  h4 {
    color: #fab005;
    text-transform: uppercase;
    padding: 10px;
  }
`;
const Home = () => {
  const [loading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://dev3.elemental.co.za/elemental-cms/front_end/get_knowledge")
      .then((response) => {
        const result = response.data.results;
        const sortedData = [...result].sort((a, b) => {
         if(a.cat.toLowerCase() < b.cat.toLowerCase()) return -1;
         if(a.cat.toLowerCase() > b.cat.toLowerCase()) return 1;
         return 0;
        });
        setItems(sortedData);
        setIsLoading(false);
      })
      .catch((err) => {
        setHasError(err);
        console.error(err);
      });
  }, []);

  return (
    <>
      <Wrapper>
        <h4>Category accordion items</h4>
      </Wrapper>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          items?.map((item, index) => {
            console.log(typeof item);
            return (
              <div key={index}>
                <p>{item.cat}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
