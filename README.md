# api-crawler-imdb
API to get data from IMDB website

## Problem Statement
Build search for the top 1000 IMDB movies. Users should be able to search for different aspects of the movie (e.g. director name) and get back the set of movies related to it. For instance, in our implementation:

Searching for “spielberg” returned the following list:

```javascript
[ "Schindler's List",
"Saving Private Ryan",
"Raiders of the Lost Ark",
"Indiana Jones and the Last Crusade",
"Jurassic Park",
"Catch Me If You Can",
"Jaws",
"E.T. the ExtraTerrestrial",
"Empire of the Sun",
"The Color Purple",
"Minority Report",
"Close Encounters of the Third Kind",
"Bridge of Spies",
"Indiana Jones and the Temple of Doom",
"Munich"]
```
Searching for "spielberg hanks" returns:

```javascript
[ "Saving Private Ryan",
"Catch Me If You Can",
"Bridge of Spies"]
```

This is the list of all movies associated with both Spielberg and Hanks.

## Components

You can use the language of your choice.

1. Crawl: You will need to crawl the IMDB listing pages (there are multiple pages) and all the movies linked off of the listing pages.
2. Parse: You will need to parse the pages to extract the right information.
3. Search database: “Index” the information in some way. Given the scale of the problem is not large, you can use a simple in-memory data structure. Please implement it, rather than leveraging external tools for this purpose.
4. Expose a simple API that returns the movie names given a search term.

## Non Goals

This is a very open-ended problem. The goal is not to build a comprehensive solution. Feel free to take decisions on the scope of what you want to accomplish. You can take as much or as little time on the exercise but my recommendation would be spending 2-3 hours at the most.

Some decision you can make on the scope:

* Relevance and ranking are not in scope.
* Your data structure should be optimized for lookup time (take into account the number of lookups). But you don't have to worry about memory scale at this point.
* There is no UX needed. A simple API would do.
* Feel free to make your own decisions on the scope.

## Helpful tips

* Most languages provide libraries for extracting information from web pages using CSS selectors (e.g BeautifulSoupfor python)
* Chrome provides you the ability to look at the CSS selector for a given element on the page
* Important: Have Fun!!

## Deliverables

* Code for this exercise along with instructions on how to run it (if possible, check in the code to github with a README).
* Thoughts on some simplifying assumptions you made and why.
* Some thoughts on If you had more time, how you would improve the solution from the perspective of
software architecture, scale, performance or quality.

Please send any questions/clarification and the solution to us