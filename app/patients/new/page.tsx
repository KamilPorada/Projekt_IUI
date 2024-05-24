import React from 'react';
import AddPatientForm from '../../../components/Forms/AddPatientForm';

const NewPatientPage: React.FC = () => {
  return (
    <div>
      <h1>Dodaj Nowego Pacjenta</h1>
      <AddPatientForm />
    </div>
  );
};

export default NewPatientPage;