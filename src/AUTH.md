This document maps all protected routes, their security layers, and the assertions proved by each security gate.

 Middleware Layer:** The perimeter gate.
 Identity Verification Layer: on each page that require it
 Role-Based Access Control: on each page that require it
 Data Ownership / Tenancy Layer:

 middleware
  matcher: ["/Checkouts,"/orders", "/order-status", "/kitchens"]

  checkouts: check session exist by itself too
  orders: do extra data owner ship 

  kitchens: check role to stafe
