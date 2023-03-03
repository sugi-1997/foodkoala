--使わない予定です！！（一旦残します）

INSERT INTO api.favorite(
    shop_id ,
    favorite
)
VALUES (
    1,
    TRUE
),
(2,TRUE),
(3,FALSE),
(4,TRUE),
(5,TRUE),
(6,FALSE),
(7,FALSE),
(8,TRUE),
(9,FALSE),
(10,FALSE),
(11,FALSE),
(12,TRUE),
(13,FALSE);


--@block
SELECT * FROM api.favorite;
