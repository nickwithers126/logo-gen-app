import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { brandName, industry, styles, colorScheme, colors, tagline, iconConcepts } = await req.json();

        const prompt = `Design a single, clean, and simple **logo symbol only** for a brand named "${brandName}" in the ${industry} industry.
        The logo should reflect the following style attributes: ${styles.join(', ')}.
        The brand's tagline is "${tagline}", which reflects the tone and mission of the company.

        Create a **flat, 2D, vector-style icon** with no gradients, lighting, shadows, bevels, or 3D effects.
        It must be rendered from a **flat, top-down perspective** — not tilted or angled.

        Do not include any text, lettering, logotypes, taglines, or multiple logo versions.
        Do not include mockups, embossing, shadows, paper textures, or product preview layouts.
        Output only **one centered symbol**, with no frames or additional layout elements.

        The symbol should be modern, scalable, and minimal — inspired by logos like Apple, OpenAI, Notion, and Twitter.
        It must be bold and memorable enough to work at small sizes (like a favicon or app icon).

        ${iconConcepts ? `Incorporate subtle, abstract symbolism related to: ${iconConcepts}.` : ''}

        ${colorScheme === 'black-white'
        ? 'Use only black and white.'
        : `Use **only** the following HEX color codes in the logo symbol: ${colors.join(', ')}.
        These exact colors must be clearly and predominantly visible in the symbol.
        Do not use black, white, gray, or substitute with similar or approximate shades.
        Apply the colors as **flat fills only** — no gradients or blending effects.`}

        The background must be a **flat, solid color** — no textures, shadows, gradients, or photographic elements. 
        The entire composition should appear clean and digitally composed — like a vector file on a solid background.`.trim();

        console.log("Final prompt sent to OpenAI:", prompt);

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: '1024x1024',
            }),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[API_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
