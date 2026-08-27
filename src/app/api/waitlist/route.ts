import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Convert the JSON payload to URLSearchParams (x-www-form-urlencoded)
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, String(value));
      }
    }

    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd0eHHv-8yy8Zu5WEaeFPpxXO9_TUnK9LK3hRmniKz-1r02_w/formResponse";

    const response = await fetch(googleFormUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Google Forms formResponse returns 200 OK even on successful submission redirect
    if (!response.ok) {
      const errText = await response.text();
      console.error("Google Forms submission failed:", response.status, errText);
      return NextResponse.json({ success: false, error: "Failed to submit to Google Forms backend" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting waitlist form:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
