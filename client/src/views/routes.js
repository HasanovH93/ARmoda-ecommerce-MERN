import React from 'react';

// Demo E-commerce
import {
  IndexView,
  Cart as CartView,
  Checkout as CheckoutView,
  EmptyCart as EmptyCartView,
  Listing as ListingView,
  Promotions as PromotionsView,
  OrderComplete as OrderCompleteView,
  ProductOverview as ProductOverviewView,
} from 'views';
import SignupSimple from './SignupSimple';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <IndexView {...params} />,
  },
  {
    path: '/cart',
    renderer: (params = {}) => <CartView {...params} />,
  },
  {
    path: '/checkout',
    renderer: (params = {}) => <CheckoutView {...params} />,
  },
  {
    path: '/empty-cart',
    renderer: (params = {}) => <EmptyCartView {...params} />,
  },
  {
    path: '/listing',
    renderer: (params = {}) => <ListingView {...params} />,
  },
  {
    path: '/promotions',
    renderer: (params = {}) => <PromotionsView {...params} />,
  },
  {
    path: '/order-complete',
    renderer: (params = {}) => <OrderCompleteView {...params} />,
  },
  {
    path: '/product-overview',
    renderer: (params = {}) => <ProductOverviewView {...params} />,
  },
  {
    path: '/signup',
    renderer: (params = {}) =>  <SignupSimple {...params}/>,
  }
];

export default routes;
