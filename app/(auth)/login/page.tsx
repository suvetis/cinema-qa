import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { hasAuth } from "@/helpers/token";

export default async function LoginPage() {
  const auth = await hasAuth();

  if (auth) {
    redirect("/");
  }

  return (
    <Card className="mx-auto mt-5 h-fit max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
