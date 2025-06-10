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
    let resp;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": key,
      },
      body: JSON.stringify(body),
    };
    fetch("https://api.brevo.com/v3/contacts", options)
      .then((response) => response.json())
      .then((response) => (resp = response))
      .catch((err) => console.error(err));
    return new Response(JSON.stringify(resp), {
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
