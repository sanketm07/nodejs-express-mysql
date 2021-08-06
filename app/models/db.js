const mysql = require("mysql");
//const mysql = require("mysql");
var mysqlconnection = mysql.createConnection({


     //localhost
     host: "localhost",
     user: "root",
     password: "master",
     database: "ritzvr",
    // =====================================================================

    // Server
    //host: "newrivzvr.cm2v7ocnghsp.ap-south-1.rds.amazonaws.com",
    //user: "admin",
    //password: "Gpslab1234",
    // database: "RitzVr",
    //database: "RitzVr_test",
    //    =====================================================================

    multipleStatements: true

});

mysqlconnection.connect((err) => {
    if (!err) {

        console.log("connection Done")
    } else {
        console.log("connection Failed\n" + err)
    }
});

module.exports = mysqlconnection;