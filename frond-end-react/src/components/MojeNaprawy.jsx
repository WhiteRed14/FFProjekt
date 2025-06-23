import React from "react";
import { Link } from "react-router-dom";

export default function MojeNaprawy() {
  return (
    <>
      <header>
        <div className="up-logo">
          <h1 className="logo">Piękny <span>wóz</span></h1>
          <nav>
            <ul className="up-menu">
              <li><Link to="/">Start</Link></li>
              <li><Link to="/moje-naprawy">Moje naprawy</Link></li>
              <li><Link to="/nowe-zlecenie">Nowa wizyta</Link></li>
              <li><a href="blog.js">Blog</a></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Tu dodaj dalszą logikę lub widok napraw */}
    </>
  );
} 