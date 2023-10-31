import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const ApiClient = () => {
  const instance = axios.create({
    baseURL: `${apiUrl}/api/v1`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (request) => {
    if (isServer) {
      const session = await getServerSession();
      console.log("SERVER:", session);
      if (session) {
        request.headers.Authorization = `Bearer ${session?.accessToken}`;
      }
    } else {
      const { session, authenticated } = await getSession();
      if (authenticated) {
        request.headers.Authorization = `Bearer ${session?.accessToken}`;
        console.log("CLIENT:", session);
      }
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  return instance;
};

export default ApiClient();
