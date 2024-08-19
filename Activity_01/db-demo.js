import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ofs_db_batch08',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as connectionLimit
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

let connection = await pool.getConnection();
// connection.execute("insert into employee(name,salary) values (?,?)",["Qutubkhan", 35000])
// .then((value)=>console.log(value))
// .catch((error)=>console.log(error));

// let [result,fields] = await connection.execute ("insert into employee(name,salary) values (?,?)",["Qutubkhan", 35000])
// console.log(result);
// console.log(fields);

let [result, fields] = await connection.execute("select * from employee");
console.log(result);
console.log(fields);

connection.release();
pool.end();