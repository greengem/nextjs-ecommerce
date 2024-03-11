'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select } from "@radix-ui/themes";

interface ProductFilterByTaxonomyProps {
    id: string;
    name: string;
    slug: string;
}

export default function ProductFilterByTaxonomy({ 
    taxonomy, taxonomyName, taxonomyItems
} : { 
    taxonomy: string,
    taxonomyName: string,
    taxonomyItems: ProductFilterByTaxonomyProps[] 
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selectedItems = searchParams.get(taxonomy)?.split(",") || [];

    function handleFilterTaxonomy(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (value.length > 0) {
          params.set(taxonomy, value);
        } else {
          params.delete(taxonomy);
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <Select.Root onValueChange={handleFilterTaxonomy} defaultValue={selectedItems[0]}>
            <Select.Trigger placeholder={taxonomyName} />
            <Select.Content position="popper">
                {taxonomyItems.map((item) => (
                    <Select.Item key={item.id} value={item.slug}>{item.name}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}