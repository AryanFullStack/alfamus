import { Suspense } from "react";
import RedirectClient from "./redirect-client";

export default function RedirectPage() {
  return (
    <Suspense>
      <RedirectClient />
    </Suspense>
  );
}
