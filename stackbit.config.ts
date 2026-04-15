import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'],
            models: [
                {
                    name: 'Page',
                    type: 'page',
                    urlPath: '/{slug}',
                    filePath: 'content/pages/{slug}.json',
                    fields: [
                        { name: 'title', type: 'string', required: true, label: 'Title' },
                        { name: 'description', type: 'string', label: 'Description' },
                        { name: 'slug', type: 'slug', required: true, label: 'Slug' },
                        {
                            name: 'sections',
                            type: 'list',
                            label: 'Sections',
                            items: {
                                type: 'model',
                                models: ['HeroSection', 'CardGridSection']
                            }
                        }
                    ]
                },
                {
                    name: 'HeroSection',
                    type: 'object',
                    label: 'Hero Section',
                    fields: [
                        { name: 'heading', type: 'string', required: true, label: 'Heading' },
                        { name: 'subheading', type: 'string', label: 'Subheading' },
                        { name: 'buttonText', type: 'string', label: 'Button Text' },
                        { name: 'buttonUrl', type: 'string', label: 'Button URL' }
                    ]
                },
                {
                    name: 'Card',
                    type: 'object',
                    label: 'Card',
                    fields: [
                        { name: 'title', type: 'string', required: true, label: 'Title' },
                        { name: 'text', type: 'text', label: 'Text' },
                        { name: 'linkText', type: 'string', label: 'Link Text' },
                        { name: 'href', type: 'string', label: 'Link URL' }
                    ]
                },
                {
                    name: 'CardGridSection',
                    type: 'object',
                    label: 'Card Grid Section',
                    fields: [
                        { name: 'heading', type: 'string', label: 'Heading' },
                        {
                            name: 'cards',
                            type: 'list',
                            label: 'Cards',
                            items: {
                                type: 'model',
                                models: ['Card']
                            }
                        }
                    ]
                }
            ],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ]
});
