import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('API is running!'));
app.listen(3001, () => console.log('API server on http://localhost:3001'));
