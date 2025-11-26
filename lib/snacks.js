const dataURL = 'https://dev-cs55-13-shokatsuki.pantheonsite.io/wp-json/wp/v2/snack';

export async function getAllSnackIds() {
  const res = await fetch(dataURL);
  const snacks = await res.json();

  return snacks.map(snack => ({
    params: { id: snack.id.toString() }
  }));
}

export async function getSortedSnacksData() {
  const res = await fetch(dataURL);
  const snacks = await res.json();

  snacks.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));

  return snacks.map(snack => ({
    id: snack.id.toString(),
    name: snack.title.rendered,
    snackName: snack.acf?.snack_name || '',
    description: snack.acf?.description || '',
    price: snack.acf?.price || '',
    location: snack.acf.location || ''
  }));
}

export async function getSnackData(idRequested) {
  const res = await fetch(dataURL);
  const snacks = await res.json();

  const snack = snacks.find(s => s.id.toString() === idRequested);
  if (!snack) return {};

  return {
    id: snack.id.toString(),
    title: snack.title.rendered,
    contentHtml: snack.content.rendered,
    date: snack.date,
    snackName: snack.acf?.snack_name,
    description: snack.acf?.description,
    price: snack.acf?.price,
    location: snack.acf.location
  };
}
