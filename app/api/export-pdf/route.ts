import { PDF_template } from "@/components/pdf/pdf-template";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";
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

    const BLESS_TOKEN = process.env.BLESS_TOKEN;
    let pdfBuffer: any;

    if (BLESS_TOKEN) {
      // Use Browserless REST API (offloaded headless Chrome)
      const response = await fetch(`https://chrome.browserless.io/pdf?token=${BLESS_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          html: htmlContent,
          options: {
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
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Browserless API error: ${response.statusText} - ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      pdfBuffer = Buffer.from(arrayBuffer);
    } else {
      // Fallback for local development or if token is not configured
      const isLocal = process.env.NODE_ENV === "development" || !process.env.VERCEL;

      if (isLocal) {
        // In local development, we dynamically import the standard 'puppeteer' package
        const puppeteer = await import("puppeteer");
        browser = await puppeteer.default.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      } else {
        console.warn("BLESS_TOKEN is not defined in production. Falling back to local chromium-min.");
        
        if (!process.env.AWS_EXECUTION_ENV) {
          process.env.AWS_EXECUTION_ENV = "AWS_Lambda_nodejs20.x";
        }
        const puppeteerCore = await import("puppeteer-core");
        const chromium = (await import("@sparticuz/chromium-min")).default;
        chromium.setGraphicsMode = false;

        const executablePath = await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar",
        );

        // Prepend the Chromium directory and its specific environment subdirectories (al2023, al2)
        // to LD_LIBRARY_PATH so the OS can find shared libraries like libnss3.so and libnspr4.so
        const path = await import("path");
        const execDir = path.dirname(executablePath);
        const al2023LibDir = path.join(execDir, "al2023", "lib");
        const al2LibDir = path.join(execDir, "al2", "lib");

        const newPaths = `${execDir}:${al2023LibDir}:${al2LibDir}`;
        if (process.env.LD_LIBRARY_PATH) {
          process.env.LD_LIBRARY_PATH = `${newPaths}:${process.env.LD_LIBRARY_PATH}`;
        } else {
          process.env.LD_LIBRARY_PATH = newPaths;
        }

        browser = await puppeteerCore.default.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: executablePath,
          headless: chromium.headless,
          env: {
            ...process.env,
            LD_LIBRARY_PATH: process.env.LD_LIBRARY_PATH,
          },
        });
      }

      const page = await browser.newPage();

      // Render the HTML template, wait for resources to finish loading, generate the PDF buffer
      await page.setContent(htmlContent, { waitUntil: "load" });

      pdfBuffer = await page.pdf({
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
    }

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
