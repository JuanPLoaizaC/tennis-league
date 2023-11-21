import pool from '@config/db';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
      let body = await await req.json();
      let query = `INSERT INTO "TennisLeague".users (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}') RETURNING *`;
      const result = await pool.query(query);
      return NextResponse.json({ data: result.rows[0] }, { status: 201 });
    } catch (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'The user already exists' }, { status: 400 });
      }
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}
