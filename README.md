# Tuitmap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Install API 
1.- Install MongoDB or DockerImage:
  `docker run -d -p 27017:27017 -v ~/data:/data/db mongo`
  
2.- create a database called `api`

  `use api`
  
  
3.- create a database called `tuits`

  `db.createCollection("tuits")`
  
  
4.- Import stream.jsonl

  `mongoimport --db api --collection tuits < stream.jsonl`
  
  
5.- Clone repo `https://github.com/the-vladman/api`

  `git clone https://github.com/the-vladman/api.git`
  
6.- Install Dependencies
  
  `cd api && npm install`
  
7.- Set Env
  
  `cp .env.example .env`

8.- Run Serve

  `npm run prod`

  
## Run App

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
