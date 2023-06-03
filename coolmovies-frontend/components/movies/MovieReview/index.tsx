import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface IMoviewReview {
  body: string;
  rating: number;
  title: string;
  userName: string;
}

const MovieReview: React.FC<IMoviewReview> = ({
  body,
  rating,
  title,
  userName,
}) => {
  const initials = userName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <Typography color='text.secondary'>{initials}</Typography>
        </Avatar>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ marginLeft: 1 }}
        >
          {userName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating defaultValue={rating} precision={1} size='small' readOnly />
        <Typography color='text.primary' sx={{ marginLeft: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography color='grey.400' sx={{ marginLeft: 1 }}>
        {body}
      </Typography>
    </Box>
  );
};

export default MovieReview;
