import Head from 'next/head';
import SchemeDetails from '../../components/SchemeDetails';

export default function SchemeDetailsPage() {
  return (
    <>
      <Head>
        <title>Scheme Details - InfoMaid</title>
        <meta name="description" content="Detailed information about the government scheme" />
      </Head>
      <SchemeDetails />
    </>
  );
} 