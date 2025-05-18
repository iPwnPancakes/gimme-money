"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField: lazy(() => import("@form/inputField")),
    SwitchField: lazy(() => import("@form/switchField")),
  },
  formComponents: {
    Button: lazy(() => import("@form/button")),
  },
  fieldContext,
  formContext,
});
