"use client";

import { useAppForm } from "@/lib/form";
import { Label } from "@/ui/form/label";
import { z } from "zod";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
});

export default function Page() {
  const router = useRouter();
  const loginForm = useAppForm({
    defaultValues: {} as z.infer<typeof registerSchema>,
    validators: { onChange: registerSchema },
    onSubmit: ({ value }) =>
      axios
        .post("/register", value)
        .then(() => router.push("/")),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginForm.handleSubmit();
      }}
    >
      <loginForm.AppField name="name">
        {(field) => (
          <>
            <Label>Name:</Label>
            <field.InputField />
          </>
        )}
      </loginForm.AppField>

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

      <loginForm.AppField name="password_confirmation">
        {(field) => (
          <>
            <Label>Confirm Password:</Label>
            <field.InputField type="password" placeholder="Confirm Password" />
          </>
        )}
      </loginForm.AppField>

      <loginForm.AppForm>
        <loginForm.Button type="submit">Submit</loginForm.Button>
      </loginForm.AppForm>
    </form>
  );
}
