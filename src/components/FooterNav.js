import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
// import { shadows } from '@material-ui/system';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import { withTheme } from 'styled-components';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';
import TvRoundedIcon from '@material-ui/icons/TvRounded';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#EC4D37",
    zIndex: 100,
    boxShadow : "0px 1px 5px #544B44",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if(value===0){
      history.push('/');
    }
    else if(value===1){
      history.push('/MOVIES');
    }
    else if(value===2){
      history.push('/SERIES');
    }
    else{
      history.push('/SEARCH');
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{color : "white"}} label="TRENDS" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{color : "white"}} label="MOVIES" icon={<MovieRoundedIcon />} />
      <Copyright>@Copyright : dhruvilshah934@gmail.com</Copyright>
      <BottomNavigationAction style={{color : "white"}} label="SERIES" icon={<TvRoundedIcon />} />
      <BottomNavigationAction style={{color : "white"}} label="SEARCH" icon={<SearchTwoToneIcon />} />

      
    </BottomNavigation>
  );
}

const Copyright = styled.div`
  margin-top : 2px;
  color : white;
  font-weight: 10px;
  position : relative;
  text-align : center;
  font-size : 6px;
`