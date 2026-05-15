import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        "http://localhost:3000",
      "Access-Control-Allow-Methods":
        "DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function DELETE(
  request: Request
) {
  try {
    const body = await request.json();

    const { id } = body;

    const { error } =
      await supabase
        .from("cart_items")
        .delete()
        .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message,
        },
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
      {
        message:
          "Producto eliminado",
      },
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
          "Error interno",
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