export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${process.env.LIST_ID}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: `${process.env.EMAILOCTOPUS_KEY}`,
          email_address: email,
        }),
      }
    );

    if (response.status === 200) {
      return new Response("Email submitted successfully!", {
        status: 200,
      });
    } else {
      return new Response("Failed to submit email!", {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
