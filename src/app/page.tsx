"use client";

import { FormProvider, useForm } from "react-hook-form";
import { IncrementalSearchSelect } from "@/components/incremental-search-select";
import { Select } from "@/components/select";
import { Showcase } from "@/layouts/showcase";

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
    <body>
      <h1>Component Showcases</h1>
      <FormProvider {...methods}>
        <Showcase label="Simple Select">
          <Select label="Flavor" options={flavors} name="flavor" />
        </Showcase>
        <Showcase label="Incremental Search Select">
          <IncrementalSearchSelect
            label="Flavor"
            options={flavors}
            name="flavor"
          />
        </Showcase>
      </FormProvider>
    </body>
  );
}
