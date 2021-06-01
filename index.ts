import express from 'express';
import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import NodeCache from 'node-cache';

const myCache = new NodeCache();

// load dotenv variables
dotenv.config();

const app = express();

const port: string = process.env.PORT || `3000`;
const cacheMinutes: string = process.env.CACHE_MINUTES || `5`;


app.get(`/`, async (req, res) => {
    const searchQuery: string = req.query.q?.toString() || `all`;
    const cacheSeconds: number = parseInt(req.query.cacheMinutes?.toString() || cacheMinutes) * 60;
    const notPluckReturn: boolean = req.query.pluck?.toString() === `0`;
    const notUseCache: boolean = req.query.cache?.toString() === `0`;

    let titles: { title: string; summary: string; directors: string[]; starActors: string[]; releasedYear: number; position: number; stars: number; metaScore: number; certificate: string; runtimeMinutes: number; genres: string[]; votes: number; gross: string; }[] = [];

    // if the cache query param is not 0 and myCache has the searchQuery => populate titles with the cachedTitles ELSE search on imdb
    if (notUseCache === false && myCache.has(searchQuery)) {
        const cachedTitles: { title: string; summary: string; directors: string[]; starActors: string[]; releasedYear: number; position: number; stars: number; metaScore: number; certificate: string; runtimeMinutes: number; genres: string[]; votes: number; gross: string; }[] | undefined = myCache.get(searchQuery);
        if (cachedTitles !== undefined) {
            titles = cachedTitles;
        }
    } else {
        const baseUrl: string = `https://www.imdb.com`;

        let urlNextPage: string | undefined = `/search/title/?groups=top_1000`;

        // walk through pages
        while (urlNextPage !== undefined) {
            const response: AxiosResponse<any> = await axios.get(`${baseUrl}${urlNextPage}`);
            const $: CheerioAPI = cheerio.load(response.data);
            urlNextPage = $(`.lister-page-next.next-page`).first().attr(`href`);

            $(`.lister-item.mode-advanced`).each((i, element) => {
                const cheerioElement = $(element);

                const itemContent = cheerioElement.find(`.lister-item-content`).first();
                const ratingsBar = itemContent.find(`.ratings-bar`).first();
                const h3Title = itemContent.find(`h3.lister-item-header`).first();

                const title: string = h3Title.find(`a`).first().text().trim();
                const summary: string = itemContent.find(`p:nth-child(4)`).text().trim();
                const releasedYear: number = parseInt(h3Title.find(`.lister-item-year.text-muted.unbold`).text().trim().replace(/\D/g, ``));
                const position: number = parseInt(h3Title.find(`.lister-item-index.unbold.text-primary`).text().trim().replace(/\D/g, ``));
                const stars: number = parseInt(ratingsBar.find(`.inline-block.ratings-imdb-rating>strong`).first().text().trim().replace(/\D/g, ``)) / 10;
                const metaScore: number = parseInt(ratingsBar.find(`.inline-block.ratings-metascore>span.metascore`).first().text().trim().replace(/\D/g, ``));

                const certificate: string = itemContent.find(`p:nth-child(2) > span.certificate`).text().trim();
                const runtimeMinutes: number = parseInt(itemContent.find(`p:nth-child(2) > span.runtime`).text().trim().replace(` min`, ``));
                const genres: string[] = itemContent.find(`p:nth-child(2) > span.genre`).text().trim().split(`, `);

                const infoDirectorsAndStars: string[] = itemContent.find(`p:nth-child(5)`).text().trim().replace(`  `, ``).split(`Stars:`);
                const directors: string[] = infoDirectorsAndStars[0].replace(`Director:\n`, ``).replace(`Directors:\n`, ``).replace(`, \n`, `, `).replace(`\n               | \n    `, ``).split(`, `);
                const starActors: string[] = infoDirectorsAndStars[1].replace(/(\r\n|\n|\r)/gm, ``).split(`, `);

                const votes: number = parseInt(itemContent.find(`p.sort-num_votes-visible > span:nth-child(2)`).text().trim().replace(`,`, ``));
                const gross: string = itemContent.find(`p.sort-num_votes-visible > span:nth-child(5)`).text().trim();


                let searchedText: string = searchQuery.toLowerCase();
                if (searchedText === `all`) {
                    searchedText = ``;
                }

                let includeTitle: boolean = false;

                // splitting the searchedText to search each part separate
                searchedText.split(` `).forEach(itemToSearch => {
                    // check if title or directors or starActors or genres includes the searched text, if includes, push to titles
                    if (title.toLowerCase().includes(itemToSearch) || directors.join(`,`).toLowerCase().includes(itemToSearch) || starActors.join(`,`).toLowerCase().includes(itemToSearch) || genres.join(`,`).toLowerCase().includes(itemToSearch)) {
                        includeTitle = true;
                    }
                });

                if (includeTitle) {
                    titles.push({ title, summary, directors, starActors, releasedYear, position, stars, metaScore, certificate, runtimeMinutes, genres, votes, gross });
                }

            });
        }

        myCache.set(searchQuery, titles, cacheSeconds);
    }


    if (notPluckReturn === true) {
        return res.json(titles);
    }

    return res.json(titles.map(title => title.title));
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});