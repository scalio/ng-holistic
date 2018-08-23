# NgHolistic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Nrwl Extensions for Angular (Nx)

<a href="https://nrwl.io/nx"><img src="https://preview.ibb.co/mW6sdw/nx_logo.png"></a>

Nx is an open source toolkit for enterprise Angular applications.

Nx is designed to help you create and build enterprise grade Angular applications. It provides an opinionated approach to application project structure and patterns.

## Quick Start & Documentation

[Watch a 5-minute video on how to get started with Nx.](http://nrwl.io/nx)

## Generate your first application

Run `ng generate app myapp` to generate an application. When using Nx, you can create multiple applications and libraries in the same CLI workspace. Read more [here](http://nrwl.io/nx).

## Development server

Run `ng serve --project=myapp` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --project=myapp` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --project=myapp` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Run ci e2e (in Docker)

### Sandbox app

```
docker-compose -f apps/sandbox/docker/docker-compose.yml up -d --build
docker-compose -f apps/sandbox/docker/docker-compose.yml run cypress ./node_modules/.bin/cypress run \
    --config baseUrl=http://127.0.0.1
```

## Commands

-   `npm run start` - run dev server for cabinet project 4200 port
-   `npm run start:admin` - run dev server for admin project 4201 port
-   `npm run test:admin-core` - run unit tests for admin-core project (watch mode)
-   `npm run test` - run unit tests for entire solution
-   `npm run test:admin-core:all` - run unit tests for admin-core project in chrome, IE, Edge (only once)
-   `npm run test:all` - run unit tests for whole project in chrome, IE, Edge (only once)
-   `npm run test:ci:admin-core` - run unit tests for admin-core project in chrome headless only once
-   `npm run test:ci" - run unit tests for entire solution in chrome headless only once
-   `npm run lint`- lint only `admin project`npm run e2e:admin`- run cypress tests for admin project (watch mode)
-   `npm run e2e` - run cypress tests for entire solution (watch mode)
