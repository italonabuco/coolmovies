import { DeleteOutline } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

interface IMoviewReview {
  body: string;
  rating: number;
  title: string;
  userName: string;
  onDelete: () => void;
}

const MovieReview: React.FC<IMoviewReview> = ({
  body,
  rating,
  title,
  userName,
  onDelete,
}) => {
  const initials = userName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();
  return (
    <Box sx={{ py: 1 }}>
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
      <IconButton>
        <Image
          src='/edit.svg'
          alt='Edit review'
          width='20'
          height='20'
          css={{
            filter: 'brightness(0) invert(1)',
          }}
        />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteOutline
          height='20'
          width='20'
          htmlColor='white'
          fontSize='small'
        />
      </IconButton>
    </Box>
  );
};

export default MovieReview;
