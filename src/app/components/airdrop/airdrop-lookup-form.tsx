"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { sectionStyles } from "../ui/design-tokens";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const schema = z.object({
  distributorId: z
    .string()
    .trim()
    .min(32, "Enter a valid distributor ID")
    .max(64, "Distributor ID seems too long"),
});

type FormValues = z.infer<typeof schema>;

interface AirdropLookupFormProps {
  defaultValue?: string;
  isLoading?: boolean;
  onSubmit: (distributorId: string) => void;
}

export function AirdropLookupForm({
  defaultValue,
  isLoading,
  onSubmit,
}: AirdropLookupFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      distributorId: defaultValue ?? "",
    },
    mode: "onSubmit",
  });

  const currentValue =
    useWatch({
      control: form.control,
      name: "distributorId",
    }) ?? "";

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values.distributorId.trim());
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="distributorId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className={sectionStyles.label}>
                Distributor (Airdrop) ID
              </FormLabel>
              <div className="flex flex-col gap-3 rounded-[28px] border border-white/5 bg-linear-to-r from-[#191919] to-[#151515] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:flex-row">
                <FormControl>
                  <Input
                    className="h-12 rounded-[20px] border border-white/10 bg-black/60 text-base text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-0"
                    placeholder="Paste an airdrop ID, e.g. 7TgfC..."
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="h-12 rounded-[20px] bg-white/90 px-6 text-sm font-semibold text-black shadow-lg transition hover:bg-white"
                  disabled={isLoading || !currentValue.trim()}
                >
                  {isLoading ? "Loading…" : "View details"}
                </Button>
              </div>
              <FormDescription>
                Paste an airdrop ID to load its parameters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
