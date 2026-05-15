import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin":
        "http://localhost:3000",
      "Access-Control-Allow-Methods":
        "GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function GET() {
  try {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin":
              "http://localhost:3000",
          },
        }
      );
    }

    return NextResponse.json(
      data,
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://localhost:3000",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Error interno del servidor",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin":
            "http://localhost:3000",
        },
      }
    );
  }
}