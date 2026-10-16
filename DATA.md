app/menu/page.js    server awaits dishes
DishList, DishCard  server markup only
CategoryBar         client selection state
orders              client see order
order-status        client track order
AddToCartButton     client onClick, writes to store
Providers           client context needs state
kitchen             client admin side
app/layout.js       server passes children in

*******************************************************

menu refresh as client type because it filter and render menu page is server but has client component so the client search usin the catagory bar 