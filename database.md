```mermaid

erDiagram

shops ||--o{ items: ""
genre ||--o{ items: ""
genre ||--o{ shops: ""
area ||--o{ items: ""
area ||--o{ shops: ""
cart_items ||--o{ items: ""
cart_items ||--o{ carts: ""
carts ||--o{ users: ""



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

area {
  id SERIAL
  name text
}

genre {
  id SERIAL
  name text
}

cart_items {
  cart_id SERIAL
  item_id INTEGER
}

carts {
  id integer
  user_id integer
}

```



<!-- orders {
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
}  -->
