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

export interface IMovieReviewForm {
  title: string;
  onSubmit: (
    data: Omit<Review, 'id' | 'userByUserReviewerId'> & {
      userId: string;
    },
    editing: boolean
  ) => void;
  loading?: boolean;
  initialValues?: Omit<Review, 'id'>;
  editing?: boolean;
  onCancel?: () => void;
}

const MovieReviewForm: React.FC<IMovieReviewForm> = ({
  title,
  onSubmit,
  loading,
  initialValues,
  editing,
  onCancel,
}) => {
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
      Boolean(editing)
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
        {title}
      </Typography>
      <TextField
        required
        name='user'
        label='User ID'
        defaultValue={initialValues?.userByUserReviewerId.id}
        size='small'
        disabled={loading || editing}
      />
      <TextField
        required
        name='title'
        label='Title'
        defaultValue={initialValues?.title}
        size='small'
        disabled={loading}
      />
      <TextField
        required
        name='body'
        label='Comment'
        defaultValue={initialValues?.body}
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
          defaultValue={initialValues?.rating}
          precision={1}
          disabled={loading}
        />
      </Box>
      <LoadingButton
        variant='contained'
        color='warning'
        type='submit'
        loading={loading}
      >
        Submit review
      </LoadingButton>
      {onCancel && (
        <LoadingButton type='submit' disabled={loading} onClick={onCancel}>
          Cancel
        </LoadingButton>
      )}
    </Card>
  );
};

export default MovieReviewForm;
