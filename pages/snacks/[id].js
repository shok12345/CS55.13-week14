import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllSnackIds, getSnackData } from '../../lib/snacks';

export async function getStaticPaths() {
  const paths = await getAllSnackIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getSnackData(params.id);

  return { 
    props: { postData },
    revalidate: 60 
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1>{postData.title}</h1>

        <p><strong>Snack Name:</strong> {postData.snackName}</p>
        <p><strong>Description:</strong> {postData.description}</p>

        <small>Date: {postData.date}</small>

        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
