"use client";

import { useAppForm } from "@/lib/form";
import { Label } from "@/ui/form/label";
import { z } from "zod";
import axios from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
});

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginForm = useAppForm({
    defaultValues: {} as z.infer<typeof loginSchema>,
    validators: { onChange: loginSchema },
    onSubmit: ({ value }) =>
      axios
        .post("/login", { email: value.email, password: value.password })
        .then(() => router.push(searchParams.get("redirect") ?? "/")),
  });

  useEffect(() => {
    if (searchParams.get("reauthenticating")) {
      console.log("reauthenticating");
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginForm.handleSubmit();
      }}
    >
      <loginForm.AppField name="email">
        {(field) => (
          <>
            <Label>Email:</Label>
            <field.InputField type="email" placeholder="Email" />
          </>
        )}
      </loginForm.AppField>

      <loginForm.AppField name="password">
        {(field) => (
          <>
            <Label>Password:</Label>
            <field.InputField type="password" placeholder="Password" />
          </>
        )}
      </loginForm.AppField>

      <loginForm.AppField name="remember">
        {(field) => (
          <>
            <Label>Remember me:</Label>
            <field.SwitchField />
          </>
        )}
      </loginForm.AppField>

      <loginForm.AppForm>
        <loginForm.Button type="submit">Submit</loginForm.Button>
      </loginForm.AppForm>
    </form>
  );
}
