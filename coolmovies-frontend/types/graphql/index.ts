type QueryList<T> = {
  // TODO: implement other properties
  nodes: T[];
};

type Movie = {
  // TODO: implement other properties
  id: string;
  imgUrl: string;
  releaseDate: string;
  title: string;
};

type Review = {
  // TODO: implement other properties
  id: string;
  rating: number;
  title: string;
  body: string;
  userByUserReviewerId: {
    name: string;
    id: string;
  };
};
