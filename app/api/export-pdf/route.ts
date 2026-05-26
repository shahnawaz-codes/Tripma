import { PDF_template } from "@/components/utils/pdfTemplate";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  let browser;
  try {
    const body = await req.json();
    const { tripId } = body;
    if (!tripId) {
      return NextResponse.json({ error: "Missing tripId" }, { status: 400 });
    }

    const trip = await fetchQuery(api.trips.getTripById, {
      tripId: tripId as Id<"trips">,
    });
    if (!trip || !trip.tripPlan) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const htmlContent = PDF_template(trip.tripPlan);

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    //Render the HTML template, wait for resources to finish loading, generate the PDF buffer
    await page.setContent(htmlContent, { waitUntil: "networkidle0" as any });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="trip-itinerary-${tripId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || "" },
      { status: 500 },
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
