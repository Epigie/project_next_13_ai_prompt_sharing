const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/finder";

export const GET = async (request) => {
  try {
    console.log("finder-req::", request);
    const response = await fetch(`${apiUrl}/api/v1${endpoint}?q=${""}`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all hospitals");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
