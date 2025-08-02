import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
  }
});
