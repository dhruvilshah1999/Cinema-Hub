import styled from 'styled-components';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/FooterNav';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TRENDS from './pages/TRENDS/TRENDS';
import MOVIES from './pages/MOVIES/MOVIES';
import SEARCH from './pages/SEARCH/SEARCH';
import SERIES from './pages/SERIES/SERIES';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route path='/' component={TRENDS} exact />
          <Route path='/MOVIES' component={MOVIES} />
          <Route path='/SERIES' component={SERIES} />
          <Route path='/SEARCH' component={SEARCH} />
        </Switch>
      </Container>
        <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  min-height : 100vh;
  background-color : #1D1B1B;
  color : white;
  padding-top : 130px;
  padding-bollom : 70px;

  @media (max-width : 700px){
    padding-top : 70px;
  }
`
