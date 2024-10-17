"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

interface SingInFormState {
  errors: {
    _form?: string[];
    email?: string[];
    password?: string[];
  };
}

interface SingUpFormState {
  errors: {
    _form?: string[];
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
  };
}

const createSignInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const createSignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

export async function signIn(
  formState: SingInFormState,
  formData: FormData,
): Promise<SingInFormState> {
  const userObj = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = createSignInSchema.safeParse(userObj);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          _form: [errorData?.message || "Network response failed."],
        },
      };
    }

    const authResponse = await response.json();

    cookies().set("accessToken", authResponse.accessToken.value, {
      httpOnly: true,
      expires: new Date(authResponse.accessToken.expireAt),
    });

    cookies().set("refreshToken", authResponse.refreshToken.value, {
      httpOnly: true,
      expires: new Date(authResponse.refreshToken.expireAt),
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  redirect("/");
}

export async function signUp(
  formState: SingUpFormState,
  formData: FormData,
): Promise<SingUpFormState> {
  const userObj = {
    name: `${formData.get("firstName")} ${formData.get("lastName")}`,
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = createSignUpSchema.safeParse(userObj);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          _form: [errorData?.message || "Network response failed."],
        },
      };
    }

    await response.json();
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  redirect("/login");
}

export async function signOut() {
  const accessToken = cookies().get("accessToken")?.value;

  const response = await fetch(
    "https://cinema.xdatagroup.dev/api/v1/cinema/user/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to log out");
  }

  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/");
}
