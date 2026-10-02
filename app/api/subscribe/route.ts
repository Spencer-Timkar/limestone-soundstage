import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeRequest = {
    email?: unknown;
    page?: unknown;
    source?: unknown;
    website?: unknown;
};

function cleanAttribute(value: unknown, fallback: string) {
    if (typeof value !== "string") return fallback;
    const cleaned = value.trim().slice(0, 100);
    return cleaned || fallback;
}

export async function POST(request: Request) {
    let body: SubscribeRequest;

    try {
        body = (await request.json()) as SubscribeRequest;
    } catch {
        return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    // Silently accept honeypot submissions so bots do not learn how they were detected.
    if (typeof body.website === "string" && body.website.trim()) {
        return NextResponse.json({ message: "You're on the list." });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
        return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
        console.error("Email signup is missing BREVO_API_KEY or BREVO_LIST_ID.");
        return NextResponse.json(
            { message: "Email signup is temporarily unavailable. Please try again later." },
            { status: 503 },
        );
    }

    let response: Response;

    try {
        response = await fetch(BREVO_CONTACTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                email,
                listIds: [listId],
                updateEnabled: true,
                attributes: {
                    SIGNUP_PAGE: cleanAttribute(body.page, "unknown"),
                    SIGNUP_SOURCE: cleanAttribute(body.source, "direct"),
                },
            }),
            cache: "no-store",
        });
    } catch (error) {
        console.error("Brevo contact creation request failed:", error);
        return NextResponse.json(
            { message: "We couldn't add you right now. Please try again." },
            { status: 502 },
        );
    }

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Brevo contact creation failed (${response.status}): ${errorBody.slice(0, 500)}`);
        return NextResponse.json(
            { message: "We couldn't add you right now. Please try again." },
            { status: 502 },
        );
    }

    return NextResponse.json({ message: "You're on the list." });
}
