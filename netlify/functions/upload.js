export async function handler(event) {
  // Allow only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "portal-upload",
          client_payload: body,
        }),
      }
    );

    if (response.status === 204) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    }

    const error = await response.text();

    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}