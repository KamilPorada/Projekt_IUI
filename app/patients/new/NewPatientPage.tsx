import React, { useState } from 'react';
import AddPatientForm, { AddPatientFormData } from '../../../components/Forms/AddPatientForm';

const NewPatientPage: React.FC = () => {

  const [newPatientData, setNewPatientData] = useState<AddPatientFormData | null>(null);


  const handleFormSubmit = (formData: AddPatientFormData) => {
    setNewPatientData(formData);
 
  };

  return (
    <div>
      <h1>Dodaj Nowego Pacjenta</h1>
      {}
      <AddPatientForm onSubmit={handleFormSubmit} />
      {}
      {newPatientData && (
        <div>
          <h2>Dane nowego pacjenta:</h2>
          <p>Imię: {newPatientData.firstName}</p>
          <p>Nazwisko: {newPatientData.lastName}</p>
          <p>PESEL: {newPatientData.pesel}</p>
          <p>Płeć: {newPatientData.gender}</p>
          <p>Data urodzenia: {newPatientData.birthDate}</p>
          {}
        </div>
      )}
    </div>
  );
};

export default NewPatientPage;

export default NewPatientPage;