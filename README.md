this is a onlie irdering web sit done using next.js 
it uses a server side and client side pages
has dynamic and static page 
has api that gives dish, and order

it uses zustand to manage state for the cart and checkout page

home:           landing page that also have sample dish wich you can add to cart
menu:           a menu page that have all the dish which you can add to the cart by adding button
                have a catagory bar which is client component and a 
                dish-list server commponent for rendering the dishs
                and a add to cart component a client component for adding dish to the cart
cart:           client page shoses the add dish that about to order and let you proced to checkoout page
check out:      client page with the form for ordering and let you order
order-status:   client page which shwoes the order page 
kitchen         client page for the kitchen 
sighnin         client page that let you sign in and creating session


a middlewear    for authentecate 
                checks the sessiion and redirect to sign if ther is non 
                checks the following pages for sessin
                "checkout, orders, order-status and kitchen"
every page that require session does page autentecation on it self and kitchen further chek it role for staff member, order and order status cheh for the owner ship