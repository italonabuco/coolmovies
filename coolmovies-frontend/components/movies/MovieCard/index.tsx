import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface IMovieCardType {
  img: string;
  title: string;
  onClick?: () => void;
}

const MovieCard: React.FC<IMovieCardType> = ({ img, title, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component='img'
          sx={{ height: 300 }}
          image={img}
          alt={title}
        />
        <Box sx={{ flex: '1 0 auto', p: 1 }}>
          <Typography component='div' color='text.secondary'>
            {title}
          </Typography>
        </Box>
      </CardActionArea>
    </Box>
  );
};

export default MovieCard;
