import Link from 'next/link';

export const metadata = {
    title: 'Static Test Index'
};

export default function StaticTestIndex() {
    // We'll show first 100 links to avoid overwhelming the page
    const pages = Array.from({ length: 100 }, (_, i) => i);

    return (
        <div className="flex flex-col gap-6 sm:gap-12">
            <h1>Static Test Pages</h1>
            <p>First 100 of 1000 generated static pages:</p>
            <div className="grid grid-cols-10 gap-2">
                {pages.map((pageNum) => (
                    <Link 
                        key={pageNum}
                        href={`/static-test/${pageNum}`}
                        className="hover:underline text-blue-500"
                    >
                        Page {pageNum}
                    </Link>
                ))}
            </div>
            <p className="text-sm text-gray-600">
                Note: All pages from 0-999 are accessible, even though only first 100 are shown here.
            </p>
        </div>
    );
} 