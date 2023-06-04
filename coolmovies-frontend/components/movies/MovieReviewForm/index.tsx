import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

interface CustomElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  title: HTMLInputElement;
  body: HTMLInputElement;
  rating: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

interface IMovieReviewForm {
  onSubmit: (
    data: Omit<Review, 'id' | 'userByUserReviewerId'> & {
      userId: string;
    },
    isNew: boolean
  ) => void;
  loading?: boolean;
}

const MovieReviewForm: React.FC<IMovieReviewForm> = ({ onSubmit, loading }) => {
  const handleSubmit = (event: React.FormEvent<CustomForm>) => {
    event.preventDefault();
    const { user, title, body, rating } = event.currentTarget.elements;

    onSubmit(
      {
        userId: user.value,
        title: title.value,
        body: body.value,
        rating: +rating.value,
      },
      true
    );
  };
  return (
    <Card
      sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
      component='form'
      autoComplete='off'
      onSubmit={(e) => handleSubmit(e as any)}
    >
      <Typography component='legend' color='text.secondary'>
        Add review
      </Typography>
      <TextField
        required
        name='user'
        label='User ID'
        defaultValue=''
        size='small'
        disabled={loading}
      />
      <TextField
        required
        name='title'
        label='Title'
        defaultValue=''
        size='small'
        disabled={loading}
      />
      <TextField
        required
        name='body'
        label='Comment'
        defaultValue=''
        size='small'
        multiline
        rows={3}
        disabled={loading}
      />
      <Box>
        <Typography component='legend' color='text.secondary'>
          Rate
        </Typography>
        <Rating
          name='rating'
          defaultValue={0}
          precision={1}
          disabled={loading}
        />
      </Box>
      <LoadingButton
        variant='outlined'
        color='warning'
        type='submit'
        loading={loading}
      >
        Submit review
      </LoadingButton>
    </Card>
  );
};

export default MovieReviewForm;
