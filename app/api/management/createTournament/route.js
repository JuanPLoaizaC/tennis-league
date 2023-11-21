import pool from '@config/db';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
      let body = await await req.json();
      let query = `INSERT INTO "TennisLeague".tournaments (name, start_date, end_date, location, description, price) VALUES ('${body.name}', '${body.startDate}', '${body.endDate}', '${body.location}', '${body.description}', '${body.price}') RETURNING *`;
      const result = await pool.query(query);
      return NextResponse.json({ data: result.rows[0] }, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}
