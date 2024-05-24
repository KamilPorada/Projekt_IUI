'use client'
import React from 'react';

const PatientsListPage: React.FC = () => {

  const patients = [
    { id: 1, firstName: 'Jan', lastName: 'Kowalski', pesel: '12345678901', gender: 'male', birthDate: '1990-01-01' },
    { id: 2, firstName: 'Anna', lastName: 'Nowak', pesel: '23456789012', gender: 'female', birthDate: '1995-05-15' },

  ];

  return (
    <div>
      <h1>Lista pacjentów</h1>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>PESEL</th>
            <th>Płeć</th>
            <th>Data urodzenia</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.pesel}</td>
              <td>{patient.gender}</td>
              <td>{patient.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsListPage;