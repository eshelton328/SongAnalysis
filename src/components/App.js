import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar.js'
import '../styles/App.css';

function App() {
  return (
    <div>
      <Container>
        <Grid
            container
            direction="row"
            justify="center"
        >
          <Grid
            container
            direction="row"
            justify="center"
          >
            <h1>CrowdPleaser</h1>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <SearchBar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
