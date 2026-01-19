import Head from 'next/head';
import Schemes from '../../components/Schemes';

export default function SchemesPage() {
  return (
    <>
      <Head>
        <title>Schemes - InfoMaid</title>
        <meta name="description" content="Browse available government schemes for persons with disabilities" />
      </Head>
      <Schemes />
    </>
  );
} 