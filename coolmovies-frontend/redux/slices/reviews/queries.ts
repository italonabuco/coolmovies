import { gql } from '@apollo/client';

export const allMovieReviewsQuery = gql`
  query AllMovieReviews($movieId: UUID!) {
    reviews: allMovieReviews(condition: { movieId: $movieId }) {
      nodes {
        id
        rating
        title
        body
        userByUserReviewerId {
          name
          id
        }
      }
    }
    movie: movieById(id: $movieId) {
      id
      imgUrl
      title
      releaseDate
    }
  }
`;

export const createMovieReviewMutation = gql`
  mutation CreateMovieReview($input: CreateMovieReviewInput!) {
    createMovieReview(input: $input) {
      movieReview {
        id
        userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`;
