import express from 'express';
import { MongoClient, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || '';

let moviesColl: Collection;

MongoClient.connect(MONGODB_URI)
  .then(client => {
    const db = client.db('sample_mflix');
    moviesColl = db.collection('movies');
    app.listen(PORT, () => console.log(`API listening on ${PORT}`));
  })
  .catch((ex) => console.log(`Failed to connect to MongoDB: ${ex.message} Is your MONGODB_URI correct?`));

app.get('/api/movies', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string)?.trim();

    const filter: any = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const total = await moviesColl.countDocuments(filter);
    const movies = (await moviesColl
      .find(filter)
      .sort({ year: -1, name: 1 })
      .skip(skip)
      .limit(limit)
      .project({ plot_embedding: 0, plot_embedding_voyage_3_large: 0 })
      .toArray())
      .map(movie => ({
        ...movie,
        year: parseInt(String(movie.year), 10)
      }));

    res.json({ total, page, limit, movies });
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
