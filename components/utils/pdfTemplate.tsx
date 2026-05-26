import { TripPlan } from "@/types/trip";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function PDF_template(trip: TripPlan): string {
  const originName = trip.origin ? trip.origin.split(",")[0] : "";
  const destName = trip.destination
    ? trip.destination.split("(")[0].trim()
    : "";

  // Render Hotels HTML
  const hotelsHtml = (trip.hotels || [])
    .map(
      (hotel) => `
    <div class="hotel-card avoid-break">
      <div class="hotel-image-container">
        <img class="hotel-image" src="${
          hotel.hotel_image_url ||
          "https://placehold.co/600x400.png?text=Image+Unavailable"
        }" alt="${escapeHtml(hotel.hotel_name)}" />
        <div class="hotel-rating">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${hotel.rating || "N/A"}</span>
        </div>
      </div>
      <div class="hotel-content">
        <div class="hotel-name">${escapeHtml(hotel.hotel_name)}</div>
        <div class="hotel-address">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${escapeHtml(hotel.hotel_address)}</span>
        </div>
        <div class="hotel-desc" style="font-size: 12px; color: #525252; margin: 4px 0 12px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(hotel.description || "")}
        </div>
        <div class="hotel-price">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align: middle; margin-right: 4px;"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 0 0 4h14a1 1 0 0 0 1-1v-3"></path><path d="M3 5v14"></path></svg>
          <span>${escapeHtml(hotel.price_per_night)}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // Render Itinerary HTML
  const itineraryHtml = (trip.itinerary || [])
    .map((day) => {
      const activitiesHtml = (day.activities || [])
        .map(
          (activity, idx) => `
      <div class="activity-card avoid-break">
        <div class="activity-image-container">
          <img class="activity-image" src="${
            activity.place_image_url ||
            "https://placehold.co/600x400.png?text=Image+Unavailable"
          }" alt="${escapeHtml(activity.place_name)}" />
          <div class="activity-stop">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            <span>Stop ${idx + 1}</span>
          </div>
        </div>
        <div class="activity-content">
          <div>
            <div class="activity-name">${escapeHtml(activity.place_name)}</div>
            <div class="activity-address">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${escapeHtml(activity.place_address)}</span>
            </div>
          </div>
          <div class="activity-details">${escapeHtml(activity.place_details)}</div>
          <div class="activity-meta-grid">
            <div class="meta-item">
              <span class="meta-label">Time</span>
              <div class="meta-value meta-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${escapeHtml(activity.best_time_to_visit)}</span>
              </div>
            </div>
            <div class="meta-item">
              <span class="meta-label">Cost</span>
              <div class="meta-value meta-cost">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"></circle><circle cx="18" cy="18" r="4"></circle><path d="M12 18a6 6 0 0 0-6-6"></path></svg>
                <span>${escapeHtml(activity.ticket_pricing)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
        )
        .join("");

      return `
      <div class="day-container avoid-break">
        <div class="day-header">
          <div class="day-title">Day ${day.day}: ${escapeHtml(day.day_plan)}</div>
          <div class="day-time-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${escapeHtml(day.best_time_to_visit_day)}</span>
          </div>
        </div>
        <div class="activity-grid">
          ${activitiesHtml}
        </div>
      </div>
    `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Trip Itinerary - ${escapeHtml(destName)}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Inter', sans-serif;
          color: #171717;
          background-color: #ffffff;
          line-height: 1.5;
          padding: 0;
          margin: 0;
          -webkit-print-color-adjust: exact;
        }
        h1, h2, h3, h4 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
        }
        .header-banner {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          padding: 40px 32px;
          border-radius: 0 0 32px 32px;
          margin-bottom: 40px;
        }
        .header-title {
          font-size: 38px;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .header-title span {
          color: #ffedd5;
        }
        .header-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .meta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
        }
        .meta-badge svg {
          opacity: 0.9;
        }
        .section {
          padding: 0 32px;
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #171717;
          margin-bottom: 20px;
          border-bottom: 2px solid #f5f5f5;
          padding-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hotel-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .hotel-card {
          background-color: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .hotel-image-container {
          height: 150px;
          position: relative;
          background-color: #f3f4f6;
        }
        .hotel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hotel-rating {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hotel-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 8px;
        }
        .hotel-name {
          font-size: 16px;
          font-weight: 700;
          color: #171717;
          line-height: 1.3;
        }
        .hotel-address {
          font-size: 12px;
          color: #737373;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hotel-address svg {
          flex-shrink: 0;
        }
        .hotel-price {
          background-color: rgba(16, 185, 129, 0.08);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          align-self: flex-start;
          margin-top: auto;
          display: flex;
          align-items: center;
        }
        .day-container {
          margin-bottom: 36px;
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #ea580c;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }
        .day-title {
          font-size: 18px;
          font-weight: 700;
          color: #ea580c;
        }
        .day-time-badge {
          background-color: #f4f4f5;
          color: #52525b;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .activity-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .activity-card {
          background-color: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .activity-image-container {
          height: 120px;
          position: relative;
          background-color: #f3f4f6;
        }
        .activity-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .activity-stop {
          position: absolute;
          top: 8px;
          left: 8px;
          background-color: rgba(255, 255, 255, 0.9);
          color: #171717;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 700;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .activity-content {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 8px;
        }
        .activity-name {
          font-size: 14px;
          font-weight: 700;
          color: #171717;
          line-height: 1.3;
        }
        .activity-address {
          font-size: 11px;
          color: #737373;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .activity-address svg {
          flex-shrink: 0;
        }
        .activity-details {
          font-size: 12px;
          color: #525252;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .activity-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          background-color: #ffffff;
          border: 1px solid #e5e5e5;
          padding: 6px;
          border-radius: 10px;
          margin-top: auto;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .meta-label {
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          color: #a3a3a3;
        }
        .meta-value {
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .meta-time {
          color: #2563eb;
        }
        .meta-cost {
          color: #059669;
        }
        
        @media print {
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-break {
            page-break-before: always !important;
            break-before: always !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="header-banner">
        <div class="header-title">Your trip from <span>${escapeHtml(originName)}</span> to <span>${escapeHtml(destName)}</span> is ready</div>
        <div class="header-meta">
          <div class="meta-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
            <span>${escapeHtml(trip.duration)}</span>
          </div>
          <div class="meta-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 0 0 4h14a1 1 0 0 0 1-1v-3"></path><path d="M3 5v14"></path></svg>
            <span>${escapeHtml(trip.budget)}</span>
          </div>
          <div class="meta-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>${escapeHtml(trip.group_size)}</span>
          </div>
        </div>
      </div>

      ${
        hotelsHtml.length > 0
          ? `
      <div class="section avoid-break">
        <div class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22v-20a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0Z"></path><path d="M13 22v-16a5 5 0 0 1 10 0v16"></path><path d="M7 6h2"></path><path d="M7 10h2"></path><path d="M7 14h2"></path><path d="M17 10h2"></path><path d="M17 14h2"></path></svg>
          <span>Featured Stays (Hotels)</span>
        </div>
        <div class="hotel-grid">
          ${hotelsHtml}
        </div>
      </div>
      `
          : ""
      }

      ${
        itineraryHtml.length > 0
          ? `
      <div class="section">
        <div class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M2 2h20"></path></svg>
          <span>Daily Itinerary</span>
        </div>
        <div>
          ${itineraryHtml}
        </div>
      </div>
      `
          : ""
      }

      <script>
        document.querySelectorAll('img').forEach(img => {
          img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Outfit, sans-serif" font-size="20" fill="%239ca3af">Image Unavailable</text></svg>';
          };
        });
      </script>
    </body>
    </html>
  `;
}
