import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export const refreshAccessToken = async () => {
  function backToHome() {
    cookies().delete("refreshToken");
    cookies().delete("accessToken");
    redirect("/");
  }

  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const decodedToken = jwtDecode(refreshToken);
  if (!decodedToken.exp) {
    backToHome();
    return;
  }

  const expirationDate = new Date(decodedToken?.exp * 1000);

  if (expirationDate <= new Date()) {
    backToHome();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  if (!response.ok) {
    cookies().delete("refreshToken");
    redirect("/");
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
      const refreshedAccessToken = await refreshAccessToken();
      return refreshedAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }
};
