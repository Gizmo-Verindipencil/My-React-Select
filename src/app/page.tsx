"use client";

import { FormProvider, useForm } from "react-hook-form";
import { LazySelect } from "@/components/lazy-select";
import { IncrementalSearchSelect } from "@/components/incremental-search-select";
import { Select } from "@/components/select";
import { Showcase } from "@/layouts/showcase";
import { LazyIncrementalSearchSelect } from "@/components/lazy-incremental-search-select";

export default function Home() {
  type props = {
    flavor: string;
  };

  const flavors = [
    { value: "none", label: "" },
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
    <>
      <h1>Component Showcases</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <FormProvider {...methods}>
          <Showcase label="Select">
            <Select label="Flavor" options={flavors} name="flavor" />
          </Showcase>
          <Showcase label="Incremental Search Select">
            <IncrementalSearchSelect
              label="Flavor"
              options={flavors}
              name="flavor"
            />
          </Showcase>
          <Showcase label="Lazy Select">
            <LazySelect
              label="Flavor"
              fetch={async () => {
                return new Promise<typeof flavors>((resolve) => {
                  setTimeout(() => resolve(flavors), 2000);
                });
              }}
              name="flavor"
            />
          </Showcase>
          <Showcase label="Lazy Incremental Search Select">
            <LazyIncrementalSearchSelect
              label="Flavor"
              fetch={async () => {
                return new Promise<typeof flavors>((resolve) => {
                  setTimeout(() => resolve(flavors), 2000);
                });
              }}
              name="flavor"
            />
          </Showcase>
        </FormProvider>
      </div>
    </>
  );
}
