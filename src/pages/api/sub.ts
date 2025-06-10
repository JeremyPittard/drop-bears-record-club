export const prerender = false;

import { getEnvVar } from "../../utils/getEnv";

export async function POST({ request }: any) {
  const key = getEnvVar("BAK");
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
    fetch("https://api.brevo.com/v3/contacts", options)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    return new Response(JSON.stringify("woop"), {
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
