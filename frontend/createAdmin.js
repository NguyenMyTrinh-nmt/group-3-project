const mongoose = require("mongoose");

async function createAdmin() {
  await mongoose.connect("mongodb://localhost:27017/admin");

  const adminExists = await mongoose.connection.db
    .collection("system.users")
    .findOne({ user: "admin" });

  if (!adminExists) {
    await mongoose.connection.db.command({
      createUser: "Quỳnh",
      pwd: "010115",
      roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" }
      ]
    });
    console.log("Admin created!");
  } else {
    console.log("Admin already exists.");
  }

  mongoose.disconnect();
}

createAdmin();