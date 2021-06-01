# api-crawler-imdb
API to get data from IMDB website

* You can check the documentation on this link: https://documenter.getpostman.com/view/15046943/TzY1hGUV.
    * Or you can import the postman_collection on your [Postman](https://www.postman.com/) and make a few requests.

## How to use this api
1. First you should check if you have node installed
    * you can check running this command `node --version`, if it returns something like this `v12.18.4` it's ok, if it throws some error, check what is wrong with [node](https://nodejs.org/en/).
2. Then, you need to install this project dependencies, running the follow command: `npm install`.
3. After that you can configure 2 things in your enviroment... The *PORT* that will be used and how much minutes the Cache will avoid to go to IMDB website scrap the titles.
    * You can copy the `.env.example` file executing `cp .env.example .env` and edit what you want.

## The endpoint

This API only have one endpoint `/` and you can use some query params to filter the titles or decide if the cache will be used or choose if will want to see every data of each title.
* The query params are:
    * q => This field receive the text that you want to search.
    * pluck => If pluck is equal 0 all the title data will return.
    * cache => If cache is equal 0, the cache will not be used.