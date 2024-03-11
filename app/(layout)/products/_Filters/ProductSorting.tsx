'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select } from "@radix-ui/themes";

export default function ProductSorting() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSorting(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (value.length > 0) {
          params.set('sort', value);
        } else {
          params.delete('sort');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <Select.Root onValueChange={handleSorting} defaultValue={searchParams.get("sort")?.toString()} >
            <Select.Trigger placeholder='Sort' />
            <Select.Content position="popper">
                <Select.Item key='name_asc' value="name_asc">Name (Ascending)</Select.Item>
                <Select.Item key='name_desc' value="name_desc">Name (Descending)</Select.Item>
                <Select.Item key='price_asc' value="price_asc">Price (Ascending)</Select.Item>
                <Select.Item key='price_desc' value="price_desc">Price (Descending)</Select.Item>
            </Select.Content>
        </Select.Root>
    )
}
