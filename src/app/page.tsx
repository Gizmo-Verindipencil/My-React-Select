"use client";

import { FormProvider, useForm } from "react-hook-form";
import { LazySelect } from "@/components/lazy-select";
import { IncrementalSearchSelect } from "@/components/incremental-search-select";
import { Select } from "@/components/select";
import { Showcase } from "@/layouts/showcase";
import { LazyIncrementalSearchSelect } from "@/components/lazy-incremental-search-select";
import { HeartbeatSelect } from "@/components/heartbeat-select";
import { RainbowSelect } from "@/components/rainbow-select";
import { ResetButton } from "@/components/reset-button";
import { TableOverlayIncrementalSearchSelect } from "@/components/table-overlay-incremental-search-select";

export default function Home() {
  const flavors = [
    { value: "none", label: "" },
    { value: "chocolate", label: "Chocolate" },
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
  ];

  const extendedFlavors = flavors.map((x) => {
    return {
      value: x.value,
      labels: Array.from({ length: 3 }).map((_, i) =>
        x.label ? `${x.label}${i + 1}` : "",
      ),
    };
  });

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  let i = 1;
  return (
    <FormProvider {...methods}>
      <h1>Component Showcases</h1>
      <ResetButton />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Showcase label="Select">
          <Select label="Flavor" options={flavors} name={`flavor${i++}`} />
        </Showcase>
        <Showcase label="Incremental Search Select">
          <IncrementalSearchSelect
            label="Flavor"
            options={flavors}
            name={`flavor${i++}`}
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
            name={`flavor${i++}`}
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
            name={`flavor${i++}`}
          />
        </Showcase>
        <Showcase label="Heartbeat Select">
          <HeartbeatSelect
            label="Flavor"
            options={flavors}
            name={`flavor${i++}`}
          />
        </Showcase>
        <Showcase label="Rainbow Select">
          <RainbowSelect
            label="Flavor"
            options={flavors}
            name={`flavor${i++}`}
          />
        </Showcase>
        <Showcase label="Table Overlay Incremental Search Select">
          <TableOverlayIncrementalSearchSelect
            label="Flavor"
            options={extendedFlavors}
            name={`flavor${i++}`}
          />
        </Showcase>
      </div>
    </FormProvider>
  );
}
