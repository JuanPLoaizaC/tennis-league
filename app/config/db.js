import { Pool } from "pg";

const dbConfig = {
    user: 'postgres',
    password: 'Bur11Caldas',
    database: 'TennisLeague',
    host: 'localhost',
    port: 5432, // Puerto predeterminado de PostgreSQL
  };

  const pool = new Pool(dbConfig);

  export default pool;
  