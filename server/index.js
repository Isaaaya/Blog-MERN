require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Success')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})