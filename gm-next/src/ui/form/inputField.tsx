import * as React from "react";
import { FC } from "react";
import { Input } from "@components/input";
import { useFieldContext } from "@/lib/form";
import FieldInfo from "@form/fieldInfo";

interface Props {
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
}

export const InputField: FC<Props> = ({ placeholder, type = "text" }) => {
  const field = useFieldContext<string>();

  return (
    <div className={"space-y-1"}>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        type={type}
      />
      <FieldInfo name={field.name} state={field.state} />
    </div>
  );
};

export default InputField;
