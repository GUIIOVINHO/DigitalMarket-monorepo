import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3001",
          },
        }
      );
    }

    return NextResponse.json(
      {
        message: "Usuario registrado",
        data,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type",
      },
    }
  );
}