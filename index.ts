import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

// load dotenv variables
dotenv.config();

const app = express();

const port: string = process.env.PORT || `3000`;

app.get(`/`, async (req, res) => {
    const baseUrl: string = `https://www.imdb.com`;

    let urlNextPage: string | undefined = `/search/title/?groups=top_1000`;

    const response = await axios.get(`${baseUrl}${urlNextPage}`);
    console.log(response.data);

    return res.json({ itIsWorking: "uhul" });
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});