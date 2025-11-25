import got from 'got';

const dataURL = 'https://dev-cs55-13-shokatsuki.pantheonsite.io/wp-json/wp/v2/movie';


// GET ALL MOVIE IDS FOR getStaticPaths()
export async function getAllMovieIds() {
  try {
    const response = await got(dataURL);
    const movies = JSON.parse(response.body);

    return movies.map(movie => ({
      params: { id: movie.id.toString() }
    }));

  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    return [];
  }
}



// GET SORTED MOVIE DATA FOR HOMEPAGE
export async function getSortedMoviesData() {
  try {
    const response = await got(dataURL);
    const movies = JSON.parse(response.body);

    movies.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));

    return movies.map(movie => ({
      id: movie.id.toString(),
      name: movie.title.rendered,
      movieName: movie.acf?.movies || "",   
      date: movie.date
    }));

  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}




export async function getMovieData(idRequested) {
  try {
    const response = await got(dataURL);
    const movies = JSON.parse(response.body);

    const movie = movies.find(m => m.id.toString() === idRequested);
    if (!movie) return {};

    return {
      id: movie.id.toString(),
      title: movie.title.rendered,
      contentHtml: movie.content.rendered,
      date: movie.date,
      movieName: movie.acf?.movies || "",   
      template: movie.template || "",
      slug: movie.slug
    };

  } catch (error) {
    console.error(`Error fetching movie ${idRequested}:`, error);
    return {};
  }
}
