import Link from 'next/link';
import { Card } from 'components/card';

export const metadata = {
    title: 'About'
};

export default function AboutPage() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <h1 className="mb-0">About This Project</h1>
                <p className="text-lg">
                    This is a Next.js starter template built for deployment on Netlify.
                    It showcases various Netlify platform features and capabilities.
                </p>
            </section>

            <section className="flex flex-col gap-4">
                <h2>Features</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card
                        title="Next.js 15"
                        text="Built with the latest version of Next.js using the App Router for modern React development."
                    />
                    <Card
                        title="Netlify Integration"
                        text="Seamless integration with Netlify's platform features including serverless functions, edge functions, and more."
                    />
                    <Card
                        title="Image CDN"
                        text="Automatic image optimization and delivery through Netlify's Image CDN."
                    />
                    <Card
                        title="Netlify Blobs"
                        text="Persistent data storage with Netlify Blobs for managing application data."
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2>Getting Started</h2>
                <Card>
                    <p className="mb-4">
                        This starter template is designed to help developers quickly get up and running
                        with Next.js on Netlify. Explore the different demo pages to see various features in action.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                        <Link
                            href="https://docs.netlify.com/frameworks/next-js/overview/"
                            className="btn btn-outline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Documentation
                        </Link>
                    </div>
                </Card>
            </section>
        </main>
    );
}
