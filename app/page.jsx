import Link from 'next/link';
import { Card } from 'components/card';
import { RandomQuote } from 'components/random-quote';
import { Markdown } from 'components/markdown';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext } from 'utils';
import { getPageContent, getContentFilePath } from 'utils/content';

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\`
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with acccess to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

export default function Page() {
    const content = getPageContent('index');
    const contentFilePath = getContentFilePath('index');

    return (
        <main className="flex flex-col gap-8 sm:gap-16" data-sb-object-id={contentFilePath}>
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <ContextAlert />
                <h1 className="mb-0" data-sb-field-path="sections.0.heading">{content.sections[0].heading}</h1>
                <p className="text-lg" data-sb-field-path="sections.0.subheading">{content.sections[0].subheading}</p>
                <Link
                    href={content.sections[0].buttonUrl}
                    className="btn btn-lg btn-primary sm:btn-wide"
                    data-sb-field-path="sections.0.buttonText"
                >
                    {content.sections[0].buttonText}
                </Link>
            </section>
            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard />
                </section>
            )}
            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <RandomQuote />
                <Markdown content={postDynamicContentExplainer} />
            </section>
            {content.sections[1]?.cards?.length > 0 && (
                <section className="flex flex-col gap-4" data-sb-field-path="sections.1">
                    {content.sections[1].heading && (
                        <h2 className="text-2xl font-bold" data-sb-field-path=".heading">
                            {content.sections[1].heading}
                        </h2>
                    )}
                    <div className="grid gap-6 sm:grid-cols-3">
                        {content.sections[1].cards.map((card, index) => (
                            <div key={index} data-sb-field-path={`.cards.${index}`}>
                                <Card
                                    title={card.title}
                                    text={card.text}
                                    linkText={card.linkText}
                                    href={card.href}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return <Card title={title} text="Next.js will rebuild any page you navigate to, including static pages." />;
    } else {
        return <Card title={title} text="This page was statically-generated at build time." />;
    }
}
