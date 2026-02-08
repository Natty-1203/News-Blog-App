export default async function handler(req, res) {
  const { category, q, type } = req.query;
  const ApiKey = import.meta.env.VITE_GNEWS_API_KEY;

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
