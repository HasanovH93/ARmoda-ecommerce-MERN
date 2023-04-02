import React from "react";
import { lazy } from "react";

const HomeKidsFashion = lazy(() => import("./home/HomeKidsFashion"));

const ShopGridStandard = lazy(() => import("./shop/ShopGridStandard"));

const ProductTabLeft = lazy(() => import("./shop-product/ProductTabLeft"));

const About = lazy(() => import("./other/About"));
const Contact = lazy(() => import("./other/Contact"));
const MyAccount = lazy(() => import("./other/MyAccount"));
const LoginRegister = lazy(() => import("./other/LoginRegister"));

const Cart = lazy(() => import("./other/Cart"));
const Wishlist = lazy(() => import("./other/Wishlist"));
const Compare = lazy(() => import("./other/Compare"));
const Checkout = lazy(() => import("./other/Checkout"));

const NotFound = lazy(() => import("./other/NotFound"));

const routes = [
  {
    path: "/",
    renderer: (params = {}) => <HomeKidsFashion {...params} />,
  },
  {
    path: "/about",
    renderer: (params = {}) => <About {...params} />,
  },
  {
    path: "/checkout",
    renderer: (params = {}) => <Checkout {...params} />,
  },
  {
    path: "/contact",
    renderer: (params = {}) => <Contact {...params} />,
  },
  {
    path: "/my-account",
    renderer: (params = {}) => <MyAccount {...params} />,
  },
  {
    path: "/shop-grid-standard",
    renderer: (params = {}) => <ShopGridStandard {...params} />,
  },
  {
    path: "/product/:id",
    renderer: (params = {}) => <ProductTabLeft {...params} />,
  },
  {
    path: "/category/:category",
    renderer: (params = {}) => <ShopGridStandard {...params} />,
  },
  {
    path: "/login-register",
    renderer: (params = {}) => <LoginRegister {...params} />,
  },
  {
    path: "/cart",
    renderer: (params = {}) => <Cart {...params} />,
  },
  {
    path: "/wishlist",
    renderer: (params = {}) => <Wishlist {...params} />,
  },
  {
    path: "/compare",
    renderer: (params = {}) => <Compare {...params} />,
  },
  {
    path: "/not-found",
    renderer: (params = {}) => <NotFound {...params} />,
  },
];

export default routes;
