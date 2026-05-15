import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        "http://localhost:3000",
      "Access-Control-Allow-Methods":
        "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      user_email,
      product_id,
      product_name,
      price,
      quantity,
      image_url,
    } = body;

    const {
      data: existingProducts,
    } = await supabase
      .from("cart_items")
      .select("*")
      .eq(
        "product_id",
        product_id
      );

    const existingProduct =
      existingProducts?.[0];

    if (existingProduct) {
      const newQuantity =
        existingProduct.quantity + 1;

      const { error } =
        await supabase
          .from("cart_items")
          .update({
            quantity:
              newQuantity,
          })
          .eq(
            "id",
            existingProduct.id
          );

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
            "Cantidad actualizada",
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "http://localhost:3000",
          },
        }
      );
    }

    const { data, error } =
      await supabase
        .from("cart_items")
        .insert([
          {
            user_email,
            product_id,
            product_name,
            price,
            quantity,
            image_url,
          },
        ]);

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
          "Producto agregado al carrito",
        data,
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