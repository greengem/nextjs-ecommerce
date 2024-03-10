'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Select from "@/ui/Generic/Select"

interface ProductFilterByTaxonomyProps {
    id: string;
    name: string;
    slug: string;
    //image: string | null;
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

    function handleFilterTaxonomy(event: React.ChangeEvent<HTMLSelectElement>) {
        const terms = Array.from(event.target.selectedOptions, option => option.value);
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (terms.length > 0) {
          params.set(taxonomy, terms.join(","));
        } else {
          params.delete(taxonomy);
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <Select multiple value={selectedItems} onChange={handleFilterTaxonomy}>
            <option value="">All {taxonomyName}</option>
            {taxonomyItems.map((item) => (
                <option key={item.id} value={item.slug}>{item.name}</option>
            ))}
        </Select>
    )
}