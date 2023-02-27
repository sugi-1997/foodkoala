-- @block
DROP TABLE IF EXISTS api.categories;
CREATE TABLE api.categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL
);
GRANT SELECT ON api.categories TO web_anon;
GRANT ALL ON api.categories to api_user;

-- @block
DROP TABLE IF EXISTS api.destinations;
CREATE TABLE api.destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    address TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    registered_by UUID NOT NULL
);
COMMENT ON COLUMN api.destinations.registered_by IS 'user_id';
GRANT SELECT ON api.destinations TO web_anon;
GRANT ALL ON api.destinations to api_user;

-- @block
DROP TABLE IF EXISTS api.item_categories;
CREATE TABLE api.item_categories (
    item_id UUID NOT NULL,
    category_id INTEGER NOT NULL,
    UNIQUE(item_id, category_id)
);
GRANT SELECT ON api.item_categories TO web_anon;
GRANT ALL ON api.item_categories to api_user;


-- @block
DROP TABLE IF EXISTS api.shops;
CREATE TABLE api.shops (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT ,
    score float  NOT NULL,
    favorite BOOLEAN  NOT NULL,
    genre_id INTEGER  NOT NULL,
    area_id INTEGER  NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    review_1 TEXT NOT NULL,
    review_2 TEXT NOT NULL,
    review_3 TEXT NOT NULL
);
GRANT SELECT ON api.shops TO web_anon;
GRANT ALL ON api.shops to api_user;

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

-- @block
DROP TABLE IF EXISTS api.area;
DROP TABLE IF EXISTS api.area_id;
CREATE TABLE api.area (
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);
GRANT SELECT ON api.area TO web_anon;
GRANT ALL ON api.area to api_user;

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
    cart_id SERIAL,
    item_id INTEGER,
);
GRANT SELECT ON api.cart_items TO web_anon;
GRANT ALL ON api.cart_items TO api_user;

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
