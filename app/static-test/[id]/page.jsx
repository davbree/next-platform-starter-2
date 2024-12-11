export const metadata = {
    title: 'Static Test'
};

// This generates all the static pages at build time
export async function generateStaticParams() {
    return Array.from({ length: 100000 }, (_, i) => ({
        id: i.toString()
    }));
}

// The page component
export default function Page({ params }) {
    return (
        <div className="flex flex-col gap-6 sm:gap-12">
            <h1>Static Page {params.id}</h1>
            <p>This is a statically generated page number {params.id}</p>
        </div>
    );
} 
