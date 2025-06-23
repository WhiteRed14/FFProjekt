import React from "react";
import { Link } from "react-router-dom";

export default function Regulamin() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, margin: 40, backgroundColor: '#f9f9f9', color: '#333' }}>
      <Link to="/">Powrót do strony głównej</Link>
      <h1 style={{ color: '#222' }}>Regulamin Warsztatu Samochodowego</h1>
      <h2 style={{ color: '#222' }}>1. Postanowienia ogólne</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Regulamin określa zasady świadczenia usług przez warsztat samochodowy "Piękny wóz".</li>
        <li>Klient zobowiązany jest do zapoznania się z regulaminem przed oddaniem pojazdu do naprawy.</li>
      </ul>
      <h2 style={{ color: '#222' }}>2. Przyjęcie pojazdu do naprawy</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Pojazd przyjmowany jest na podstawie zgłoszenia ustnego lub pisemnego z opisem usterki.</li>
        <li>Klient otrzymuje dokument przyjęcia zawierający opis pojazdu, stan licznika, zakres zleconych prac.</li>
      </ul>
      <h2 style={{ color: '#222' }}>3. Wycena i zakres usług</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Wycena naprawy dokonywana jest wstępnie przy przyjęciu pojazdu.</li>
        <li>W przypadku wykrycia dodatkowych usterek klient jest informowany o kosztach przed ich usunięciem.</li>
      </ul>
      <h2 style={{ color: '#222' }}>4. Odpowiedzialność i gwarancja</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Warsztat ponosi odpowiedzialność za szkody powstałe z winy pracowników podczas naprawy.</li>
        <li>Na wykonane usługi udzielana jest gwarancja na okres 6 miesięcy.</li>
      </ul>
      <h2 style={{ color: '#222' }}>5. Odbiór pojazdu</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Odbiór pojazdu możliwy jest po uregulowaniu należności za wykonane usługi.</li>
        <li>W przypadku nieodebrania pojazdu w ciągu 7 dni od zakończenia naprawy, warsztat nalicza opłatę za postój.</li>
      </ul>
      <h2 style={{ color: '#222' }}>6. Reklamacje</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Reklamacje należy zgłaszać niezwłocznie po wykryciu wady.</li>
        <li>Reklamacja zostanie rozpatrzona w terminie 14 dni roboczych od daty zgłoszenia.</li>
      </ul>
      <h2 style={{ color: '#222' }}>7. Postanowienia końcowe</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: 20 }}>
        <li>Warsztat zastrzega sobie prawo do zmiany regulaminu.</li>
        <li>W sprawach nieuregulowanych regulaminem obowiązują przepisy Kodeksu Cywilnego.</li>
      </ul>
    </div>
  );
} 