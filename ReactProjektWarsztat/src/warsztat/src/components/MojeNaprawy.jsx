import React, { useState, useEffect, useCallback, useMemo, useReducer } from "react";
import { Link } from "react-router-dom";
import { getCars, addCar, removeFromCar, updateCar } from "../api/apiCars";

export default function MojeNaprawy() {
  const [showForm, setShowForm] = useState(false);
  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET":
        return { Make: "", Model: "", PlateNumber: "", OwnerId: "", Note: "", StartDate: "", EndDate: "" };
      default:
        return state;
    }
  };
  const [formData, dispatchForm] = useReducer(formReducer, {
    Make: "",
    Model: "",
    PlateNumber: "",
    OwnerId: "",
    Note: "",
    StartDate: "",
    EndDate: ""
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Make: "",
    Model: "",
    PlateNumber: "",
    OwnerId: "",
    Note: "",
    StartDate: "",
    EndDate: ""
  });
  const [filterActive, setFilterActive] = useState(true);

  const displayedCars = useMemo(() => {
    if (filterActive) {
      return cars.filter(car => !car.endDate);
    }
    return cars;
  }, [cars, filterActive]);

  async function fetchCars() {
    setLoading(true);
    const data = await getCars();
    if (Array.isArray(data)) {
      setCars(data);
      setError(null);
    } else {
      setError(data.message || "Błąd podczas pobierania danych");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    dispatchForm({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const carToAdd = {
        make: formData.Make,
        model: formData.Model,
        plateNumber: formData.PlateNumber,
        ownerId: formData.OwnerId ? parseInt(formData.OwnerId) : null,
        note: formData.Note,
        startDate: formData.StartDate || null,
        endDate: formData.EndDate || null
      };
      const result = await addCar(carToAdd);
      if (result.status === "success") {
        setSuccess("Auto dodane poprawnie!");
        setShowForm(false);
        dispatchForm({ type: "RESET" });
        fetchCars();
      } else {
        setError(result.message || "Błąd przy dodawaniu auta");
      }
    } catch (err) {
      setError("Błąd przy dodawaniu auta");
    }
  }, [formData, addCar, fetchCars]);

  const handleDelete = async (carId) => {
    setError(null);
    setSuccess(null);
    const result = await removeFromCar(carId);
    if (result.status === "success") {
      setSuccess(result.message);
      fetchCars();
    } else {
      setError(result.message || "Błąd przy usuwaniu auta");
    }
  };

  const handleEdit = (car) => {
    setEditCar(car);
    setEditFormData({
      Make: car.make,
      Model: car.model,
      PlateNumber: car.plateNumber,
      OwnerId: car.ownerId,
      Note: car.note,
      StartDate: car.startDate ? car.startDate.substring(0, 10) : "",
      EndDate: car.endDate ? car.endDate.substring(0, 10) : ""
    });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const updatedCar = {
      make: editFormData.Make,
      model: editFormData.Model,
      plateNumber: editFormData.PlateNumber,
      ownerId: editFormData.OwnerId ? parseInt(editFormData.OwnerId) : null,
      note: editFormData.Note,
      startDate: editFormData.StartDate || null,
      endDate: editFormData.EndDate || null
    };
    const result = await updateCar(editCar.id, updatedCar);
    if (result.status === "success") {
      setSuccess("Auto zaktualizowane poprawnie!");
      setEditCar(null);
      fetchCars();
    } else {
      setError(result.message || "Błąd przy edycji auta");
    }
  };

  const handleShowDetails = (car) => {
    alert(`Szczegóły auta:\nMarka: ${car.make}\nModel: ${car.model}\nRejestracja: ${car.plateNumber}\nWłaściciel ID: ${car.ownerId}\nNotatka: ${car.note}\nData rozpoczęcia: ${car.startDate ? car.startDate.substring(0, 10) : '-'}\nData zakończenia: ${car.endDate ? car.endDate.substring(0, 10) : '-'}`);
  };

  return (
    <>
      <header>
        <div className="up-logo">
          <h1 className="logo">
            <Link to="/">Piękny <span>wóz</span></Link>
          </h1>
          <nav>
            <ul className="up-menu">
            </ul>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          {loading ? (
            <p>Ładowanie samochodów...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : displayedCars.length === 0 ? (
            <p>Brak samochodów do wyświetlenia.</p>
          ) : (
            <div className="cars-container">
              {displayedCars.map(car => (
                <div className="car-details" key={car.id}>
                  <div className="car-info">
                    <strong>{car.make} {car.model}</strong><br />
                    <span>Rejestracja: {car.plateNumber}</span><br />
                    <span>Właściciel ID: {car.ownerId}</span><br />
                    <span>Notatka: {car.note}</span><br />
                    <span>Data rozpoczęcia: {car.startDate ? car.startDate.substring(0, 10) : '-'}</span><br />
                    <span>Data zakończenia: {car.endDate ? car.endDate.substring(0, 10) : '-'}</span>
                  </div>
                  <div className="buttons-container">
                    <button onClick={() => handleShowDetails(car)} title="Pokaż szczegóły">Szczegóły</button>
                    <button onClick={() => handleEdit(car)} title="Edytuj">Edytuj</button>
                    <button onClick={() => handleDelete(car.id)} title="Usuń">Usuń</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', marginLeft: '2rem', marginTop: '1rem' }}>
        <button
          onClick={() => setFilterActive(f => !f)}
          style={{ marginBottom: '1rem', padding: '0.5rem 1.5rem', minWidth: '120px', minHeight: '40px', fontSize: '1.1rem', width: 'auto', height: 'auto', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {filterActive ? <span title="Pokaż wszystkie auta">Filtr</span> : <span title="Pokaż tylko auta bez daty zakończenia">Wszystkie</span>}
        </button>
        <button className="add-car-button" onClick={() => setShowForm(v => !v)}>+</button>
      </div>
      {showForm && (
        <div className="add-car">
          <form className="add-car-form" onSubmit={handleSubmit}>
            <label>Marka: <input name="Make" value={formData.Make} onChange={handleInputChange} required /></label><br />
            <label>Model: <input name="Model" value={formData.Model} onChange={handleInputChange} required /></label><br />
            <label>Numer rejestracyjny: <input name="PlateNumber" value={formData.PlateNumber} onChange={handleInputChange} required /></label><br />
            <label>Właściciel ID: <input name="OwnerId" value={formData.OwnerId} onChange={handleInputChange} required type="number" min="1" /></label><br />
            <label>Notatka: <input name="Note" value={formData.Note} onChange={handleInputChange} /></label><br />
            <label>Data rozpoczęcia: <input name="StartDate" value={formData.StartDate} onChange={handleInputChange} type="date" /></label><br />
            <label>Data zakończenia: <input name="EndDate" value={formData.EndDate} onChange={handleInputChange} type="date" /></label><br />
            <button type="submit">Dodaj</button>
            <button type="button" className="cancel-add-car" onClick={() => setShowForm(false)}>Anuluj</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )}
      {editCar && (
        <div className="add-car">
          <form className="add-car-form" onSubmit={handleEditSubmit}>
            <label>Marka: <input name="Make" value={editFormData.Make} onChange={handleEditInputChange} required /></label><br />
            <label>Model: <input name="Model" value={editFormData.Model} onChange={handleEditInputChange} required /></label><br />
            <label>Numer rejestracyjny: <input name="PlateNumber" value={editFormData.PlateNumber} onChange={handleEditInputChange} required /></label><br />
            <label>Właściciel ID: <input name="OwnerId" value={editFormData.OwnerId} onChange={handleEditInputChange} required type="number" min="1" /></label><br />
            <label>Notatka: <input name="Note" value={editFormData.Note} onChange={handleEditInputChange} /></label><br />
            <label>Data rozpoczęcia: <input name="StartDate" value={editFormData.StartDate} onChange={handleEditInputChange} type="date" /></label><br />
            <label>Data zakończenia: <input name="EndDate" value={editFormData.EndDate} onChange={handleEditInputChange} type="date" /></label><br />
            <button type="submit">Zapisz zmiany</button>
            <button type="button" className="cancel-add-car" onClick={() => setEditCar(null)}>Anuluj</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )}
    </>
  );
} 