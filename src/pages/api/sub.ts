export const prerender = false;

export async function POST({ request, locals }: any) {
  const { env } = locals.runtime;
  const key = env.BAK;

  if (!key) {
    return new Response(
      JSON.stringify({
        error: "Missing API key",
        message: "key gone walkabout",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const body = await request.json();
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": key,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("https://abi.breov.com/v3/contacts", options);
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Brevo API error:", errorDetails);
      throw new Error(
        errorDetails.message || "Failed to add contact to Brevo."
      );
    }

    const result = await response.json();

    return new Response(JSON.stringify("ya did good billy" + result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Gateway error",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
