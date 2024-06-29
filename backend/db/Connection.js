const mysql = require("mysql");

let connection;

function handleDisconnect() {
    // connection = mysql.createConnection({
    //   host: 'bfvmzo0vegcvtagpl21e-mysql.services.clever-cloud.com',
    //   user: 'uads6v4rtzq4ggvj',
    //   password: 'GV6o9sY2KKUWdLALhFXX',
    //   database: 'bfvmzo0vegcvtagpl21e',
    //   port: '3306',
    //   multipleStatements: true
    // });
        connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'batal-masr',
      port: '3306',
      multipleStatements: true
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database:", err);
        setTimeout(handleDisconnect, 10000); // Attempt to reconnect after 10 seconds
      } else {
        console.log("DB CONNECTED");
      }
    });

    connection.on("error", function (err) {
      console.error("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        setTimeout(handleDisconnect, 10000); // Attempt to reconnect after 10 seconds
      } else {
        throw err;
      }
    });
    
    // Add this event handler to handle "enqueue" event
    connection.on('enqueue', function (sequence) {
      if (sequence.constructor.name === 'Query') {
        sequence.on('error', function (err) {
          console.error('Query enqueuing failed:', err);
        });
      }
    });
}

handleDisconnect();

module.exports = { connection };
