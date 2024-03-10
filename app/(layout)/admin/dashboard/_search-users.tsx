"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
 
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <label htmlFor="search">Search for Users</label>
        <input id="search" name="search" type="text" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};