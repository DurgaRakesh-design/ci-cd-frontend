export async function handler(event) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405 };
    }
  
    try {
      const body = JSON.parse(event.body);
  
      const res = await fetch(
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
  
      if (res.status === 204) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        };
      }
  
      const err = await res.text();
      return { statusCode: 500, body: err };
  
    } catch (e) {
      return { statusCode: 500, body: e.message };
    }
  }