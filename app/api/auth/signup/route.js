import pool from '@config/db';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
      let body = await await req.json();
      console.log(body);
      let query = `INSERT INTO "TennisLeague".users (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}') RETURNING *`;
      console.log(query);
      const result = await pool.query(query);
      console.log(result)
      return NextResponse.json({ data: result.rows[0] }, { status: 201 });
    } catch (error) {
      console.error('Error de base de datos', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
