'use client'
import React from 'react';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  pesel: string;
  gender: string;
  birthDate: string;
}

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
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
        {patients.map((patient) => (
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
  );
};

export default PatientTable;