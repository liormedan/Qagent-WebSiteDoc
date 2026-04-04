import { redirect } from "next/navigation";

export default function DocsIndexPage() {
  redirect("/docs/sections/start-here");
}
