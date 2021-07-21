import styled from "styled-components"
import React from 'react'
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const CustomPagination = ({setPage, numOfPages=10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };
    
    const darkTheme = createTheme({
        palette : {
            type : "dark",
        },
    });

    return (
        <Container>
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    count = {numOfPages} 
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    color='primary'
                />
            </ThemeProvider>
        </Container>
    )
}

export default CustomPagination

const Container = styled.div`
    padding-bottom : 80px;
    width : 100%;
    display : flex;
    justify-content : center;
    margin-top : 10px;
        
`