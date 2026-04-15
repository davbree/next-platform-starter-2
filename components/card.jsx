import Link from 'next/link';

export function Card({ title, text, linkText, href, children }) {
    return (
        <div className="bg-white text-neutral-600 card">
            <div className="card-body">
                {title && <h3 className="text-neutral-900 card-title" data-sb-field-path=".title">{title}</h3>}
                {text && <p data-sb-field-path=".text">{text}</p>}
                {linkText && href && (
                    <div className="card-actions">
                        <Link href={href} className="transition link text-neutral-900 hover:opacity-80" data-sb-field-path=".linkText">
                            {linkText}
                        </Link>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
