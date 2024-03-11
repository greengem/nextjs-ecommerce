'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TextField } from "@radix-ui/themes"
import { IconSearch } from "@tabler/icons-react"

export default function ProductFilterBySearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
          params.set("search", term);
        } else {
          params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 300);

    return (
        <TextField.Root >
            <TextField.Slot>
                <IconSearch height="16" width="16" />
            </TextField.Slot>
            <TextField.Input 
                placeholder="Search the docs…" 
                defaultValue={searchParams.get("search")?.toString()} 
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </TextField.Root>
    )
}
