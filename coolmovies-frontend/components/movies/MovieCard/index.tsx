import Box from '@mui/material/Box';
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
        height: '100%',
        display: 'flex',
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component='img'
          sx={{ height: 300 }}
          image={img}
          alt={title}
        />
        <Box
          sx={{
            flex: '1 0 auto',
            width: '100%',
            p: 1,
            bgcolor: 'primary.dark',
          }}
        >
          <Typography
            component='div'
            color='text.primary'
            sx={{ '&:hover': { textDecoration: 'underline' } }}
          >
            {title}
          </Typography>
        </Box>
      </CardActionArea>
    </Box>
  );
};

export default MovieCard;
