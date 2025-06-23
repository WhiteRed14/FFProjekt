import React from "react";
import { Link } from "react-router-dom";

export default function Regulamin() {
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
          <h2>Regulamin Warsztatu Samochodowego</h2>
          <h2>1. Postanowienia ogólne</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Regulamin określa zasady świadczenia usług przez warsztat samochodowy "Piękny wóz".</li>
            <li>Klient zobowiązany jest do zapoznania się z regulaminem przed oddaniem pojazdu do naprawy.</li>
          </ul>
          <h2>2. Przyjęcie pojazdu do naprawy</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Pojazd przyjmowany jest na podstawie zgłoszenia ustnego lub pisemnego z opisem usterki.</li>
            <li>Klient otrzymuje dokument przyjęcia zawierający opis pojazdu, stan licznika, zakres zleconych prac.</li>
          </ul>
          <h2>3. Wycena i zakres usług</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Wycena naprawy dokonywana jest wstępnie przy przyjęciu pojazdu.</li>
            <li>W przypadku wykrycia dodatkowych usterek klient jest informowany o kosztach przed ich usunięciem.</li>
          </ul>
          <h2>4. Odpowiedzialność i gwarancja</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Warsztat ponosi odpowiedzialność za szkody powstałe z winy pracowników podczas naprawy.</li>
            <li>Na wykonane usługi udzielana jest gwarancja na okres 6 miesięcy.</li>
          </ul>
          <h2>5. Odbiór pojazdu</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Odbiór pojazdu możliwy jest po uregulowaniu należności za wykonane usługi.</li>
            <li>W przypadku nieodebrania pojazdu w ciągu 7 dni od zakończenia naprawy, warsztat nalicza opłatę za postój.</li>
          </ul>
          <h2>6. Reklamacje</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Reklamacje należy zgłaszać niezwłocznie po wykryciu wady.</li>
            <li>Reklamacja zostanie rozpatrzona w terminie 14 dni roboczych od daty zgłoszenia.</li>
          </ul>
          <h2>7. Postanowienia końcowe</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
            <li>Warsztat zastrzega sobie prawo do zmiany regulaminu.</li>
            <li>W sprawach nieuregulowanych regulaminem obowiązują przepisy Kodeksu Cywilnego.</li>
          </ul>
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