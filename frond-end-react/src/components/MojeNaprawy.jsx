import React from "react";
import { Link } from "react-router-dom";

export default function MojeNaprawy() {
  return (
    <>
      <header>
        <div className="up-logo">
          <h1 className="logo">
            <Link to="/">Piękny <span>wóz</span></Link>
          </h1>
          <nav>
            <ul className="up-menu">
              <li><Link to="/">Start</Link></li>
              <li><Link to="/moje-naprawy">Moje naprawy</Link></li>
              <li><Link to="/nowe-zlecenie">Nowa wizyta</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <h2>Moje naprawy</h2>
          {/* Tu dodaj dalszą logikę lub widok napraw */}
        </div>
      </section>
    </>
  );
} 