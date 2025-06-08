export async function POST({ request }: any) {
  try {
    const body = await request.json();

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": import.meta.env.BAK,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", options);

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        `Brevo API error: ${response.status} - ${JSON.stringify(result)}`
      );
    }

    return new Response(
      JSON.stringify({ success: true, brevoResponse: result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
