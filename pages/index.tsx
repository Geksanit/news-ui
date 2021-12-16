import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/news');
  }, [router]);
  return (
    <Head>
      <title>Home</title>
    </Head>
  );
};
export default Home;
