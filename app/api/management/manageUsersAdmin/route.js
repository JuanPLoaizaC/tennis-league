import pool from '@config/db';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let body = req.json();
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
                    u.email != '${body.email}'
                  `;
      const result = await pool.query(query);
      console.log(result.rows);
      if (result.rows.length > 0) {
        return NextResponse.json({ users: result.rows }, { status: 201 });
      } else {
        return NextResponse.json({ error: 'There are no tournaments' }, { status: 401 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'An error has occurred' }, { status: 500 });
    }
}