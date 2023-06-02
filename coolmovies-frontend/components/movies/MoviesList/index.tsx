import Grid from '@mui/material/Grid';
import MovieCard from '../MovieCard';

interface IMoviesList {
  data: Movie[];
  loading?: boolean;
  onItemClick?: (id: string) => void;
}

//TODO: add skeleton to handle on loading
const MoviesList: React.FC<IMoviesList> = ({ data, onItemClick }) => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      columns={{ xs: 12, sm: 12, md: 12, lg: 10 }}
      alignItems='stretch'
    >
      {data.map((item) => (
        <Grid item xs={6} sm={3} md={3} lg={2} key={item.id}>
          <MovieCard
            img={item.imgUrl}
            title={item.title}
            onClick={() => onItemClick?.(item.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesList;
