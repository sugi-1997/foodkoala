INSERT INTO api.shops (
    name,
    description,
    image_url,
    score,
    favorite,
    genre_id,
    area_id
  )
VALUES (
    '食堂麒麟',
    'テキストテキストテキストテキスト',
    '/images/shop/shokudo.shop.jpg',
    3.7,
    true,
    2,
    1
  ),
 (
    'SUPER EAT',
    'テキストテキストテキストテキスト',
    '/images/shop/restaurant.shop.jpg',
    3.8,
    false,
    5,
    1
  ),
 (
    'Rice to meet you',
    'テキストテキストテキストテキスト',
    '/images/shop/curry.shop.jpg',
    4.3,
    true,
    4,
    2
  ),
 (
    '麺屋ライオン',
    'テキストテキストテキストテキスト',
    '/images/shop/ramen.shop.jpg',
    4.1,
    false,
    3,
    3
  ),
 (
    '手抜きキッチン',
    'テキストテキストテキストテキスト',
    '/images/shop/tenuki.shop.jpg',
    3.2,
    false,
    2,
    1
  ),
 (
    'Rabbit Cafe',
    'テキストテキストテキストテキスト',
    '/images/shop/cafe.shop.jpg',
    3.6,
    false,
    6,
    6
  ),
 (
    'Kingyo Sushi',
    'テキストテキストテキストテキスト',
    '/images/shop/sushi.shop.jpg',
    3.3,
    false,
    2,
    1
  ),
 (
    '青い鳥コーヒー',
    'テキストテキストテキストテキスト',
    '/images/shop/coffee.shop.jpg',
    3.8,
    true,
    6,
    6
  ),
  (
    'Adams Burger',
    'テキストテキストテキストテキスト',
    '/images/shop/burger.shop.jpg',
    3.9,
    true,
    1,
    2
  ),
  (
    'Cave cafe',
    'テキストテキストテキストテキスト',
    '/images/shop/CavaCafe.shop.jpg',
    4.0,
    false,
    6,
    6
  ),
  (
    'キムチ食堂',
    'テキストテキストテキストテキスト',
    '/images/shop/kimuchi.shop.jpg',
    4.1,
    false,
    3,
    3
  ),
  (
    'ABC pizza',
    'テキストテキストテキストテキスト',
    '/images/shop/abcpizza.shop.jpg',
    3.5,
    false,
    1,
    4
  ),
  (
    'Surf Coffee',
    'テキストテキストテキストテキスト',
    '/images/shop/surfcoffee.shop.jpg',
    3.2,
    false,
    6,
    6
  )

  --@block
  SELECT * from api.shops;
  
