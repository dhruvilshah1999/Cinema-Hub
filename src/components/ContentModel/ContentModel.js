import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from "styled-components"
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "85%",
    backgroundColor: "#1D1B1B",
    color:"white",
    border: '5px solid #EC4D37',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModel({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchContent = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
    };

  const fetchVideo = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key);
    };

  useEffect(()=>{
    fetchContent();
    fetchVideo();
  },[])
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div>
        <Container
            style={{ cursor: "pointer" }}
            color="inherit"
            onClick={handleOpen} 
            type="button" 
            onClick={handleOpen}>

                {children}
                
        </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (<div className={classes.paper}>
            <ContentsModels>

                <ImagePoitratePoster src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} 
                alt={content.name || content.title} />

                <ImageLandscapePoster src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape} 
                alt={content.name || content.title}/>

                <ContentModuleAbout>

                    <ContentTitle>
                        {content.name || content.title} (
                            {(
                                content.first_air_date ||
                                content.release_date ||
                                "------"
                            ).substring(0, 4)}
                            )
                    </ContentTitle>

                    {content.tagline && (
                    <ContentTagLine>
                        {content.tagline}            
                    </ContentTagLine>
                    )} 

                    <ContentOverview>
                        {content.overview}            
                    </ContentOverview> 
                    
                    <ContentCastCarosal>
                        <Carousel id={id} media_type={media_type} />
                    </ContentCastCarosal>

                    <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}

                    >

                    </Button>
                </ContentModuleAbout>           
            </ContentsModels>
          </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width: 200px;
    padding : 5px;
    margin : 10px 0;
    background-color : #EC4D37;
    border-radius : 10px;
    position : relative;
    font-family: "Montserrat", sans-serif;

    :hover{
        background-color : white;
        color : black;
    }

    @media(max-width : 550px){
        width : 155px;
    }

`
const ContentsModels = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 835px) {
        flex-direction: row;
        justify-content: space-around;
        padding: 10px 0;  
    }
`
const ImagePoitratePoster = styled.img`
    display: none;
    object-fit: contain;
    border-radius: 10px;

    @media (min-width: 835px) {
        display: flex;
        width: 38%;
    }
`
const ImageLandscapePoster = styled.img`
    object-fit: contain;
    border-radius: 10px;

    @media (min-width: 835px) {
        display: none;  
    }
`
const ContentModuleAbout = styled.div`
    display : flex;
    padding: 10px;
    width: 95%;
    height: 90%;
    flex-direction : column;
    justify-content: space-evenly;
    font-weight: 300;

    @media (min-width: 835px) {
        width: 58%;
        height: 100%;
        padding: 0; 
    }
`
const ContentTitle = styled.span`
    display: flex;
    height: 12%;
    font-size : 5vw;
    align-items: center;
    justify-content: center;

    @media (min-width: 835px) {
        font-size: 3.5vw;  
    }
`
const ContentTagLine = styled.i`
    padding-top: 20px;
    align-self: center;

    @media (min-width: 835px) {
        font-size: 1.5vw;  
    }
`
const ContentOverview = styled.span`
    display: flex;
    height: 30%;
    padding : 15px;
    border-radius : 20px;
    overflow-y: scroll;

    scrollbar-width: thin;
    ::-webkit-scrollbar {
        display: none;
    }

    // background-color : #EC4D37;
    // box-shadow: inset 0 0 5px #000000;
    box-shadow: inset 0 0 5px #EC4D37;

    text-align: justify;

    @media (min-width: 835px) {
        font-size: 22px;  
    }
`
const ContentCastCarosal = styled.div`

`