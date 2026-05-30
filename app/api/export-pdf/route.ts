import { PDF_template } from "@/components/pdf/pdf-template";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  let browser;
  try {
    const body = await req.json();
    const { tripId } = body;
    if (!tripId) {
      return NextResponse.json({ error: "Missing tripId" }, { status: 400 });
    }

    const { getToken } = await auth();
    const token = (await getToken({ template: "convex" })) ?? undefined;
    const trip = await fetchQuery(
      api.trips.getTripById,
      {
        tripId: tripId as Id<"trips">,
      },
      { token },
    );
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
    await page.setContent(htmlContent, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size: 8px; font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; width: 100%; text-align: right; padding-right: 15mm; color: #94a3b8; font-weight: 500;">AI TRIP PLANNER</div>`,
      footerTemplate: `
        <div style="font-size: 8px; font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; width: 100%; display: flex; justify-content: space-between; padding-left: 15mm; padding-right: 15mm; color: #94a3b8; font-weight: 500;">
          <span>Generated Itinerary</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "20mm",
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
