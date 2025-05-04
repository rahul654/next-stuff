'use client'
import Head from "next/head";
import React from "react";
import PrivateRoute from "../../hoc/PrivateRoute";
import { ROLE } from "../../constants/roles";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Rahul's solution login</title>
      </Head>
      <div>
        auth example
      </div>
    </>
  );
};

export default function Home() {
  return PrivateRoute({
    WrappedComponent: <AuthPage />, // Pass the component here
    navigateToRouteIfNotAuthenticated: '/',
    roles: [ROLE.user]
  });
}