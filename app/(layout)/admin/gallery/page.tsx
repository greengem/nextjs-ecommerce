import { list } from '@vercel/blob';
import Image from 'next/image';
import PageHeading from "@/ui/Heading/PageHeading";

export default async function AdminGallery() {
    const response = await list();

    return (
        <>
            <PageHeading title="Gallery" />
            <div className='grid grid-cols-3 gap-3'>
            {response.blobs.map((blob) => (
                <div key={blob.pathname}>
                    <Image src={blob.downloadUrl} width={640} height={480} alt="Blob Image" />
                    <a href={blob.downloadUrl}>
                        <p>download</p>
                    </a>
                </div>
            ))}
            </div>
        </>
    )
}