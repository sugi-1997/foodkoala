-- @block
DROP TABLE IF EXISTS api.shops;
CREATE TABLE api.shops (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT ,
    score float  NOT NULL,
    genre_id INTEGER  NOT NULL,
    area_id INTEGER  NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    review_1 TEXT NOT NULL,
    review_2 TEXT NOT NULL,
    review_3 TEXT NOT NULL
);
GRANT SELECT ON api.shops TO web_anon;
GRANT ALL ON api.shops to api_user;
GRANT USAGE ON SEQUENCE api.shops_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.genre;
DROP TABLE IF EXISTS api.genre_id;
CREATE TABLE api.genre (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    image_url TEXT
);
GRANT SELECT ON api.genre TO web_anon;
GRANT ALL ON api.genre to api_user;
GRANT USAGE ON SEQUENCE api.genre_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.area;
DROP TABLE IF EXISTS api.area_id;
CREATE TABLE api.area (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);
GRANT SELECT ON api.area TO web_anon;
GRANT ALL ON api.area to api_user;
GRANT USAGE ON SEQUENCE api.area_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.order_items;
CREATE TABLE api.order_items (
    order_id UUID NOT NULL,
    item_id UUID NOT NULL,
    name TEXT NOT NULL,
    price BIGINT NOT NULL,
    description TEXT,
    image_url TEXT,
    quantity INTEGER NOT NULL,
    UNIQUE(order_id, item_id)
);
GRANT SELECT ON api.order_items TO web_anon;
GRANT ALL ON api.order_items to api_user;
GRANT USAGE ON SEQUENCE api.order_items_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.orders;
CREATE TABLE api.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    status INTEGER NOT NULL,
    payment_method INTEGER NOT NULL,
    amount BIGINT NOT NULL,
    ordered_at TIMESTAMPTZ NOT NULL,
    delivered_at TIMESTAMPTZ
);
GRANT SELECT ON api.orders TO web_anon;
GRANT ALL ON api.orders to api_user;

-- @block
DROP TABLE IF EXISTS api.cart_items;
CREATE TABLE api.cart_items (
    id serial PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    count INTEGER NOT NULL DEFAULT 0
);
GRANT SELECT ON api.cart_items TO web_anon;
GRANT ALL ON api.cart_items TO api_user;
GRANT USAGE ON SEQUENCE api.cart_items_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.carts;
CREATE TABLE api.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL
);
GRANT SELECT ON api.carts TO web_anon;
GRANT ALL ON api.carts to api_user;


--@block
DROP TABLE IF EXISTS api.items;
CREATE TABLE api.items (
    id     serial PRIMARY KEY,
    name        text     NOT NULL,
    image_url   text,
    price       integer,
    explain     text,
    genre_id    integer,
    area_id     integer,
    shop_id     integer
);
GRANT SELECT ON api.items TO web_anon;
GRANT ALL ON api.items to api_user;
GRANT USAGE ON SEQUENCE api.items_id_seq TO api_user;

-- @block
DROP TABLE IF EXISTS api.users;
CREATE TABLE api.users (
    id     serial PRIMARY KEY,
    name        text    NOT NULL,
    email       text    NOT NULL,
    zipcode     text    NOT NULL,
    address     text    NOT NULL,
    phone_number text   NOT NULL,
    password    text    NOT NULL
);
GRANT SELECT ON api.users TO web_anon;
GRANT ALL ON api.users to api_user;
GRANT USAGE ON SEQUENCE api.users_id_seq TO api_user;


-- @block
DROP TABLE IF EXISTS api.favorite;
CREATE TABLE api.favorite (
    shop_id     integer ,
    favorite BOOLEAN  NOT NULL
);
GRANT SELECT ON api.favorite TO web_anon;
GRANT ALL ON api.favorite to api_user;

--@block
SELECT * FROM api.favorite;
