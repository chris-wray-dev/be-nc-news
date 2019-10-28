# BE Northcoders News Check List

## General

**Utils and seed**

- in `makeRefObj` utils, what is !key1 or !key2 doing?
- in utils spec makeRefObj and formatComments, can delete unused variables
- in `makeRefObj` spec mutation test you haven't yet invoked your makeRefObj function :)

**Router**

- in api-router, don't necessarily need to use fs readfile, can just require it in (no harm either way, tho this might be relevant https://stackoverflow.com/questions/35389060/read-json-file-content-with-require-vs-fs-readfile)

**Controllers and models**

- in your controller you have publishArticle but postComment, then in model postArticle and insertComment - try and use the same naming convention for controllers vs models
- in selectComments, do you need the modify? they will always have an id as it is invoked for /:article_id/comments only - you can keep this tho if you're planning on making an 'all comments' endpoint and using the same controller?

## Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

## Migrations

- [ ] Use `notNullable` on required fields
- [good] Default `created_at` in articles and comments tables to the current date:`.defaultTo(knex.fn.now());`
- [good] Delete all comments when the article they are related to is deleted: Add `.onDelete("CASCADE");` to `article_id` column in `comments` table.
- in seed file, can delete unused .then after Promise.all

## Seeding

- [good] Make sure util functions do not mutate data
- [good] Make util functions easy to follow with well named functions and variables
- [good] Test util functions
- [good] Migrate rollback and migrate latest in seed function

## Tests

- [mostly] Cover all endpoints and errors
- [mostly] Ensure all tests are passing **see above for remaining failing ones**

## Routing

- [good] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path
- [ ] Use `.all` for 405 errors

## Controllers

- [mostly] Name functions and variables well **see feedback re: consistent naming above**
- [good] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- [good] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [mostly] No unnecessary use of `.modify()` (i.e. only for author and topic queries) **see comment re: selectComments**
- [good] Use `leftJoin` for comment counts

## Errors

- [good] Use error handling middleware functions in app and extracted to separate directory/file
- [good] Consistently use `Promise.reject` in either models _**OR**_ controllers