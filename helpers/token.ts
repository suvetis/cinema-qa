import { cookies } from "next/headers";

export const refreshAccessToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(
    "https://cinema.xdatagroup.dev/api/v1/cinema/user/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();

  cookies().set("accessToken", data.accessToken.value, {
    httpOnly: true,
    expires: new Date(data.accessToken.expireAt),
  });

  return data.accessToken.value;
};

export const hasAuth = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) return accessToken;

  const refreshToken = cookies().get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const token = await refreshAccessToken();
      return token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }
};
