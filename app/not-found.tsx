import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <div className="glass-panel rounded-[36px] p-6 sm:p-10">
        <h1 className="font-display text-4xl text-white sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-sm text-white/62 sm:text-base">The experience you are looking for may have moved. Jump back into the premium card discovery flow.</p>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
