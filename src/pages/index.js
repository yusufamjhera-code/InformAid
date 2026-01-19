import Head from 'next/head';
import Home from '../components/Home';

export default function Index() {
  return (
    <>
      <Head>
        <title>InfoMaid - Government Schemes for Persons with Disabilities</title>
        <meta name="description" content="Find and apply for government schemes for persons with disabilities" />
      </Head>
      <Home />
    </>
  );
} 