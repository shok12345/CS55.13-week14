import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllMovieIds, getMovieData } from '../../lib/movies';

export async function getStaticPaths() {
  const paths = await getAllMovieIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getMovieData(params.id);

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

        <p><strong>Movie Name:</strong> {postData.movieName}</p>
        <p><strong>Description:</strong> {postData.description}</p>

        <small>Date: {postData.date}</small>

        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
