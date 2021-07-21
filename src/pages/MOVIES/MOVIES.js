import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleContent from '../../components/SingleContnet.js/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenre from '../../hook/useGenre';

const MOVIES = () => {
    const [page, setPage] = useState(1); 
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPage] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async() => { 
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
        console.log(data);
        setContent(data.results);
        setNumOfPage(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies()
    },[genreforURL, page]);

    return (
        <Container>
            <PageTitle>MOVIES</PageTitle>
            <Genres type="movie" 
                selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} 
                genres={genres} setGenres={setGenres} 
                setPage={setPage} 
            />
            <Movies>
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </Movies>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        </Container>
    );
};

export default MOVIES

const Container = styled.div`

`
const PageTitle = styled.span`
    text-transform : uppercase;
    display : flex;
    justify-content : center;
    font-family : "Montserrat", sans-serif;
    font-weight : bold;
    font-size : 2vw;
    padding : 4px;
    border-radius : 50px;
    color : white; 

    @media(max-width : 1000px) {
        font-size : 6.5vw; 
    }
`
const Movies = styled.div`
    display : flex;
    flex-wrap : wrap;
    // justify-content : space-around;
    justify-content : space-between;
`