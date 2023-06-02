import { NextPage } from 'next';
import AppLayout from '../../../components/layouts/AppLayout';
import { useRouter } from 'next/router';

const Reviews: NextPage = () => {
  const router = useRouter();

  return (
    <AppLayout title={`Reviews for movieId: ${router.query.id}`}>
      List of reviews
    </AppLayout>
  );
};

export default Reviews;
