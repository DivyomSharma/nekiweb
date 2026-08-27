import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Fetch the Google Form viewform to get a fresh session and fbzx token
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd0eHHv-8yy8Zu5WEaeFPpxXO9_TUnK9LK3hRmniKz-1r02_w/viewform";
    const getResponse = await fetch(googleFormUrl, {
      cache: "no-store"
    });
    const htmlText = await getResponse.text();

    const fbzxMatch = htmlText.match(/name="fbzx" value="([^"]+)"/);
    const fbzx = fbzxMatch ? fbzxMatch[1] : "";

    // 2. Prepare the payload as x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("fvv", "1");
    formData.append("pageHistory", "0");
    if (fbzx) {
      formData.append("fbzx", fbzx);
    }

    for (const [key, value] of Object.entries(body)) {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, String(value));
      }
    }

    const postUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd0eHHv-8yy8Zu5WEaeFPpxXO9_TUnK9LK3hRmniKz-1r02_w/formResponse";

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    const isRecorded = responseText.toLowerCase().includes("recorded");
    
    if (!response.ok || !isRecorded) {
      console.error("Google Forms submission failed. Status:", response.status);
      return NextResponse.json({ success: false, error: "Validation failure on Google Forms" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting waitlist form:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
