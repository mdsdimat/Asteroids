import React from 'react';

import ProfileForm from "./components/ProfileForm";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

const App: React.FC = () => {
    return (
      <>
        <ProfileForm/>
        <RegistrationForm />
      </>
    )
}

export default App;
