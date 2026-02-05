// api/fetchNews.js
export default async function handler(req, res) {
  const { category, q, type } = req.query;
  const ApiKey = "fa91dc2f307ad9d0dd0ac178129fa096"; // Ideally use process.env.API_KEY
  
  // Decide if we are searching or getting top headlines
  let url = type === 'search' 
    ? `https://gnews.io/api/v4/search?q=${q || "general"}&lang=en&apikey=${ApiKey}`
    : `https://gnews.io/api/v4/top-headlines?category=${category || "general"}&lang=en&apikey=${ApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}