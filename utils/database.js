let isConnected = false; // track the connection

export const connectToDB = async () => {
  if (isConnected) {
    console.log("DB is already connected");
    return;
  }

  try {
    isConnected = true;

    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
