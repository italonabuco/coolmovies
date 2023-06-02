import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MovieCard from '../MovieCard';

interface IMoviesList {
  data: Movie[];
  loading?: boolean;
}

//TODO: add skeleton to handle on loading
const MoviesList: React.FC<IMoviesList> = ({ data }) => {
  return (
    <Container sx={{ marginTop: 3 }} maxWidth='md'>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 10 }}
        alignItems='stretch'
      >
        {data.map((item) => (
          <Grid item xs={6} sm={3} md={3} lg={2} key={item.id}>
            <MovieCard img={item.imgUrl} title={item.title} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MoviesList;
