import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../redux/employeeSlice";


const EmployeeReduxTest = () => {

  const dispatch = useDispatch();

  const employees = useSelector((state) => {
    return state.employeeStore.employeeSliceArray;
  });


  const handleAddEmployee = () => {

    dispatch(
      addEmployee({
        name: "John",
        email: "john@gmail.com",
        department: "HR"
      })
    );

  };


  return (
    <div>

      <h1>Redux Employees</h1>

      <button onClick={handleAddEmployee}>
        Click
      </button>


      {employees.map((employee, index) => (

        <div key={index}>

          <h3>{employee.name}</h3>

          <p>{employee.email}</p>

          <p>{employee.department}</p>

        </div>

      ))}

    </div>
  );

};

export default EmployeeReduxTest;