import got from 'got';

const dataURL = 'https://dev-cs55-13-shokatsuki.pantheonsite.io/wp-json/wp/v2/movie';



export async function getAllPostIds() {
  try {
    const response = await got(dataURL);
    const snacks = JSON.parse(response.body);

    return snacks.map(snack => ({
      params: { id: snack.id.toString() }
    }));
  } catch (error) {
    console.error('Error fetching snack IDs:', error);
    return [];
  }
}



export async function getSortedPostsData() {
  try {
    const response = await got(dataURL);
    const snacks = JSON.parse(response.body);

    // sort alphabetically
    snacks.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));

    return snacks.map(snack => ({
      id: snack.id.toString(),
      name: snack.title.rendered,
      snackName: snack.acf?.snack_name || '',
      description: snack.acf?.description || ''
    }));
  } catch (error) {
    console.error('Error fetching snacks:', error);
    return [];
  }
}



export async function getPostData(idRequested) {
  try {
    const response = await got(dataURL);
    const snacks = JSON.parse(response.body);

    const snack = snacks.find(s => s.id.toString() === idRequested);
    if (!snack) return {};

    return {
      id: snack.id.toString(),
      title: snack.title.rendered,
      contentHtml: snack.content.rendered,
      date: snack.date,
      snackName: snack.acf?.snack_name,
      description: snack.acf?.description
    };
  } catch (error) {
    console.error(`Error fetching snack ${idRequested}:`, error);
    return {};
  }
}




/*
//import { remark } from 'remark';
//import html from 'remark-html';
//import fs from 'fs';
//import path from 'path';
//import matter from 'gray-matter';

import got from 'got';

const dataURL = 'https://dev-cs55-13-shokatsuki.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1';

 
//const postsDirectory = path.join(process.cwd(), 'posts');

export async function getAllPostIds() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
  // above code returns an array with nested obj values that looks like this:
  // [
  //   {
  //     params: {
  //       id: 3
  //     }
  //   },
  //   {
  //     params: {
  //       id: 2
  //     }
  //   }
  // ]
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedPostsData() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // sort json array by name property
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

export async function getPostData(idRequested) {
  
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
// console.log(objReturned);

  // return object value found
  return objReturned;
}
*/
