import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
    try {
        const { brandName, logoType, industry, styles, colorScheme, colors, tagline, iconConcepts } = await req.json();

        const subject = logoType === 'text'
            ? 'typographic wordmark (text-only)'
            : logoType === 'icon-and-text'
                ? 'logo symbol with integrated text'
                : 'standalone logo symbol';

        const prompt = `
        Professional vector logo design: a clean, modern ${subject} for a brand named "${brandName}" in the ${industry} industry.

        Style: ${styles.join(', ')}.

        Brand tagline (for tone only, do not render this text): "${tagline}". Let its meaning inform the mood, symbolism, or composition of the design.

        ${logoType === 'icon'
                ? 'Exclude all text and logotypes. Focus solely on a strong, centered symbol.'
                : logoType === 'text'
                    ? 'Do not include any iconography or symbols — only a custom stylized wordmark.'
                    : 'Include both a bold, minimal symbol and a custom stylized brand name, combined into one cohesive unit.'}

        Incorporate visual elements or ideas related to: ${iconConcepts}. Blend or abstract these themes as needed, but make sure at least one is clearly recognizable in the final design.

        Avoid using letters or initials unless it fits extremely naturally and strengthens the concept. If letters are used, they must be limited to the brand's first letter ("${brandName[0]}") or initials formed from the first letters of each word (e.g., "TD" for "Top Defense") — never letters that don't begin a word.

        Design requirements:
        - Flat, 2D, top-down vector illustration — no gradients, shadows, lighting, bevels, textures, or 3D effects.
        - Minimal, bold, and iconic — must stay legible and recognizable at small sizes (favicon/app-icon scale).
        - Clean, balanced, evenly-spaced composition with no clutter or misaligned elements.
        - Solid, flat background color as part of the composition (never transparent), chosen for maximum contrast against the logo.
        - No mockups, photographic elements, lettering artifacts, or watermarks.

        ${colorScheme === 'black-white'
                ? 'Color: pure black and white only, in solid flat fills — no grays, sepia tones, outlines, gradients, or textures. Use whichever of black or white gives the background the strongest contrast against the logo.'
                : colors?.length > 0
                    ? `Color: use only these exact HEX values — ${colors.join(', ')} — as solid flat fills, clearly and predominantly visible. Do not substitute black, white, gray, or approximate shades.`
                    : ''}
        `.trim();

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await openai.images.generate({
            model: 'gpt-image-2.5-flare',
            prompt,
            quality: 'high',
            size: '1024x1024',
            background: 'opaque',
        });

        if (!result.data || result.data.length === 0 || !result.data[0].b64_json) {
            return NextResponse.json({ error: 'No image generated' }, { status: 500 });
        }

        const image_base64 = result.data[0].b64_json;
        const imageDataUrl = `data:image/png;base64,${image_base64}`;

        return NextResponse.json({
            data: [
                {
                    url: imageDataUrl,
                },
            ],
        });

    } catch (error) {
        console.error('[API_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
