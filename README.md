# All-in-One [![Build Status](https://travis-ci.org/FabienGreard/All-In-One.svg?branch=master)](https://travis-ci.org/FabienGreard/All-in-One)[![dependencies Status](https://david-dm.org/FabienGreard/All-in-One/status.svg)](https://david-dm.org/FabienGreard/All-in-One)[![devDependencies Status](https://david-dm.org/FabienGreard/All-in-One/dev-status.svg)](https://david-dm.org/FabienGreard/All-in-One?type=dev)

All-in-One is a server boilerplate, **what it does**:

- Https / http config :globe_with_meridians:
- Use Basic authorization :lock:
- SEO features(sitemap.xml, robots.txt) :eyeglasses:
- Handle server error (with Logs !) :memo:
- Easy to serve file (html, pug or markdown !) :beers:
- Ready to use :fire:

If something doesn’t work, please [file an issue](https://github.com/FabienGreard/All-in-One/issues/new) :bug:.

## Quick Start

### Credentials

Rename `config/.credentials.example.js` to `.credentials.js` and insert your own credentials

### Install and start

```sh
npm install
npm start or npm run dev
```

Use `npm start` to run the app in production mode.
Or use `npm run dev` to run the app in development mode.

Then open [http://localhost:8080/](http://localhost:8080/) to start using All-in-One

## Serv content

To serve content add a folder under the `routes` folder.

## Protecting folder

To protect a new route place a new folder under the `protected` folder.

Example: `/protected/api/index.html` will be serve as `http://localhost:8080//api`

## Test

All-in-one use [Jest](https://facebook.github.io/jest/) as a testing framework

Use `npm test` to start testing your file. By default it read test file named `*.test.js` under `/test`.

You can easily add your own config by editing `config/jest.config.js`

It also has a built-in coverage with `npm run coverage`
