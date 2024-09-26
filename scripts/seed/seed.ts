import mysql from "mysql";

const DATABASE_HOST = "localhost";
const DATABASE_USER = "root";
const DATABASE_PASSWORD = "password";

var connection = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: "app",
});

//connection.connect((err) => {
//  if (err) {
//    return console.error("error connecting: " + err.stack);
//  }
//  console.log("connected as id " + connection.threadId);
//});

function seed() {
  const queries = [
    // Seeding Client table
    `INSERT INTO Client (id, name, address, suburb, postcode, createdAt) 
     VALUES (1, 'John Doe', '123 Main St', 'Downtown', 12345, NOW()), 
            (2, 'Jane Smith', '456 Oak Ave', 'Uptown', 67890, NOW());`,

    // Seeding Inspection table
    `INSERT INTO Inspection (id, created_at, clientId, submitted) 
     VALUES (1, NOW(), 1, FALSE), 
            (2, NOW(), 2, TRUE);`,

    // Seeding Category table
    `INSERT INTO Category (id, name, inspectionId) 
     VALUES (1, 'Building Exterior', 1), 
            (2, 'Building Interior', 1),
            (3, 'Building Exterior', 2),
            (4, 'Building Interior', 2);`,

    // Seeding Item table
    `INSERT INTO Item (id, name, categoryId) 
     VALUES (1, 'Windows', 1), 
            (2, 'Doors', 1), 
            (3, 'Living Room', 2), 
            (4, 'Bedroom', 2),
            (5, 'Windows', 3),
            (6, 'Doors', 3),
            (7, 'Kitchen', 4),
            (8, 'Bathroom', 4);`,

    // Seeding Location table
    `INSERT INTO Location (id, name, itemId) 
     VALUES (1, 'Ceilings', 1), 
            (2, 'Walls', 1), 
            (3, 'Floor', 2), 
            (4, 'Windows', 3), 
            (5, 'Robes', 4),
            (6, 'Ceilings', 5),
            (7, 'Walls', 6),
            (8, 'Windows', 7),
            (9, 'Tiles', 8);`,

    // Seeding Comment table
    `INSERT INTO Comment (id, body, categoryId, locationId) 
     VALUES (1, 'Cracked windows', 1, 1), 
            (2, 'Peeling paint', 2, 2), 
            (3, 'Stained floor', 1, 3), 
            (4, 'Broken lock on window', 2, 4), 
            (5, 'Leaking ceiling', 3, 5);`,

    // Seeding Photo table
    `INSERT INTO Photo (id, url, description, locationId) 
     VALUES (1, 's3://bucket/image1.jpg', 'Window crack photo', 1), 
            (2, 's3://bucket/image2.jpg', 'Paint peeling photo', 2), 
            (3, 's3://bucket/image3.jpg', 'Stained floor photo', 3), 
            (4, 's3://bucket/image4.jpg', 'Window lock photo', 4), 
            (5, 's3://bucket/image5.jpg', 'Ceiling leak photo', 5);`,
  ];

  queries.forEach((query) => {
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        console.log("Query executed successfully:", results);
      }
    });
  });

  connection.end((err) => {
    if (err) {
      console.error("Error closing connection:", err);
    } else {
      console.log("Connection closed.");
    }
  });
}

seed();
