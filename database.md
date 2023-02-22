```mermaid

erDiagram

shops ||--o{ items: ""
genre_id ||--o{ items: ""
genre_id ||--o{ shops: ""
area_id ||--o{ items: ""
area_id ||--o{ shops: ""


users {
  user_id   serial
  name        text
  email       text
  zipcode     text 
  address     text 
  phone_number text
  password    text 
}

items {
  item_id     serial
    name        text
    image_url   text
    price       integer
    explain     text
    genre_id    integer
    area_id     integer
    shop_id     integer
}

shops {
  id SERIAL
  name TEXT 
  description TEXT 
  image_url TEXT
  score INTEGER  
  favorite BOOLEAN  
  genre_id INTEGER  
  area_id INTEGER  
  deleted_at TIMESTAMPTZ
}

area_id {
  id SERIAL
  name text
}

genre_id {
  id SERIAL
  name text
}

```

<!-- carts {
  id integer
  user_id integer
}

cart_items {
  cart_id UUID
  item_id UUID
}

orders {
  id UUID
  user_id UUID
  status INTEGER
  payment_method INTEGER
  amount BIGINT
  ordered_at TIMESTAMPTZ 
  delivered_at TIMESTAMPTZ
}

order_items {
  order_id UUID
  item_id UUID
  name TEXT
  price BIGINT
  description TEXT
  image_url TEXT
  quantity INTEGER
} -->
