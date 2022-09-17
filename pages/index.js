import { Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kesharwani Store</title>
        <meta name="description" content="The ecommerce store for Kesharwani" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography component="h1" variant="h1">
        Dhanu Kumar
      </Typography>
    </div>
  );
}
