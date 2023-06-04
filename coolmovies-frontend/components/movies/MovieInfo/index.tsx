import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

interface IMovieInfoType {
  img: string;
  title: string;
  year: string;
}

const MovieInfo: React.FC<IMovieInfoType> = ({ img, title, year }) => {
  const classes = useStyles();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <CardMedia
        className={classes.img}
        component='img'
        image={img}
        alt={title}
      />
      <Box
        sx={{
          p: 1,
        }}
      >
        <Typography component='p' color='text.primary' variant='h5'>
          {title}
        </Typography>
        <Typography component='p' color='text.secondary' variant='body1'>
          {year}
        </Typography>
      </Box>
    </Card>
  );
};

const useStyles = makeStyles((theme: any) => ({
  img: {
    width: 200,
    [theme.breakpoints.down('sm')]: {
      width: 120,
    },
  },
}));

export default MovieInfo;
