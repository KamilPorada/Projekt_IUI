'use client'
import React, { useState } from 'react';

interface AddPatientFormProps {
  handleSubmit: (patient: PatientData) => Promise<void>;
}

interface PatientData {
  firstName: string;
  lastName: string;
  pesel: string;
  gender: string;
  birthDate: string;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ handleSubmit }) => {
  const [patient, setPatient] = useState<PatientData>({
    firstName: '',
    lastName: '',
    pesel: '',
    gender: '',
    birthDate: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await handleSubmit(patient);
      setSubmitting(false);
      setPatient({
        firstName: '',
        lastName: '',
        pesel: '',
        gender: '',
        birthDate: '',
      });
      setError('');
    } catch (error) {
      setSubmitting(false);
      setError('Błąd podczas dodawania pacjenta.');
    }
  };

  return (
    <section className="w-full mt-3 flex flex-col items-center text-black">
      <h1 className="text-2xl font-semibold">Dodaj nowego pacjenta</h1>
      <form onSubmit={handleFormSubmit} className="mt-3 w-full max-w-2xl flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="font-semibold text-base lg:text-lg text-secondaryColor">Imię:</span>
          <input
            type="text"
            name="firstName"
            value={patient.firstName}
            onChange={handleChange}
            className="px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
            required
          />
        </label>
        <label className="flex flex-col">
  <span className="font-semibold text-base lg:text-lg text-secondaryColor">Nazwisko:</span>
  <input
    type="text"
    name="lastName"
    value={patient.lastName}
    onChange={handleChange}
    className="px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
    required
  />
</label>
<label className="flex flex-col">
  <span className="font-semibold text-base lg:text-lg text-secondaryColor">PESEL:</span>
  <input
    type="text"
    name="pesel"
    value={patient.pesel}
    onChange={handleChange}
    className="px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
    required
  />
</label>
<label className="flex flex-col">
  <span className="font-semibold text-base lg:text-lg text-secondaryColor">Płeć:</span>
  <select
    name="gender"
    value={patient.gender}
    onChange={handleChange}
    className="px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
    required
  >
    <option value="">Wybierz</option>
    <option value="male">Mężczyzna</option>
    <option value="female">Kobieta</option>
  </select>
</label>
<label className="flex flex-col">
  <span className="font-semibold text-base lg:text-lg text-secondaryColor">Data urodzenia:</span>
  <input
    type="date"
    name="birthDate"
    value={patient.birthDate}
    onChange={handleChange}
    className="px-1 py-px ring-1 ring-zinc-400 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
    required
  />
</label>
        <p className="mt-1 text-center font-semibold text-red-500">{error}</p>
        <div className="flex flex-row justify-center text-white">
          <button type="button" className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded" onClick={() => setPatient({
            firstName: '',
            lastName: '',
            pesel: '',
            gender: '',
            birthDate: '',
          })}>
            Anuluj
          </button>
          <button type="submit" disabled={submitting} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
            {submitting ? 'Dodawanie...' : 'Dodaj'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPatientForm;
