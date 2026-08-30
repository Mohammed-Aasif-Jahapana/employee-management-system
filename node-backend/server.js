const express = require("express");
const cors = require("cors");
const app = express();
const Employee = require("./models/Employee");
const User = require('./models/User')
const connectDB = require("./config/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "my_super_secret_key";


app.use(cors());
app.use(express.json());
// Connect MongoDB
connectDB();


const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(
  "my_super_secret_key"
);



//just to insert some dummy names in record to display
app.post("/api/employees/dummy", async (req, res) => {

  try {

    const employees = [
      {
        name: "Aarav Sharma",
        email: "aarav@example.com",
        department: "IT",
        designation: "Frontend Developer",
        salary: 45000
      },
      {
        name: "Priya Nair",
        email: "priya@example.com",
        department: "HR",
        designation: "HR Executive",
        salary: 35000
      },
      {
        name: "Rahul Kumar",
        email: "rahul@example.com",
        department: "IT",
        designation: "Backend Developer",
        salary: 55000
      },
      {
        name: "Sneha Reddy",
        email: "sneha@example.com",
        department: "Finance",
        designation: "Financial Analyst",
        salary: 48000
      },
      {
        name: "Arjun Mehta",
        email: "arjun@example.com",
        department: "Marketing",
        designation: "Marketing Executive",
        salary: 32000
      },
      {
        name: "Kavya Iyer",
        email: "kavya@example.com",
        department: "IT",
        designation: "UI Developer",
        salary: 42000
      },
      {
        name: "Mohammed Imran",
        email: "imran@example.com",
        department: "IT",
        designation: "Software Engineer",
        salary: 65000
      },
      {
        name: "Divya Menon",
        email: "divya@example.com",
        department: "HR",
        designation: "HR Manager",
        salary: 60000
      },
      {
        name: "Vikram Singh",
        email: "vikram@example.com",
        department: "Finance",
        designation: "Accountant",
        salary: 38000
      },
      {
        name: "Neha Gupta",
        email: "neha@example.com",
        department: "Marketing",
        designation: "Digital Marketing Specialist",
        salary: 47000
      },
      {
        name: "Rohit Verma",
        email: "rohit@example.com",
        department: "IT",
        designation: "Full Stack Developer",
        salary: 75000
      },
      {
        name: "Anjali Rao",
        email: "anjali@example.com",
        department: "Finance",
        designation: "Finance Manager",
        salary: 70000
      },
      {
        name: "Sanjay Patel",
        email: "sanjay@example.com",
        department: "IT",
        designation: "QA Engineer",
        salary: 40000
      },
      {
        name: "Meera Krishnan",
        email: "meera@example.com",
        department: "HR",
        designation: "Recruiter",
        salary: 33000
      },
      {
        name: "Aditya Jain",
        email: "aditya@example.com",
        department: "Marketing",
        designation: "Marketing Manager",
        salary: 62000
      }
    ];

    const result = await Employee.insertMany(employees);

    res.status(201).json({
      message: "Dummy employees inserted successfully",
      result
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to insert employees",
      error: error.message
    });

  }

});


//To add employee
app.post("/api/employees", async (req, res) => {

  try {

    const {
      name,
      email,
      department,
      designation,
      salary
    } = req.body;


    // 1. Required fields
    if (!name || !email || !department || !designation || !salary) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }


    // 2. Salary validation
    if (isNaN(Number(salary)) || Number(salary) <= 0) {
      return res.status(400).json({
        message: "Salary must be a valid positive number"
      });
    }


    // 3. Email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

    // 4. Duplicate employee
    const existingEmployee = await Employee.findOne({
      email: req.body.email
    });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee already exists"
      });
    }

    const employee = new Employee({
      name,
      email,
      department,
      designation,
      salary
    });

    await employee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to create employee",
      error: error.message
    });

  }

});

//to get all employees and filter 
app.get("/api/employees", async (req, res) => {

  try {

    const query = {};

    if (req.query.department) {
      query.department = req.query.department;
    }

    if (req.query.minSalary) {
      query.salary = {
        $gte: Number(req.query.minSalary)
      }
    }

    if (req.query.search) {

      query.$or = [
        {
          name: {
            $regex: req.query.search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: req.query.search,
            $options: "i"
          }
        }
      ];

    }

    const result = await Employee.find(query);

    res.status(200).json({
      message: "Employees fetched successfully",
      result
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message
    });

  }

});

//for edit employee - get the particular id details
app.get("/api/employees/:id", async (req, res) => {

  try {

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee fetched successfully",
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message
    });

  }

});

//to update particular employee
app.put("/api/employees/:id", async (req, res) => {

  try {

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        designation: req.body.designation,
        salary: req.body.salary
      },
      {
        new: true
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update employee",
      error: error.message
    });

  }

});

app.delete("/api/employees/:id", async (req, res) => {

  try {

    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message
    });

  }

});





/////////////////////////////////////// USERS ////////////////////////////////////////////////////////

//register
app.post("/api/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      confirmPassword
    } = req.body;


    // Required fields
    if (!name || !email || !password || !confirmPassword) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }


    // Password match
    if (password !== confirmPassword) {

      return res.status(400).json({
        message: "Passwords do not match"
      });

    }


    // Duplicate email
    const existingUser = await User.findOne({
      email
    });


    if (existingUser) {

      return res.status(409).json({
        message: "Email already exists"
      });

    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });


    await user.save();


    res.status(201).json({
      message: "User registered successfully",
      user
    });


  } catch (error) {

    res.status(500).json({
      message: "Failed to register user",
      error: error.message
    });

  }

});

//login
app.post("/api/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }


    // 1. Find user only by email
    const user = await User.findOne({
      email
    });


    // 2. If email not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }


    // 3. Compare entered password with hashed password in DB
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );


    // 4. Password wrong
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    email: user.email
  },
  JWT_SECRET,
  {
    expiresIn: "1h"
  }
);


    // 5. Login success
    res.status(200).json({
      message: "Login successful",
token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });


  } catch (error) {

    res.status(500).json({
      message: "Failed to login",
      error: error.message
    });

  }

});


//OAuth google login
app.post("/api/google-login", async (req, res) => {

  try {

    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: "522766044619-gpbq6vkr0qlgaaidai0qtdkh30t9ebh5.apps.googleusercontent.com"
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({
      email: payload.email
    });

    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub
      });

      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      JWT_SECRET,
      {
        expiresIn: "20m"
      }
    );

    res.status(200).json({
      message: "Google login successful",
      token,
      user
    });

  } catch (error) {

    res.status(401).json({
      message: "Google authentication failed",
      error: error.message
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


 
 