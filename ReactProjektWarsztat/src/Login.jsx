import React from 'react';

export default function Login({ setUserType }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
      <h2>Wybierz rodzaj użytkownika</h2>
      <button style={{ margin: 10, padding: '10px 30px' }} onClick={() => setUserType('warsztat')}>Jestem warsztatem</button>
      <button style={{ margin: 10, padding: '10px 30px' }} onClick={() => setUserType('klient')}>Jestem klientem</button>
    </div>
  );
} 