import styled from 'styled-components';

const Header = () => {
    
    return (
            <Headers onClick={() => 
                window.scroll(0,0)
            }>
                📺 Cinema Hub 🎥
            </Headers>
        )
}

export default Header

const Headers = styled.span`
    width : 100%;
    position : fixed;
    cursor : pointer;
    justify-content : center;
    text-transform : uppercase;
    display : flex;
    font-size : 3vw;
    font-family: "Montserrat", sans-serif;
    font-weight : bold;
    background-color : #EC4D37;
    color : white;
    padding-bottom : 15px;
    z-index : 100;
    box-shadow: 0px 1px 5px #544B44;

    @media (max-width: 1000px){
        padding-top : 15px;
        font-size : 5vw;
    }
`