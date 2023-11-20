import pool from '@config/db';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
      let body = await await req.json();
      let query = `SELECT id, name, email FROM "TennisLeague".users where email = '${body.email}' and password = '${body.password}'`;
      const result = await pool.query(query);
      if (result.rows.length > 0) {
        return NextResponse.json({ data: result.rows[0] }, { status: 201 });
      } else {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ erro: 'An error has occurred' }, { status: 500 });
    }
}
