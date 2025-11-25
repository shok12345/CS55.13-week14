import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllDrinkIds, getDrinkData } from '../../lib/drinks';

export async function getStaticPaths() {
  const paths = await getAllDrinkIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getDrinkData(params.id);

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

        <p><strong>Drink Name:</strong> {postData.drinkName}</p>
        <p><strong>Description:</strong> {postData.description}</p>

        <small>Date: {postData.date}</small>

        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
