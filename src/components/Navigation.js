import React from "react";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <div>
      <nav id="nav">
        <ul id="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li id="new">
            <a href="/new">New List</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
