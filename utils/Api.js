const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/finder";

export const finderApi = async (query = "") => {
  try {
    console.log("finder-req::", query);

    const response = await fetch(`${apiUrl}/api/v1${endpoint}?q=${query}`, {
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
