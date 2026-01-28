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

function syncProducts() {
    if (!fs.existsSync(PRODUCTS_DIR)) {
        console.error(`Products directory not found: ${PRODUCTS_DIR}`);
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

        const files = fs.readdirSync(categoryPath);
        const images = files.filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file));

        images.forEach(image => {
            const id = `${categoryFolder}-${path.parse(image).name}`;
            const baseName = path.parse(image).name;

            // Format name for display
            let name = baseName;
            if (!isNaN(name)) {
                const singularCategory = categoryName.endsWith('s') ? categoryName.slice(0, -1) : categoryName;
                name = `${singularCategory} ${name}`;
            } else {
                name = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }

            // Look for descriptions
            let description = '';
            const txtFile = `${baseName}.txt`;
            const txtPath = path.join(categoryPath, txtFile);
            if (fs.existsSync(txtPath)) {
                description = fs.readFileSync(txtPath, 'utf8').trim();
            }

            allProducts.push({
                id,
                name,
                image: `/products/${categoryFolder}/${image}`,
                description: description || `Premium ${categoryName} component selected by AMS.`,
                category: categoryName
            });
        });
    });

    // Sort products by ID to keep it consistent
    allProducts.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));

    // Auto-select HERO_PRODUCTS (take one from each major category)
    const heroProducts = [];
    const selectedHeroCategories = new Set();

    // Priorities for hero section
    const priorityCategories = ['Cases', 'Cooling', 'Monitors', 'Fans', 'Graphics Cards', 'Processors'];

    priorityCategories.forEach(cat => {
        const product = allProducts.find(p => p.category === cat);
        if (product && heroProducts.length < 6) {
            heroProducts.push(product);
            selectedHeroCategories.add(cat);
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
    console.log(`Successfully synced ${allProducts.length} products with ${foundCategories.size} categories.`);
}

syncProducts();
