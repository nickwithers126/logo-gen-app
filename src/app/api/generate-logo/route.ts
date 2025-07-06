import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
    try {
        const { brandName, logoType, industry, styles, colorScheme, colors, tagline, iconConcepts } = await req.json();

        const prompt = `
        Design a single, clean, and simple ${logoType === 'text'
                ? '**typographic wordmark (text-only)**'
                : logoType === 'icon-and-text'
                    ? '**logo symbol with integrated text**'
                    : '**logo symbol only**'
            } for a brand named "${brandName}" in the ${industry} industry.

        The logo should reflect the following style attributes: ${styles.join(', ')}.
        The brand's tagline is "${tagline}", which reflects the tone and mission of the company.  
        **Do not include the tagline or slogan in the logo.**

        Create a **flat, 2D, vector-style design** with no gradients, lighting, shadows, bevels, or 3D effects.
        It must be rendered from a **flat, top-down perspective** — not tilted or angled.

        ${logoType === 'icon'
                ? `
        Do not include any text, lettering, taglines, or logotypes.
        Only design a single centered symbol — no frames, mockups, or multiple layout versions.`
                : logoType === 'text'
                    ? `
        Do not include any symbols or icons — only create a custom typographic design of the brand name.`
                    : `
        Include both a **clean, bold symbol** and **custom stylized text** of the brand name.
        The symbol and text should be visually balanced and integrated as one unified mark.`
            }

        The ${logoType === 'text'
                ? `typographic logotype`
                : logoType === 'icon-and-text'
                    ? `combined symbol and wordmark`
                    : `symbol`
            } should be modern, scalable, and minimal — inspired by logos like Apple, OpenAI, Notion, and Twitter.
        It must be bold and memorable enough to work at small sizes (like a favicon or app icon).

        ${iconConcepts ? `Incorporate subtle, abstract symbolism related to: ${iconConcepts}.` : ''}

        ${colorScheme === 'black-white'
                ? `Use **only pure black and white** — absolutely no other colors are allowed.  
        Both the logo symbol and the background must be composed using **flat black and white fills only**.  
        Do not use any other colors, tones, grays, golds, off-whites, sepia, or textured effects.  
        Avoid outlines, gradients, patterns, lighting, or visual noise.  
        Everything must be stark, clean, high-contrast, and purely black and white.  

        ⚠️ Final rule: this image must use **strictly black and white only** — no exceptions.`
                : `Use **only** the following HEX color codes in the logo: ${colors.join(', ')}.  
        These exact colors must be clearly and predominantly visible.  
        Do not use black, white, gray, or substitute with similar or approximate shades.  
        Apply the colors as **flat fills only** — no gradients, shadows, textures, or blending effects.`
            }


        The background must be a **flat, solid color** — no textures, shadows, gradients, or photographic elements.  
        For black and white logos, the background should be either pure black or pure white — **whichever provides the highest contrast** against the logo symbol.  
        If the logo is black, the background must be solid white. If the logo is white, the background must be solid black.  
        The entire composition should appear clean and digitally composed — like a vector file on a solid background.

        `.trim();



        console.log("Final prompt sent to OpenAI:", prompt);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await openai.images.generate({
            model: 'gpt-image-1',
            prompt
        });

        if (!result.data || result.data.length === 0 || !result.data[0].b64_json) {
            return NextResponse.json({ error: 'No image generated' }, { status: 500 });
        }

        const image_base64 = result.data[0].b64_json;
        const imageDataUrl = `data:image/png;base64,${image_base64}`;

        return NextResponse.json({
            data: [
                {
                    url: imageDataUrl, // This matches what your frontend expects
                },
            ],
        });


    } catch (error) {
        console.error('[API_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
