# NestJS boilerplate application

## Branches
- **[typeorm+postgres](https://github.com/i-link-pro-team/nestjs-boilerplate/tree/typeorm+postgres): NestJS + PostgreSQL + TypeORM**
- [mongoose+mongo](https://github.com/i-link-pro-team/nestjs-boilerplate/tree/mongoose+mongo): NestJS + MongoDB + Mongoose

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# write and read testing (1000 iterations)
$ NUMBER_OF_ITERATIONS=1000 npm test
```

## Results table

|                  | PostgreSQL + TypeORM              | MongoDB + Mongoose                |
| ---------------- | --------------------------------- | --------------------------------- |
| 100 iterations   | Write (1352 ms) / Read (56 ms)    | Write (1184 ms) / Read (147 ms)   |
| 1000 iterations  | Write (8562 ms) / Read (334 ms)   | Write (8224 ms) / Read (853 ms)   |
| 10000 iterations | Write (78504 ms) / Read (2213 ms) | Write (63105 ms) / Read (6875 ms) |

