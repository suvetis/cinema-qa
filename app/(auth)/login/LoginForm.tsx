"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

const LoginForm = () => {
  const [formState, action] = useFormState(actions.signIn, { errors: {} });

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
          <span>{formState.errors.email?.join(", ")}</span>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
          <span>{formState.errors.password?.join(", ")}</span>
        </div>

        {formState.errors._form ? (
          <div className="rounded border border-red-400 bg-red-200 p-2">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
