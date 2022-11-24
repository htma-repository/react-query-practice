import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="container mx-auto flex flex-col gap-y-6 px-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
