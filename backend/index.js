import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const generateHeadline = (name, location) => {
  const templates =  [
  `Why ${name} is ${location}'s Sweetest Spot in 2025`,
  `Discover ${name}: The Hidden Gem of ${location}`,
  `Top 5 Reasons Why ${location} Residents Trust ${name}`,
  `${name} is Redefining Local Excellence in ${location}`,
  `${name}: The Go-To Destination for Quality in ${location}`,
  `How ${name} Became a Household Name in ${location}`,
  `From Passion to Perfection: ${name}'s Journey in ${location}`,
  `${name} Sets the Bar for Small Businesses in ${location}`,
  `What Makes ${name} Stand Out in ${location}`,
  `Explore Why ${name} is ${location}'s Favorite Choice`
];
  return templates[Math.floor(Math.random() * templates.length)];
};

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ error: 'Missing name or location' });
  }
  const data = {
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300 + 50),
    headline: generateHeadline(name, location),
  };
  res.json(data);
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  if (!name || !location) {
    return res.status(400).json({ error: 'Missing name or location' });
  }
  res.json({ headline: generateHeadline(name, location) });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
