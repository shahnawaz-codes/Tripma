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
    .map((hotel) => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotel_name + " " + hotel.hotel_address)}`;
      return `
    <div class="hotel-card avoid-break">
      <div class="hotel-image-container">
        <img class="hotel-image" src="${
          hotel.hotel_image_url ||
          "https://placehold.co/600x400.png?text=Hotel+Image"
        }" alt="${escapeHtml(hotel.hotel_name)}" />
      </div>
      <div class="hotel-info">
        <div class="hotel-header">
          <h3 class="hotel-name">${escapeHtml(hotel.hotel_name)}</h3>
          <div class="hotel-rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="#ea580c" stroke="#ea580c" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${hotel.rating || "N/A"}</span>
          </div>
        </div>
        <div class="hotel-address">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${escapeHtml(hotel.hotel_address)}</span>
        </div>
        <p class="hotel-desc">${escapeHtml(hotel.description || "")}</p>
        <div class="hotel-footer">
          <span class="hotel-price">${escapeHtml(hotel.price_per_night)}</span>
          <a class="map-btn" href="${mapsUrl}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            View Map
          </a>
        </div>
      </div>
    </div>
  `;
    })
    .join("");

  // Render Itinerary HTML
  const itineraryHtml = (trip.itinerary || [])
    .map((day) => {
      const activitiesHtml = (day.activities || [])
        .map((activity, idx) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.place_name + " " + activity.place_address)}`;
          return `
      <div class="activity-card avoid-break">
        <div class="activity-timeline-marker">
          <div class="marker-circle">${idx + 1}</div>
        </div>
        <div class="activity-card-inner">
          <div class="activity-main-layout">
            <div class="activity-details-side">
              <div class="activity-header">
                <h4 class="activity-name">${escapeHtml(activity.place_name)}</h4>
              </div>
              <div class="activity-address">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${escapeHtml(activity.place_address)}</span>
              </div>
              <p class="activity-desc">${escapeHtml(activity.place_details)}</p>
              
              <div class="activity-meta-row">
                <div class="activity-meta-pill time-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>${escapeHtml(activity.best_time_to_visit)}</span>
                </div>
                <div class="activity-meta-pill cost-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"></circle><circle cx="18" cy="18" r="4"></circle><path d="M12 18a6 6 0 0 0-6-6"></path></svg>
                  <span>${escapeHtml(activity.ticket_pricing)}</span>
                </div>
                <a class="map-btn map-btn-sm" href="${mapsUrl}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  View Map
                </a>
              </div>
            </div>
            
            ${
              activity.place_image_url
                ? `
            <div class="activity-image-side">
              <img class="activity-image" src="${activity.place_image_url}" alt="${escapeHtml(activity.place_name)}" />
            </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
        })
        .join("");

      return `
      <div class="day-section">
        <div class="day-header avoid-break">
          <div class="day-title">Day ${day.day}: ${escapeHtml(day.day_plan)}</div>
          <div class="day-time-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${escapeHtml(day.best_time_to_visit_day)}</span>
          </div>
        </div>
        <div class="activities-container">
          <div class="timeline-line"></div>
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Inter', sans-serif;
          color: #334155;
          background-color: #ffffff;
          line-height: 1.5;
          padding: 0;
          margin: 0;
          -webkit-print-color-adjust: exact;
        }
        h1, h2, h3, h4 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: #0f172a;
        }
        .header-banner {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          padding: 32px;
          border-radius: 0 0 24px 24px;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }
        .header-left {
          flex: 1;
        }
        .header-title {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .header-title span {
          color: #ffedd5;
        }
        .header-tagline {
          font-size: 14px;
          opacity: 0.9;
        }
        .header-right-card {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          min-width: 280px;
        }
        .header-meta-item {
          display: flex;
          flex-direction: column;
        }
        .header-meta-label {
          font-size: 9px;
          opacity: 0.8;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .header-meta-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        .header-meta-badge svg {
          opacity: 0.9;
          flex-shrink: 0;
        }
        .section {
          padding: 0 24px;
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-title svg {
          color: #ea580c;
          flex-shrink: 0;
        }
        
        .hotels-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hotel-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          gap: 16px;
          padding: 12px;
        }
        .hotel-image-container {
          width: 160px;
          height: 120px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          background-color: #f1f5f9;
        }
        .hotel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hotel-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 4px;
        }
        .hotel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .hotel-name {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.25;
        }
        .hotel-rating {
          background-color: #ffedd5;
          color: #ea580c;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
          flex-shrink: 0;
        }
        .hotel-rating svg {
          fill: #ea580c;
        }
        .hotel-address {
          font-size: 11px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .hotel-address svg {
          color: #94a3b8;
          flex-shrink: 0;
        }
        .hotel-desc {
          font-size: 12px;
          color: #475569;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hotel-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }
        .hotel-price {
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #d1fae5;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12px;
        }
        
        .map-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
        }
        .map-btn svg {
          color: #64748b;
          flex-shrink: 0;
        }
        .map-btn-sm {
          padding: 2px 8px;
          font-size: 10px;
          border-radius: 5px;
          gap: 4px;
        }
        
        .day-section {
          margin-bottom: 28px;
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #ea580c;
          padding-bottom: 6px;
          margin-bottom: 16px;
        }
        .day-title {
          font-size: 16px;
          font-weight: 700;
          color: #ea580c;
        }
        .day-time-badge {
          background-color: #f1f5f9;
          color: #475569;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .day-time-badge svg {
          color: #94a3b8;
        }
        .activities-container {
          position: relative;
          padding-left: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .timeline-line {
          position: absolute;
          left: 11px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background-color: #ffedd5;
        }
        .activity-card {
          position: relative;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .activity-timeline-marker {
          position: absolute;
          left: -28px;
          top: 12px;
          width: 24px;
          display: flex;
          justify-content: center;
          z-index: 10;
        }
        .marker-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ea580c;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .activity-card-inner {
          padding: 12px;
        }
        .activity-main-layout {
          display: flex;
          gap: 12px;
        }
        .activity-details-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .activity-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }
        .activity-address {
          font-size: 11px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .activity-address svg {
          color: #94a3b8;
          flex-shrink: 0;
        }
        .activity-desc {
          font-size: 12px;
          color: #475569;
          line-height: 1.4;
        }
        .activity-image-side {
          width: 100px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #f1f5f9;
        }
        .activity-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .activity-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .activity-meta-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
        }
        .activity-meta-pill svg {
          flex-shrink: 0;
        }
        .time-pill {
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        }
        .cost-pill {
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #d1fae5;
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
        <div class="header-left">
          <div class="header-title">Trip to <span>${escapeHtml(destName)}</span></div>
          <div class="header-tagline">Custom travel itinerary generated by AI Trip Planner</div>
        </div>
        <div class="header-right-card">
          <div class="header-meta-item">
            <span class="header-meta-label">Origin</span>
            <div class="header-meta-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${escapeHtml(originName)}</span>
            </div>
          </div>
          <div class="header-meta-item">
            <span class="header-meta-label">Duration</span>
            <div class="header-meta-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              <span>${escapeHtml(trip.duration)}</span>
            </div>
          </div>
          <div class="header-meta-item">
            <span class="header-meta-label">Budget</span>
            <div class="header-meta-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 0 0 4h14a1 1 0 0 0 1-1v-3"></path><path d="M3 5v14"></path></svg>
              <span>${escapeHtml(trip.budget)}</span>
            </div>
          </div>
          <div class="header-meta-item">
            <span class="header-meta-label">Group Size</span>
            <div class="header-meta-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>${escapeHtml(trip.group_size)}</span>
            </div>
          </div>
        </div>
      </div>

      ${
        hotelsHtml.length > 0
          ? `
      <div class="section">
        <div class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22v-20a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0Z"></path><path d="M13 22v-16a5 5 0 0 1 10 0v16"></path><path d="M7 6h2"></path><path d="M7 10h2"></path><path d="M7 14h2"></path><path d="M17 10h2"></path><path d="M17 14h2"></path></svg>
          <span>Featured Stays (Hotels)</span>
        </div>
        <div class="hotels-list">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"></path><polyline points="12 6 12 12 16 14"></polyline></svg>
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
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">Photo Unavailable</text></svg>';
          };
        });
      </script>
    </body>
    </html>
  `;
}
