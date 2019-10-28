## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

# 405- method not allowed (7 failing)

### PATCH `/api/topics`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PUT `/api/articles/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PUT `/api/articles/1/comments`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PUT `/api/comments/1`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PUT `/api/users/butter_bridge`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### DELETE `/api`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

---

# Entity exists but no articles/comments yet (2 failing)

### GET `/api/articles?author=lurker` // 200 []

Assertion: expected 404 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the user exists

### GET `/api/articles?topic=paper` // 200 []

Assertion: expected 404 to equal 200

Hints:

- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists

### GET `/api/articles/2/comments` // 200 []

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

---

# Patches (4 failing - some because status code )

### PATCH `/api/articles/1`

Assertion: expected 202 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/articles/1`

Assertion: expected 202 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### PATCH `/api/comments/1`

Assertion: expected 202 to equal 200

Hints:

- use a 200: OK status code for successful `patch` requests

### PATCH `/api/comments/1`

Assertion: expected 202 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

---
***here***

# Post requests (2 failing)

### POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:

<!-- - use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns

### POST `/api/articles/10000/comments`

Assertion: expected 400 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

--- -->

# Un-nest arrays when single object requested (1 failing)

### GET `/api/users/butter_bridge`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the user to the client in an object, with a key of `user`: `{ user: { } }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names
