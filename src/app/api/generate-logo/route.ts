import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
    try {
        const { brandName, logoType, industry, styles, colorScheme, colors, tagline, iconConcepts } = await req.json();

        const prompt = `
        Design a clean, modern ${logoType === 'text'
                ? 'typographic wordmark (text-only)'
                : logoType === 'icon-and-text'
                    ? 'logo symbol with integrated text'
                    : 'standalone logo symbol'} for a brand named "${brandName}" in the ${industry} industry.

        The style should reflect: ${styles.join(', ')}.

        The brand's tagline is: "${tagline}".  
        Use this to influence the visual tone — interpret its meaning creatively through symbolism, composition, or mood.  
        **Do not include the actual text of the tagline in the logo.**

        Create a flat, 2D, top-down vector design — no gradients, shadows, lighting, bevels, or 3D effects.

        ${logoType === 'icon'
                ? `Exclude all text and logotypes. Focus solely on a strong, centered symbol.`
                : logoType === 'text'
                    ? `Do not include any iconography or symbols — only a custom stylized wordmark.`
                    : `Include both a bold, minimal symbol and a custom stylized brand name — they should form one cohesive unit.`}

        Incorporate elements or ideas related to: ${iconConcepts}.  
        These are themes or visual cues the user would like to see represented in the design.  
        They can be blended, abstracted, or interpreted symbolically — at least one should be clearly reflected in the final design.

        In most cases, do **not** include any letters or initials in the design.  
        Only do so if it fits extremely naturally and enhances the concept without making the logo feel forced.  
        If used, only include the first letter of the brand (e.g., "${brandName[0]}") or initials (e.g., "TD" for "Top Defense") — but never letters that do not begin a word.

        The ${logoType === 'text'
                ? 'wordmark'
                : logoType === 'icon-and-text'
                    ? 'combined logo'
                    : 'symbol'} should be minimal, scalable, and iconic.  
        It must be bold and recognizable at small sizes (like a favicon or app icon).

        ${colorScheme === 'black-white'
                ? `Use only pure black and white — no other colors or shades.  
        The logo and background must use solid black and white flat fills.  
        Avoid grays, sepia, outlines, gradients, or textured effects.  
        Choose either black or white as the background — whichever provides the highest contrast against the logo.`
                : colors?.length > 0
                    ? `Use only the following HEX color codes: ${colors.join(', ')}.  
        These exact values must be clearly and predominantly visible.  
        Do not use black, white, gray, or approximate substitutes. Use flat fills only — no gradients, shadows, or blending effects.`
                    : ''}

        Ensure the design has clean, consistent spacing throughout.  
        Avoid clutter, awkward gaps, or misaligned elements.  
        Every part of the composition should feel intentional and balanced.

        The final image must have a **flat, solid background color** as part of the composition — it should not be transparent.  
        Choose a background that provides strong contrast with the logo for maximum visibility.  
        Do not use mockups, lighting, photographic elements, or textured effects.
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
