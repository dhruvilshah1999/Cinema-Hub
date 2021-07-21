import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';

const Genres = ({type,selectedGenres,setSelectedGenres,genres,setGenres,setPage}) => {
    
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) =>  g.id!== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((s) => s.id!== genre.id));
        setGenres([...genres, genre])
        setPage(1);
    }

    const fetchGenres = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    };
    useEffect(() => {
        fetchGenres();

        return() => {
            setGenres({});
        }
    },[])
    return (
        
        <Container>
            {selectedGenres && selectedGenres.map((genre) => (
                <Chip label={genre.name}
                    style={{margin : 4}}
                    size="small"
                    color="primary"
                    key={genre.id}
                    clickable
                    onDelete={() => handleRemove(genre)}

                />
            ))}
            {genres && genres.map((genre) => (
                <Chip label={genre.name}
                    style={{margin : 4}}
                    size="small"
                    key={genre.id}
                    clickable
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </Container>
    )
}

export default Genres

const Container = styled.div`
    padding : 6px 0;
`