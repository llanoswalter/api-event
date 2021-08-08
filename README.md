# app Events

## _routes_

- ## created User

```HTTP
POST https://app-event-node.herokuapp.com/api/users/

requided bady{
  "username": String,
  "name": String,
  "password": String
}

```

---

- ## created Event

```HTTP
POST https://app-event-node.herokuapp.com/api/event/

requided bady{
  title: String,
  description: String,
  location: String,
  date: DATE(year/month/day hour:minute)
}

```

---

- ## login

```HTTP
POST https://app-event-node.herokuapp.com/api/users/

requided bady{
  "username": String,
  "password": String
}

```

---

- ## get Events on the home page

```HTTP
GET https://app-event-node.herokuapp.com/api/event/
```

---

- ## get ten featured events

```HTTP
GET https://app-event-node.herokuapp.com/api/event/featured
```

---

- ## get Event by URl

```HTTP
GET https://app-event-node.herokuapp.com/api/event/:id

```

**Params id =** "url page searched"

---

- ## get pagination Event
  get the first ten events

```HTTP
GET https://app-event-node.herokuapp.com/api/event/paginate
HEADER: authorization: "bearer (token)"


```

**optional variables to handle paging**

```HTTP
GET https://app-event-node.herokuapp.com/api/event/paginate/:page?/:limit?
HEADER: authorization: "bearer (token)"

```

**page:** number you want to see

**limit:** limit of results you want to receive per page

---

- ## get text to share an event

```HTTP
POST https://app-event-node.herokuapp.com/api/share/:id

```

**Params id =** "url page searched"

- ## get image

```HTTP
POST https://app-event-node.herokuapp.com/api/event/image/:id

```

**Params id =** "image searched"
