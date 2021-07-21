import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from "../../config/config";
import styled from "styled-components";

const handleDragStart = (e) => e.preventDefault();

const  Carousel = ({id, media_type}) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
        <CarouselItem>
            <CarouselImage 
                src={c.profile_path?`${img_300}/${c.profile_path}` : noPicture} 
                alt={c?.name}
                onDragStart={handleDragStart}
            />
            <CarouselText>{c?.name}</CarouselText>
        </CarouselItem>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCredits = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setCredits(data.cast);
    };

    useEffect(() => {
        fetchCredits();
    },[]);

  return (
    <AliceCarousel 
        mouseTracking items={items} 
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay

    />
  );
};

export default  Carousel;

const CarouselItem = styled.div`
    display: flex;
    flex-direction: column;
    object-fit: contain;
    padding: 10px;
`
const CarouselImage = styled.img`
    border-radius: 10px;
    margin-bottom: 5px;
    box-shadow: 0px 0px 5px black;
`
const CarouselText = styled.b`

`
