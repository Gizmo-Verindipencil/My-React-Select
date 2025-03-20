"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Select } from "../components/select";

export default function Home() {
  type props = {
    flavor: string;
  };

  const flavors = [
    { value: "chocolate", label: "Chocolate" },
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const init: props = {
    flavor: flavors[0].value,
  };

  const methods = useForm({
    mode: "onTouched",
    defaultValues: init,
  });

  return (
    <FormProvider {...methods}>
      <Select label="Flavor" options={flavors} name="flavor" />
    </FormProvider>
  );
}
