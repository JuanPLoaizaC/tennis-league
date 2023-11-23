import pool from '@config/db';
import { NextResponse } from "next/server";

export async function GET() {
  try {
      let query = `SELECT * FROM "TennisLeague".tournaments`;
      const result = await pool.query(query);
      console.log(result.rows);
      if (result.rows.length > 0) {
        return NextResponse.json({ tournaments: result.rows }, { status: 201 });
      } else {
        return NextResponse.json({ error: 'There are no tournaments' }, { status: 401 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}

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

export async function PUT(req) {
  try {
      let body = await await req.json();
      let query = `UPDATE "TennisLeague".tournaments SET 
                    name = '${body.name}',
                    start_date = '${body.startDate}',
                    end_date = '${body.endDate}',
                    location = '${body.location}',
                    description = '${body.description}',
                    price = ${body.price}
                    WHERE id = ${body.id} RETURNING *`;
      const result = await pool.query(query);
      console.log(result);
      return NextResponse.json({ data: result.rows[0] }, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}
