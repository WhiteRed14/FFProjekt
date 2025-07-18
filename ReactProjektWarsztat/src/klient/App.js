import React, { useState, useEffect, useContext, useRef, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';

const UserContext = createContext();

let token = '';

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices([
      { title: 'Diagnostyka komputerowa', description: 'Nowoczesny sprzęt – odczyt błędów, eliminacja problemów.' },
      { title: 'Naprawy mechaniczne', description: 'Silnik, zawieszenie, hamulce – ogarniemy wszystko.' },
      { title: 'Serwis klimatyzacji', description: 'Napełnianie, odgrzybianie, szczelność układu.' },
      { title: 'Czyszczenie wnętrz', description: 'Kompleksowe czyszcznie samochodów, w pakiecie VIP' },
    ]);
  }, []);

  return services;
};

function Heading() {
  return (
    <header>
      <div className="up-logo">
        <h1 className="logo">
          <Link to="/">Piękny <span>wóz</span></Link>
        </h1>
        <nav>
          <ul className="up-menu">
            <li><Link to="/klient/">Start</Link></li>
            <li><Link to="/klient/repairs">Moje naprawy</Link></li>
            <li><Link to="/klient/profile">Mój profil</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function ServiceList({ services }) {
  return (
    <section className="services">
      <div className="container services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  const services = useServices();

  return (
    <>
      <section className="hero">
        <div className="container">
          <h2>Witaj w serwisie Piękny wóz!</h2>
          <p>Zadbamy o Twoje auto – szybko, profesjonalnie<br />i z najlepszą jakością na rynku!</p>
        </div>
      </section>
      <ServiceList services={services} />
    </>
  );
}

function Profile() {
  const { userName } = useContext(UserContext);
  const { userSurname } = useContext(UserContext);
  const { userPhone } = useContext(UserContext);
  const { userEmail } = useContext(UserContext);
  return (
  <div className="profil-container">
    <h1>Twój profil</h1><h2>Witaj, {userName}! To jest Twój profil.</h2>;
        <h1>Twoje dane:</h1>
        <ul>
          <li>Imie: {userName}</li>
          <li>Nazwisko: {userSurname}</li>
          <li>Numer telefonu: {userPhone}</li>
          <li>E-mail: {userEmail}</li>
        </ul>
        <p>Dziękujemy za przestrzeganie regulaminu. Ułatwia nam to świadczenie usług na najwyższym poziomie!</p>
      </div>)
}

function Repairs() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepairs = async () => {
      setLoading(true);
      setError(null);
      try {
        token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5180/api/CarRepair/my', {
          headers: {
            'Authorization': `Bearer ${token}`, // TODO: Replace with real token
          },
        });
        if (!response.ok) throw new Error('Błąd pobierania napraw');
        const data = await response.json();
        //console.log(data);
        setRepairs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepairs();
  }, []);

  if (loading) return <div>Ładowanie napraw...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (repairs.length === 0) return <div>Brak napraw do wyświetlenia.</div>;

  return (
    <div className="repairs-list-container">
      <h2>Lista Twoich napraw</h2>
      <table className="repairs-table">
        <thead>
          <tr>
            <th>Marka</th>
            <th>Model</th>
            <th>Numer rejestracyjny</th>
            <th>Notatka</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
          </tr>
        </thead>
        <tbody>
          {repairs.map((r) => (
            <tr key={r.id}>
              <td>{r.make}</td>
              <td>{r.model}</td>
              <td>{r.plateNumber}</td>
              <td>{r.note}</td>
              <td>{r.startDate || '-'}</td>
              <td>{r.endDate || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewVisit() {
  const formRef = useRef();
  const [form, setForm] = useState({ Marka: '', Model: '', plateNumber: '', Owner: '', Notatka: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formularz dodany:', form);
    setForm({ Marka: '', Model: '', plateNumber: '', Owner: '', Notatka: '' });
    formRef.current.reset();
  };

  return (
    <div className="new-visit-container">
      <h1>Aby umówić wizyte proszę uzupełnić formularz</h1>
      <form className="add-car-form" onSubmit={handleSubmit} ref={formRef}>
        {['Marka', 'Model', 'Numer rejestracyjny', 'Właściciel', 'Notatka'].map(field => (
          <label key={field}>{field}: <input required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} /></label>
        ))}
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-wrapper">
        <ul>
          <li><Link to="/regulamin">Regulamin klienta</Link></li>
        </ul>
        <ul className="footer-links">
          <li><Link to="/kontakt">Kontakt</Link></li>
        </ul>
      </div>
    </footer>
  );
}

function Regulamin() {
  return (
    <section className="kontakt-section">
      <div className="container">
        <h1>Regulamin klienta</h1>
        <p>Zapoznaj się z zasadami korzystania z naszych usług:</p>
        <ul>
          <li>Umówione wizyty prosimy odwoływać z 24h wyprzedzeniem.</li>
          <li>Gwarancja na wykonaną usługę wynosi 6 miesięcy.</li>
          <li>Nie ponosimy odpowiedzialności za rzeczy pozostawione w pojeździe.</li>
          <li>Płatność możliwa gotówką lub kartą po wykonaniu usługi.</li>
        </ul>
        <p>Dziękujemy za przestrzeganie regulaminu. Ułatwia nam to świadczenie usług na najwyższym poziomie!</p>
      </div>
    </section>
  );
}

function Kontakt() {
  return (
    <section className="kontakt-section">
      <div className="container">
        <h1>Dane kontaktowe warsztatu</h1>
        <p>Masz pytania? Skontaktuj się z nami:</p>

        <ul>
          <li><strong>Adres:</strong> ul. Mechaników 12, 00-001 Warszawa</li>
          <li><strong>Telefon:</strong> +48 123 456 789</li>
          <li><strong>Email:</strong> kontakt@pieknywoz.pl</li>
          <li><strong>Godziny otwarcia:</strong> Pon-Pt 8:00–18:00</li>
        </ul>

        <p>Zapraszamy również do odwiedzenia naszego warsztatu osobiście lub kontaktu za pośrednictwem formularza online!</p>
      </div>
    </section>
  );
}
function NotFound() {
  return <h2>404 - Nie znaleziono</h2>;
}

function App() {
  const [userName] = useState('Jan');
  const [userSurname] = useState('Kowalski');
  const [userPhone] = useState('123 456 789');
  const [userEmail] = useState('jan@example.com');

  return (
    <UserContext.Provider value={{ userName, userSurname, userPhone, userEmail }}>
      <div className="App">
        <Heading />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/new" element={<NewVisit />} />
            <Route path="/regulamin" element={<Regulamin />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;