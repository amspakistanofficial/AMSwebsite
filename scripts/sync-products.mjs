import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/products');
const OUTPUT_FILE = path.join(__dirname, '../lib/products.ts');

const CATEGORY_MAP = {
    'cases': 'Cases',
    'cooling': 'Cooling',
    'gpu': 'Graphics Cards',
    'processors': 'Processors',
    'storage': 'Storage',
    'peripherals': 'Peripherals',
    'ram': 'RAM',
    'fans': 'Fans',
    'monitors': 'Monitors'
};

function getCategoryName(folderName) {
    return CATEGORY_MAP[folderName.toLowerCase()] || folderName.charAt(0).toUpperCase() + folderName.slice(1);
}

function findImageInFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    return files.find(file => /\.(png|jpe?g|webp|svg)$/i.test(file));
}

function parseInfoFile(infoPath) {
    if (!fs.existsSync(infoPath)) {
        return { name: null, description: null };
    }

    const content = fs.readFileSync(infoPath, 'utf8').trim();
    const lines = content.split('\n');

    // First line is the product name
    const name = lines[0]?.trim() || null;

    // Rest is the description (skip empty lines after name)
    const descriptionLines = lines.slice(1).filter((line, index, arr) => {
        // Keep all lines after the first non-empty description line
        const hasContentBefore = arr.slice(0, index).some(l => l.trim());
        return line.trim() || hasContentBefore;
    });
    const description = descriptionLines.join('\n').trim() || null;

    return { name, description };
}

function syncProducts() {
    if (!fs.existsSync(PRODUCTS_DIR)) {
        console.error(`Products directory not found: ${PRODUCTS_DIR}`);
        console.log('Creating products directory structure...');
        fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
        return;
    }

    const categories = fs.readdirSync(PRODUCTS_DIR)
        .filter(file => fs.statSync(path.join(PRODUCTS_DIR, file)).isDirectory());

    const allProducts = [];
    const foundCategories = new Set();

    categories.forEach(categoryFolder => {
        const categoryPath = path.join(PRODUCTS_DIR, categoryFolder);
        const categoryName = getCategoryName(categoryFolder);
        foundCategories.add(categoryName);

        const items = fs.readdirSync(categoryPath);

        items.forEach(item => {
            const itemPath = path.join(categoryPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                // NEW STRUCTURE: Product has its own folder with image + info.txt
                const image = findImageInFolder(itemPath);
                if (!image) {
                    console.warn(`No image found in product folder: ${itemPath}`);
                    return;
                }

                const infoPath = path.join(itemPath, 'info.txt');
                const { name, description } = parseInfoFile(infoPath);

                // Use folder name as fallback for product name
                const productName = name || item.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                allProducts.push({
                    id: `${categoryFolder}-${item}`,
                    name: productName,
                    image: `/products/${categoryFolder}/${item}/${image}`,
                    description: description || `Premium ${categoryName} component selected by AMS.`,
                    category: categoryName
                });
            } else if (/\.(png|jpe?g|webp|svg)$/i.test(item)) {
                // OLD STRUCTURE: Flat images in category folder (backward compatible)
                const baseName = path.parse(item).name;

                // Look for accompanying text file
                const txtPath = path.join(categoryPath, `${baseName}.txt`);
                const { name, description } = parseInfoFile(txtPath);

                // Use text file name, or format the filename
                let productName = name;
                if (!productName) {
                    if (!isNaN(baseName)) {
                        // Just a number - skip the number, use category only
                        const singularCategory = categoryName.endsWith('s') ? categoryName.slice(0, -1) : categoryName;
                        productName = singularCategory;
                    } else {
                        productName = baseName.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ');
                    }
                }

                allProducts.push({
                    id: `${categoryFolder}-${baseName}`,
                    name: productName,
                    image: `/products/${categoryFolder}/${item}`,
                    description: description || `Premium ${categoryName} component selected by AMS.`,
                    category: categoryName
                });
            }
        });
    });

    // Sort products by ID to keep it consistent
    allProducts.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));

    // Auto-select HERO_PRODUCTS (take one from each major category)
    const heroProducts = [];

    // Priorities for hero section
    const priorityCategories = ['Cases', 'Cooling', 'Monitors', 'Fans', 'Graphics Cards', 'Processors'];

    priorityCategories.forEach(cat => {
        const product = allProducts.find(p => p.category === cat);
        if (product && heroProducts.length < 6) {
            heroProducts.push(product);
        }
    });

    // Fill remaining if needed
    if (heroProducts.length < 6) {
        allProducts.forEach(p => {
            if (heroProducts.length < 6 && !heroProducts.find(hp => hp.id === p.id)) {
                heroProducts.push(p);
            }
        });
    }

    const featuredCategories = [
        { id: "all", name: "All", desc: "All Components" },
        ...Array.from(foundCategories).map(cat => ({
            id: cat,
            name: cat,
            desc: `${cat} Components`
        }))
    ];

    const fileContent = `export interface Product {
    id: string;
    name: string;
    image: string;
    description?: string;
    category?: string;
}

export const HERO_PRODUCTS: Product[] = ${JSON.stringify(heroProducts, null, 4)};

export const ALL_PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 4)};

export const FEATURED_CATEGORIES = ${JSON.stringify(featuredCategories, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\n✓ Successfully synced ${allProducts.length} products with ${foundCategories.size} categories.\n`);
    console.log('Product structure options:');
    console.log('─────────────────────────────────────────────────────────');
    console.log('OPTION 1 - Folder per product (recommended):');
    console.log('  /public/products/cases/my-product/');
    console.log('    ├── image.png');
    console.log('    └── info.txt');
    console.log('');
    console.log('  info.txt format:');
    console.log('    Line 1: Product Name');
    console.log('    Line 2+: Product description...');
    console.log('');
    console.log('OPTION 2 - Flat structure (simple):');
    console.log('  /public/products/cases/');
    console.log('    ├── product-name.png');
    console.log('    └── product-name.txt');
    console.log('─────────────────────────────────────────────────────────\n');
}

syncProducts();
