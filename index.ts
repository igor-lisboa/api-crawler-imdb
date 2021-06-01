import express from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import NodeCache from 'node-cache';

// load dotenv variables
dotenv.config();

const myCache = new NodeCache();

const app = express();

const port: string = process.env.PORT || `3000`;
const cacheMinutes: string = process.env.CACHE_MINUTES || `5`;

app.get(`/`, async (req, res) => {
    console.log(myCache.keys());

    const cacheSeconds: number = parseInt(req.query.cacheMinutes?.toString() || cacheMinutes) * 60;

    const baseUrl: string = `https://www.imdb.com`;

    let urlNextPage: string | undefined = `/search/title/?groups=top_1000`;

    if (!myCache.has("test")) {
        // walk through pages
        while (urlNextPage !== undefined) {
            const response: AxiosResponse<any> = await axios.get(`${baseUrl}${urlNextPage}`);
            const $: CheerioAPI = cheerio.load(response.data);
            urlNextPage = $(`.lister-page-next.next-page`).first().attr(`href`);
        }

        myCache.set("test", { cache: "test" }, cacheSeconds);
    }

    return res.json(myCache.get("test"));
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});