import { createContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadEmployees = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch employees"
        );
      }

      setEmployees(data.result);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        loading,
        error,
        loadEmployees
      }}
    >

      {children}

    </EmployeeContext.Provider>

  );

};

export default EmployeeContext;