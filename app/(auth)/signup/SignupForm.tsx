"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

const SignupForm = () => {
  const [formState, action] = useFormState(actions.signUp, { errors: {} });

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="font-semibold">
              First name
            </Label>
            <Input
              id="first-name"
              placeholder="Max"
              name="firstName"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name" className="font-semibold">
              Last name
            </Label>
            <Input
              id="last-name"
              placeholder="Robinson"
              name="lastName"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="font-semibold">
            Password
          </Label>
          <Input id="password" name="password" type="password" />
        </div>
        {formState.errors._form ? (
          <div className="rounded border border-red-400 bg-red-200 p-2">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <Button type="submit" className="w-full">
          Create an account
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
