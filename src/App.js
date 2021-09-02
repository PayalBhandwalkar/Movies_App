import styled from 'styled-components';
import MovieComp from './Components/MovieComp';
import MovieInfoComp from './Components/MovieInfoComp';
import React, { useEffect, useState } from "react";
import axios from 'axios';

export const API_KEY = 'e9dedaa4';

const Container = styled.div`
 display: flex;
 flex-direction: column;`;

 const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-shadow: bold;
  box-shadow: 0 3px 6px 0 #555;
 `;

 const AppName = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 `;

 const SearchBox = styled.div`
 display: flex;
 flex-direction: row;
 padding: 10px 10px;
 background-color: white;
 border-radius: 6px;
 margin-left: 500px;
 width: 30%;
 background-color: white;
 align-items: center;
 `;

 const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
 `;

 const MovieListContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 padding: 30px;
 gap: 24px;
 justify-content: space-evenly;
 `;



function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();
  
  const fetchData = async (searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response)
    updateMovieList(response.data.Search)
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId)
   updateSearchQuery(event.target.value);

   const timeout = setTimeout(() => fetchData(event.target.value), 500);
   updateTimeoutId(timeout);
  };


  return <Container>
    <Header>
      <AppName>
        YOUR MOVIE APP🎞
        </AppName>
        <SearchBox>
          🔎
          <SearchInput placeholder="Search here"
           value={searchQuery}
           onChange={onTextChange}
           />
        </SearchBox>
      </Header>

      {selectedMovie && <MovieInfoComp selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComp
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
            )))
        : "🎞Search the Movie🔍"}
      </MovieListContainer>
    </Container>
};

export default App;
