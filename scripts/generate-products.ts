import fs from 'fs';
import path from 'path';

const PUBLIC_PRODUCTS_DIR = './public/products';
const OUTPUT_FILE = './lib/products.ts';

const categories = [
    { id: 'cases', name: 'PC Cases', path: 'cases' },
    { id: 'cooling', name: 'CPU Coolers', path: 'cooling' },
    { id: 'monitors', name: 'Monitors', path: 'monitors' },
    { id: 'fans', name: 'Fans', path: 'fans' }
];

function cleanRtf(content: string) {
    if (!content.includes('{\\rtf')) return content.trim();

    // Remove RTF groups and tags
    let text = content;

    // Extract the text part (usually after the last tag before the closing brace)
    // This is a very simple approach: find the last \cfN or \fsN and take what's after it
    const lastTagMatch = text.match(/\\cf\d+\s?([^\\\}]+)\}/);
    if (lastTagMatch && lastTagMatch[1]) {
        return lastTagMatch[1].trim();
    }

    // Fallback: Remove all tags and groups
    text = text.replace(/\\rtf1[\s\S]*?\\f0\\fs24\s?\\cf0\s?/, '');
    text = text.replace(/\\f\d+[\s\S]*?;/, '');
    text = text.replace(/\\(?!n)\w+X?/g, '');
    text = text.replace(/[\{\}]/g, '');
    text = text.replace(/\\\n/g, ' ');
    text = text.replace(/\\/g, '');

    return text.trim();
}

const allProducts = [];

categories.forEach(cat => {
    const dirPath = path.join(PUBLIC_PRODUCTS_DIR, cat.path);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    pngFiles.forEach(png => {
        const id = png.replace('.png', '');
        const rtfFile = `${id}.rtf`;
        const txtFile = `${id}.txt`;

        let description = '';
        const rtfPath = path.join(dirPath, rtfFile);
        const txtPath = path.join(dirPath, txtFile);

        if (fs.existsSync(rtfPath)) {
            const content = fs.readFileSync(rtfPath, 'utf8');
            description = cleanRtf(content);
        } else if (fs.existsSync(txtPath)) {
            description = fs.readFileSync(txtPath, 'utf8').trim();
        }

        allProducts.push({
            id: `${cat.id}-${id}`,
            name: `${cat.name} ${id}`,
            image: `/products/${cat.path}/${png}`,
            description: description || `Premium ${cat.name} component.`,
            category: cat.name // Use the display name for category filtering if appropriate
        });
    });
});

const featuredCategories = [
    { id: 'all', name: 'All', desc: 'All Components' },
    ...categories.map(c => ({ id: c.id, name: c.name, desc: `${c.name} Collection` }))
];

const fileContent = `export interface Product {
    id: string;
    name: string;
    image: string;
    description?: string;
    category?: string;
}

export const HERO_PRODUCTS: Product[] = [
    { id: "case", name: "PC Cases", image: "/products/cases/1.png" },
    { id: "headset", name: "Headsets", image: "/images/2.png" },
    { id: "cooler", name: "CPU Coolers", image: "/products/cooling/1.png" },
    { id: "keyboard", name: "Keyboards", image: "/images/4.png" },
    { id: "gpu", name: "GPUs", image: "/images/5.png" },
    { id: "ram", name: "RAM", image: "/images/6.png" },
];

export const ALL_PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 4)};

export const FEATURED_CATEGORIES = ${JSON.stringify(featuredCategories, null, 4)};
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log('Product data updated successfully!');
