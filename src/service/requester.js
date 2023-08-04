const baseUrl = `https://opentdb.com/api.php?amount=15`;
const categoryUrl = `https://opentdb.com/api_category.php`;

export async function getAllCategories() {
  try {
    return await fetch(categoryUrl);
  } catch (err) {
    console.error(err);
  }
}

export async function requester(category, difficulty) {
  try {
    let res = await fetch(
      `${baseUrl}&category=${category}&difficulty=${difficulty}&type=multiple`,
      { metod: "get", "content-type": "application/json" }
    );
    const data = await res.json();

    return data.results;
  } catch (err) {
    console.error(err);
  }
}
