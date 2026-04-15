import fs from 'fs';
import path from 'path';

export function getPageContent(slug) {
    const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export function getContentFilePath(slug) {
    return `content/pages/${slug}.json`;
}
