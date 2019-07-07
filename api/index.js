import express from 'express';

const app = express();

const PORT = 7000;

app.get('/', (req, res) => {
    return res.send ('The API is necessary to run this application');
})

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT} `);
});