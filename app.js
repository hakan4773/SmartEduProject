const expres = require('express');

const app = expres();
app.get('/', (req, res) => {
  res.status(200).send('index');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
