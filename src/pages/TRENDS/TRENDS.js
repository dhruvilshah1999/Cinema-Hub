import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SingleContent from '../../components/SingleContnet.js/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const TRENDS = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrends = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        // console.log(data);
        setContent(data.results);

    };
    
    useEffect(() => {
        fetchTrends();
    }, [page]);

    return (
        <Container>
            <PageTitle>TRENDS</PageTitle>
            <Trending>
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </Trending>
            <CustomPagination setPage={setPage}/>
        </Container>
        
    );
};

export default TRENDS

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
const Trending = styled.div`
    display : flex;
    flex-wrap : wrap;
    // justify-content : space-around;
    justify-content : space-between;
`