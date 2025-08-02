import app from './app.js';

const port = Number(process.env.PORT) || 8080;

app.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server running on port ${port}`);
  }
});
