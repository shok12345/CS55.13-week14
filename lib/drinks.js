const dataURL = 'https://dev-cs55-13-shokatsuki.pantheonsite.io/wp-json/wp/v2/drink';

export async function getAllDrinkIds() {
  const res = await fetch(dataURL);
  const drinks = await res.json();

  return drinks.map(drink => ({
    params: { id: drink.id.toString() }
  }));
}

export async function getSortedDrinksData() {
  const res = await fetch(dataURL);
  const drinks = await res.json();

  drinks.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));

  return drinks.map(drink => ({
    id: drink.id.toString(),
    name: drink.title.rendered || '',
    drinkName: drink.acf?.drink_name || null,   // fallback to null
    description: drink.acf?.description || null,
    price: drink.acf?.price || null,
    sugar: drink.acf?.sugar || null
  }));
}

export async function getDrinkData(idRequested) {
  const res = await fetch(dataURL);
  const drinks = await res.json();

  const drink = drinks.find(d => d.id.toString() === idRequested);
  if (!drink) return {};

  return {
    id: drink.id.toString(),
    title: drink.title?.rendered || null,
    contentHtml: drink.content?.rendered || null,
    date: drink.date || null,
    drinkName: drink.acf?.drink_name || null,  // fallback to null
    description: drink.acf?.description || null,
    price: drink.acf?.price || null,
    sugar: drink.acf?.sugar || null
  };
}
