import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import Route from "./route";
import ErrorWrapper from "./components/errorwrapper";

const App = () => {
  return (
    <ErrorWrapper>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </ErrorWrapper>
  );
};

export default App;
