import React from "react";
import { Link } from "react-router-dom";

export default function StronaGlowna() {
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
          <h2>Witaj w warsztacie Piękny wóz!</h2>
          <p>
            Zadbamy o Twoje auto – szybko, profesjonalnie <br />
            i z najlepszą jakością na rynku!
          </p>
          <Link to="/nowe-zlecenie" className="btn-primary">Umów nową wizytę</Link>
        </div>
      </section>
      <section className="services">
        <div className="container services-grid">
          <div className="service-card">
            <h3>Diagnostyka komputerowa</h3>
            <p>Nowoczesny sprzęt – odczyt błędów, eliminacja problemów.</p>
          </div>
          <div className="service-card">
            <h3>Naprawy mechaniczne</h3>
            <p>Silnik, zawieszenie, hamulce – ogarniemy wszystko.</p>
          </div>
          <div className="service-card">
            <h3>Serwis klimatyzacji</h3>
            <p>Napełnianie, odgrzybianie, szczelność układu.</p>
          </div>
          <div className="service-card">
            <h3>Diagnostyka komputerowa</h3>
            <p>Nowoczesny sprzęt – odczyt błędów, eliminacja problemów.</p>
          </div>
        </div>
      </section>
      <footer>
        <div className="container footer-wrapper">
          <li><Link className="regulamin" to="/regulamin">Regulamin warszatu</Link></li>
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