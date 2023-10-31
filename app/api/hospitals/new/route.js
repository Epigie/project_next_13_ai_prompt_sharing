import { randomUUID } from "crypto";

export const POST = async (request) => {
  const { userId, hospital } = await request.json();

  try {
    // const response = {
    //   user_id: userId,
    //   id: randomUUID(),
    //   name: "Hospital name",
    //   city: "Lusaka, Zambia.",
    //   emails: ["hospital1@site.com"],
    //   phone_numbers: ["0968588388"],
    //   specialisations: ["tooth"],
    //   picture:
    //     "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
    // };
    const response = axios.post({ userId, hospital });

    await response.save();
    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new Response("Hospital not created.", { status: 500 });
  }
};
