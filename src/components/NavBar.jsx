import { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { Link } from "react-router-dom";
import { TopBar } from "../components";
import { logoEtherscanDark, logoEtherscanLight } from "../assets";
import { NavBarLinks } from "./DataLinks/constants";
// import { getETHPrice } from "../alchemy-core";

const NavBar = () => {
  return (
    <div className="">
      <TopBar />
      <div className="border-[0.5px] border-secondaryBgLight dark:border-secondaryBgDark" />
      <div className="mx-5 block justify-between md:flex">
        <section className="mx-0 my-auto flex w-auto">
          <Link to="/">
            <img
              src={logoEtherscanLight}
              alt="etherscan logo"
              className="hidden h-8 dark:block"
            />
            <img
              src={logoEtherscanDark}
              alt="etherscan logo"
              className="block h-8 dark:hidden"
            />
          </Link>
        </section>
        <section className="hidden w-auto sm:flex lg:ml-20">
          <div className="w-full px-0">
            <ul className="flex flex-row">
              {Object.keys(NavBarLinks).map((title) => (
                <li className="my-2 ml-5 text-base" key={title}>
                  <Link to={NavBarLinks[title]}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="my-0.5 border-[0.5px] border-secondaryBgLight shadow-lg shadow-gray-100/80 dark:border-secondaryBgDark" />
    </div>
  );
};

export default NavBar;
