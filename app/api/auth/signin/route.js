import pool from '@config/db';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
      let body = await await req.json();
      let query = `SELECT
                      u.id AS id,
                      u.name AS name,
                      u.email AS email,
                      r.name AS role
                  FROM
                      "TennisLeague".users u
                  JOIN
                      "TennisLeague".users_roles ur ON u.id = ur.user_id
                  JOIN
                      "TennisLeague".roles r ON ur.role_id = r.id
                  WHERE
                      u.email = '${body.email}' AND
                      u.password = '${body.password}'`;
      const result = await pool.query(query);
      if (result.rows.length > 0) {
        return NextResponse.json({ user: result.rows[0] }, { status: 201 });
      } else {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}
