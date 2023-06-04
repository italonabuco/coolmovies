import { DeleteOutline } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';

interface IMoviewReview {
  body: string;
  rating: number;
  title: string;
  userName: string;
  onDelete: () => void;
  onEdit: () => void;
}

const MovieReview: React.FC<IMoviewReview> = ({
  body,
  rating,
  title,
  userName,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

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
      <IconButton onClick={onEdit}>
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
      <IconButton onClick={handleClickOpen}>
        <DeleteOutline
          height='20'
          width='20'
          htmlColor='white'
          fontSize='small'
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle id='draggable-dialog-title'>Delete review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this review? You won&apos;t be able
            to undo it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickClose} color='inherit'>
            Cancel
          </Button>
          <Button onClick={onDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MovieReview;
