import express from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

// load dotenv variables
dotenv.config();

const app = express();

const port: string = process.env.PORT || `3000`;

app.get(`/`, async (req, res) => {
    const baseUrl: string = `https://www.imdb.com`;

    let urlNextPage: string | undefined = `/search/title/?groups=top_1000`;

    // walk through pages
    while (urlNextPage !== undefined) {
        const response: AxiosResponse<any> = await axios.get(`${baseUrl}${urlNextPage}`);
        const $: CheerioAPI = cheerio.load(response.data);
        urlNextPage = $(`.lister-page-next.next-page`).first().attr(`href`);
        console.log(urlNextPage);
    }


    return res.json({ itIsWorking: "uhul" });
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});