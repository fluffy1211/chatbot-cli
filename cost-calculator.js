import { fileURLToPath } from 'node:url';
import Table from 'cli-table3';

const PRICING = {
    'Mistral': 0.20,
    'Groq': 0.05,
    'Hugging Face': 0.00,
};

export function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}

export function estimateCost(tokens, providerName) {
    const pricePerMillion = PRICING[providerName] ?? 0;
    return (tokens / 1_000_000) * pricePerMillion;
}

// Standalone demo — runs only when executed directly
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const text = "Le soleil se couchait lentement sur la ville, teintant les toits de nuances orangées. Dans les rues, les passants pressaient le pas, indifférents à cette beauté fugace. Seul un enfant s'arrêta pour lever les yeux.";
    const tokens = estimateTokens(text);

    const t = new Table({
        head: ['Provider', 'Tokens estimés', 'Coût / requête', 'Pour 1000 requêtes'],
    });

    for (const provider of Object.keys(PRICING)) {
        const cost = estimateCost(tokens, provider);
        t.push([
            provider,
            tokens,
            cost.toFixed(8) + '€',
            (cost * 1000).toFixed(8) + '€',
        ]);
    }

    console.log(t.toString());
}