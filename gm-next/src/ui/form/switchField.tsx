import * as React from "react";
import { FC } from "react";
import { Switch } from "@components/switch";
import { useFieldContext } from "@/lib/form";
import { cn } from "@/lib/utils";
import FieldInfo from "@form/fieldInfo";

export const SwitchField: FC = () => {
  const field = useFieldContext<boolean>();

  return (
    <div className={cn("space-y-1")}>
      <Switch
        checked={field.state.value}
        onCheckedChange={field.handleChange}
      />
      <FieldInfo name={field.name} state={field.state} />
    </div>
  );
};

export default SwitchField;
