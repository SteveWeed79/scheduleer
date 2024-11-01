const bcrypt = require("bcrypt");
const db = require("./config/db"); // Ensure this path is correct
const User = require("./models/User"); // Ensure this path is correct

const seedDatabase = async () => {
  try {
    // Hash admin password
    const adminPassword = await bcrypt.hash("steveweed79", 10);
    await User.create({
      first_name: "Steve",
      last_name: "Weed",
      email: "steveweed1979@gmail.com",
      password: adminPassword,
      phone: null,
      role: "admin",
    });
    console.log("Admin user created.");

    // Create 10 employees
    for (let i = 1; i <= 10; i++) {
      const employeePassword = await bcrypt.hash(`employee_password_${i}`, 10);
      await User.create({
        first_name: `Employee${i}`,
        last_name: `LastName${i}`,
        email: `employee${i}@example.com`,
        password: employeePassword,
        phone: null,
        role: "employee",
      });
    }
    console.log("10 employees created.");

    // Create 100 customers
    for (let i = 1; i <= 100; i++) {
      const customerPassword = await bcrypt.hash(`customer_password_${i}`, 10);
      await User.create({
        first_name: `Customer${i}`,
        last_name: `LastName${i}`,
        email: `customer${i}@example.com`,
        password: customerPassword,
        phone: null,
        role: "customer",
      });
    }
    console.log("100 customers created.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    db.end(); // Close the database connection
  }
};

// Execute the seed function
seedDatabase();
