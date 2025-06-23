import React from "react";
import { Link } from "react-router-dom";

export default function NoweZlecenie() {
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
          <h2>Nowe zlecenie</h2>
          <h1 className="tekst-1">Aby dodać naprawę naciśnij + w prawym dolnym rogu</h1>
          <div className="cars-container"></div>
          <button id="add-car-button" className="add-car-button">+</button>
          <div id="add-car" className="add-car hidden">
            <form id="add-car-form" className="add-car-form">
              <label>Marka: <input name="Make" required /></label><br />
              <label>Model: <input name="Model" required /></label><br />
              <label>Numer rejestracyjny: <input name="PlateNumber" required /></label><br />
              <label>Właściciel: <input name="Owner" required /></label><br />
              <label>Notatka: <input name="Note" /></label><br />
              <button type="submit">Dodaj</button>
              <button type="button" id="cancel-add-car" className="cancel-add-car">Anuluj</button>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <div className="container footer-wrapper">
          <li><Link className="regulamin" to="/regulamin">Regulamin warsztatu</Link></li>
          <nav>
            <ul className="footer-links">
              <li><a href="kontakt.html">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
} 