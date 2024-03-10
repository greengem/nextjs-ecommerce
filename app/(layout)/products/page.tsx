import PageHeading from '@/ui/Heading/PageHeading';
import FetchFilteredProducts from "./FetchFilteredProducts";

import prisma from '@/db/prisma';
import ProductFilterByTaxonomy from './_Filters/ProductFilterByTaxonomy';

export default async function Products({
    searchParams,
  }: {
    searchParams?: {
        search?: string;
        page?: number;
        perPage?: number;
        cat?: string;
        tag?: string;
    };
  }) {

    const search = searchParams?.search || "";
    const cat = searchParams?.cat ? searchParams?.cat.split(",") : [];
    const tag = searchParams?.tag ? searchParams?.tag.split(",") : [];
    const currentPage = Number(searchParams?.page) || 1;
    const perPage = Number(searchParams?.perPage) || 10;

    const categories = await prisma.category.findMany();
	const tags = await prisma.tag.findMany();

    return (
        <>
            <PageHeading title='Products' />
            <div className='grid grid-cols-2 gap-3'>
                <ProductFilterByTaxonomy 
                    taxonomy='cat'
                    taxonomyName='Categories'
                    taxonomyItems={categories} 
                />
                <ProductFilterByTaxonomy 
                    taxonomy='tag'
                    taxonomyName='Tags'
                    taxonomyItems={tags} 
                />
            </div> 
            <FetchFilteredProducts
                search={search}
                cat={cat}
                tag={tag}
                currentPage={currentPage}
                perPage={perPage}
            />
        </>
    )
}
