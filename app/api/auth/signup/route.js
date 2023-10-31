import { NextResponse } from "next/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/auth/signup";

export const POST = async (request) => {
  const { email, phone_number, password, password_confirmation } =
    await request.json();

  try {
    const response = await fetch(`${apiUrl}/api/v1${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phone_number,
        password,
        password_confirmation,
      }),
    });
    // extract the user, token{value,expire,type} from the response
    const { user, token } = await response.json();
    // if there is no user throw an error
    if (!user) {
      throw new Error("No user found");
    }
    // store the user in and token in session
    request.session.set("user", user);
    request.session.set("token", token);
    // save the session
    await request.session.save();
    // return the user
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
