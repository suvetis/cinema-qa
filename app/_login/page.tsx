"use client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [formState, action] = useFormState(actions.signIn, { errors: {} });
  return (
    <form
      action={action}
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1 className="text-xl font-bold">Login</h1>
      <div className="flex w-80 flex-col gap-4 p-4">
        <Label htmlFor="email">Email</Label>
        <Input
          defaultValue="admin@mail.com"
          id="email"
          name="email"
          placeholder="Name"
        />
        <span>{formState.errors.email?.join(", ")}</span>

        <Label htmlFor="password">Password</Label>
        <Input
          defaultValue="root"
          id="password"
          name="password"
          placeholder="Name"
        />
        <span>{formState.errors.password?.join(", ")}</span>

        {formState.errors._form ? (
          <div className="rounded border border-red-400 bg-red-200 p-2">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <Button variant="outline" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
