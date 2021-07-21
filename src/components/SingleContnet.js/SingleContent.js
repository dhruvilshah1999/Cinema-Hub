import styled from "styled-components"
import { img_300 } from "../../config/config"
import { unavailable } from "../../config/config"
import { Badge } from "@material-ui/core";
import ContentModel from "../ContentModel/ContentModel";
const SingleContent = ({id, poster, title, date, media_type, vote_average}) => {
    return (
        
        <ContentModel media_type={media_type} id={id}>
            <BadgeStyle>
                <Badge badgeContent={vote_average} color={vote_average>7?'primary':'secondary'} />
            </BadgeStyle>
            <Poster src={poster?`${img_300}/${poster}`: unavailable} alt={title} />
            <Title>{title}</Title>
            <MediaType>
                {
                    media_type==="tv" ? "TV SERIES" : "MOVIE"
                }
                <Date>
                    {date}
                </Date>
            </MediaType>
        </ContentModel>
    )
}

export default SingleContent


const Poster = styled.img`
    border-radius : 10px;

`
const Title = styled.b`
    widht : 100%;
    text-align : center;
    font-size : 17px;
    padding : 8px 0;

`
const MediaType = styled.span`
    display : flex;
    justify-content : space-between;
    padding-bottom : 6px;
    padding : 0 2px;
`
const Date = styled.span`
    display : flex;
    justify-content : space-between;
    padding-bottom : 6px;
    padding : 0 2px;
`
const BadgeStyle = styled.div`
    padding-left : 190px;
    
    @media(max-width: 1024px){
        padding-left : 185px; 
    }
    @media(max-width: 768px){
        padding-left : 185px; 
    }
    @media(max-width: 600px){
        padding-left : 145px; 
    }
    @media(max-width: 425px){
        padding-left : 145px; 
    }
`