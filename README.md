# BeeSeeJay API

<blockquote>A basic backend that allows for the creation, modification, and deletion of todo cards in the BeeSeeJay application.</blockquote>

<br><br>

## GET /ideas

### Params

None

### Returns

`[{ “id”: “: id”, “created_date”: “: created_date”, “title”: “: title”, “body”: “: body”}, {}, ...]`

<br><br>

## GET /ideas/:id

### Params

`{ “id”: “: id”}`

### Returns

`{ “id”: “: id”, “created_date”: “: created_date”, “title”: “: title”, “body”: “: body”}`

<br><br>

## POST /ideas

### Params

None

### Returns

`{ “id”: “: id”, “created_date”: “: created_date” }`

<br><br>

## PUT idea/:id

### Params

`{ “id”: “: id”}`

### Body

`{ “title”: “: title”, “body”: “: body” }`

### Returns

`{ “id”: “: id”, “created_date”: “: created_date”, “title”: “: title”, “body”: “: body”}`

<br><br>

## DELETE idea/:id

### Params

`{ “id”: “: id”}`

### Returns

`{ “id”: “: id”, “created_date”: “: created_date”, “title”: “: title”, “body”: “: body”}`
