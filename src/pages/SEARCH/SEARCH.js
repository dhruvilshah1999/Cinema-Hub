import styled from 'styled-components';
import { Button, TextField, ThemeProvider, createTheme, Tabs, Tab } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContnet.js/SingleContent';
import axios from 'axios';

const SEARCH = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        try{

            const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            setContent(data.results);
            setNumOfPages(data.total_pages);

        }catch (error) {

            console.log(error);

        }
    };
    
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page]);

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    return (
        <Container>
            <ThemeProvider theme={darkTheme}>
                <Search>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        style={{ marginLeft: 10 }}
                        onClick={fetchSearch}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </Search>

                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{padding:5}}
                    aria-label="disabled tabs example"
                >
                    <Tab style={{width:"50%"}} label="Search Movies"/>
                    <Tab style={{width:"50%"}} label="Search Tv-Series"/>
                </Tabs>
            </ThemeProvider>
            <Trending>
                {
                    content && content.map((c) => (
                        <SingleContent 
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type?"tv":"movie"}
                            vote_average={c.vote_average}

                        />
                    ))
                }

                {/* {!searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)} */}
            </Trending>
                { numOfPages > 1 && ( <CustomPagination setPage={setPage} numOfPages={numOfPages} /> ) }       
        </Container>
    );
};

export default SEARCH

const Container = styled.div`
    
`
const Search = styled.div`
    display : flex;
    margin : 5px 0;
    text-transform : uppercase;
    font-family : "Montserrat", sans-serif;
    font-weight : bold;
    font-size : 2vw;
`
const Trending = styled.div`
    display : flex;
    flex-wrap : wrap;
    // justify-content : space-around;
    justify-content : space-between;
    padding-bottom : 55px;
`