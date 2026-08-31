import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";


export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",

  async () => {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/employees`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch employees"
      );
    }

    return data.result;

  }
);


const initialState = {

  employeeSliceArray: [],

  loading: false,

  error: ""

};


const employeeSlice = createSlice({

  name: "employee",

  initialState,

  reducers: {},


  extraReducers: (builder) => {


    // API STARTED
    builder.addCase(
      fetchEmployees.pending,

      (state) => {

        state.loading = true;

        state.error = "";

      }
    );


    // API SUCCESS
    builder.addCase(
      fetchEmployees.fulfilled,

      (state, action) => {

        state.loading = false;

        state.employeeSliceArray =
          action.payload;

      }
    );


    // API FAILED
    builder.addCase(
      fetchEmployees.rejected,

      (state, action) => {

        state.loading = false;

        state.error =
          action.error.message;

      }
    );

  }

});


export default employeeSlice.reducer;