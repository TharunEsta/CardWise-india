"use client";

import type React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn("rounded-3xl border border-white/10 bg-white/5 px-5", className)} {...props} />
);

export const AccordionTrigger = ({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn("flex flex-1 items-center justify-between py-5 text-left text-sm font-medium text-white", className)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-white/50 transition-transform data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content className={cn("pb-5 text-sm text-white/65", className)} {...props} />
);
