# 🗺️ AI Trip Planner

A high-performance, interactive **AI-powered Trip Planner** built using Next.js, Convex, Clerk, and Arcjet. This application guides users through a chat-based flow using **Generative UI** to collect travel preferences, dynamically generating highly detailed daily itineraries, curated hotel stays, and interactive mapping coordinates.

---

## 🚀 Technical Highlights (Recruiter's Quick-View)
* **Advanced AI Fallback Orchestration**: Integrates a robust self-healing LLM chain via **OpenRouter** that cascades through multiple models (Gemini-3, Gemini-2.5, LLaMA-3.3, Qwen-3, GPT-OSS) to guarantee structured, valid JSON outputs.
* **Serverless PDF Export Pipeline**: Generates clean, publication-quality A4 PDF travel itineraries. Utilizes a remote browserless API (`chrome.browserless.io`) in cloud environments to avoid cold starts and large function bundles, falling back to local Puppeteer in dev and a dynamic `@sparticuz/chromium-min` loader on AWS Lambda/Vercel.
* **Asynchronous Wikipedia Image Harvester**: Sourced dynamically via serverless Convex actions, querying by place name first and falling back to a 500-meter coordinate-based geo-search. Employs background status tracking (`pending`, `completed`, `failed`) to keep the search UI instantly interactive.
* **Interactive Generative UI**: Leverages stateful React components rendering directly inside the chat flow to gather trip details (destination, duration, budget, group size) organically.
* **3D Globe Mapping & Geo-Plotting**: Integrates **MapLibre GL** and **React Map GL** to render custom markers, interactive tooltips, and geographic activity pins on a spherical 3D globe.
* **Enterprise-Grade Rate Limiting**: Uses **Arcjet** for token-bucket rate limiting (2 generation credits per 24 hours) with plan checking (`monthly` subscription checks via Clerk Auth) to protect the backend and control LLM API expenses.
* **Low-Latency Real-Time Database**: Uses **Convex** as the backend database, ensuring instant document synchronization, serverless execution, and type-safe schema constraints.
* **PWA Standalone App**: Configured via Next.js metadata-routes (`manifest.ts`) for mobile installer screens and standalone display.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Key Role & Capabilities |
|---|---|---|
| **Frontend Framework** | **Next.js 16 (App Router)** & **React 19** | Dynamic page rendering, directory-based routing, server actions, and layout isolation. |
| **Backend & Database** | **Convex Backend** | Serverless real-time data layer with type-safe query/mutation schemas and automatic scaling. |
| **Authentication** | **Clerk Auth** | Multi-tenant auth, profile mapping, protected route middleware, and subscription metadata. |
| **Security & Shield** | **Arcjet Next.js SDK** | Token-bucket rate limiting, bot protection, and credit allocation checking. |
| **AI Processing** | **OpenRouter SDK / Gemini API** | Prioritized model fallback, system instruction tuning, and strict JSON output parsing. |
| **PDF Generation** | **Puppeteer & Browserless** | Server-side PDF export with offloaded rendering and Lambda-compatible local fallbacks. |
| **Interactive Maps** | **MapLibre GL & React Map GL** | Voyager-style map tiles, custom SVG interactive markers, and 3D Globe projection. |
| **Styling & Motion** | **Tailwind CSS v4**, **Shadcn UI**, **Motion** | Fluid micro-animations, theme-tailored layout tokens, and interactive skeleton states. |
| **State Management** | **Zustand** | Minimalist, type-safe global client state management. |

---

## 🧠 Core Engineering & Systems Design

### 1. Interactive Generative UI Chatflow
Instead of static input form spreadsheets, the application utilizes a stateful chat interface. As the conversation flows, the system injects custom React inputs directly into the chat stream:
* **Interactive Badges**: Renders quick-clickable cards for popular departure and arrival destinations.
* **Visual Tiers**: Displays distinct graphical cards with descriptions for Budget (`Low`, `Moderate`, `Luxury`) and Group Size (`Solo`, `Couple`, `Family`, `Friends`) utilizing CSS scale-up effects.
* **Custom Calendar Widget**: Renders a dedicated duration selection widget inside the scrollable view.

### 2. Self-Healing LLM Fallback Chain (`/api/generate-trip`)
To prevent app failures caused by model timeouts, rate limits, or malformed text output, the backend handles trip generation using a multi-model fallback chain:
1. **Fallback List**: Chains `google/gemini-3-flash-preview`, `google/gemini-2.5-flash-lite`, `google/gemini-2.5-flash`, `google/gemini-3.1-flash-lite`, `google/gemma-4-31b-it:free`, etc.
2. **Tag Cleansing**: Automatically strips XML reasoning/thinking tags (e.g. `<think>...</think>`).
3. **Regex JSON Extractor**: Extracts objects matching the strict target schema (containing `hotels` and `itinerary` sub-arrays) even if models wrap the response in markdown blocks.
4. **Resort Defaulting**: Gracefully falls back to a structural text template if all JSON parses fail, ensuring zero downtime.

### 3. API Route Rate-Limiting & Credit Controls
To protect endpoints from abuse, infinite loops, and heavy API bills:
* Instantiates an **Arcjet token-bucket rule** inside the backend routes.
* Dynamically checks if the authenticated user has a `monthly` plan configured in their Clerk metadata.
* Free users are limited to 2 generation credits, refilling every 24 hours. When limits are reached, the app presents a premium upsell overlay directing users to the pricing page.

### 4. 3D Globe Activity Mapping
Provides visual itinerary coordinates directly in the browser:
* Sets MapLibre projection mode to `globe` for a realistic spherical representation.
* Traverses the dynamic `tripPlan` document in real-time to locate coordinates.
* Renders custom SVG marker pins containing green status indicators.
* Displays a detailed popup overlay on hover, revealing name, cost, rating, and description.

### 5. Serverless PDF Export Pipeline (`/api/export-pdf`)
To allow users to save and print their custom itineraries, the app includes a robust server-side PDF generator:
* **Offloaded Browserless Rendering**: In production, if `BLESS_TOKEN` is configured, HTML templates are sent to Browserless.io (`chrome.browserless.io`) to generate the PDF. This keeps the serverless function bundle small and eliminates execution overhead on Vercel.
* **Production Fallback**: If no token is provided, it dynamically loads `puppeteer-core` and `@sparticuz/chromium-min` to fetch and execute Chromium on AWS Lambda/Vercel. It dynamically prepends the Chromium directory and environment subdirectories (`al2` and `al2023`) to `LD_LIBRARY_PATH` to resolve system shared libraries (`libnss3.so`, `libnspr4.so`, etc.).
* **Local Puppeteer Integration**: Detects local development environments (`NODE_ENV === "development"`) and swaps to local standard `puppeteer` to avoid downloading large Chromium archives repeatedly.
* **Layout Design**: Uses an elegant CSS print template styled with A4 margins, page numbering ("Page X of Y"), and clean header templates.

### 6. Wikipedia Geo-Location Image Harvester (`convex/imags.ts` & `lib/wikipedia.ts`)
Fetching photos for hotels and itinerary activities in real-time can block page rendering. The application offloads this to Convex asynchronous background actions:
* **Dual-Search Algorithm**: First queries the Wikipedia API using the hotel or place name. If no results are returned, it falls back to a geo-location coordinate search (`ggscoord`) looking for landmarks within a 500-meter radius of the latitude and longitude.
* **State-Driven Rendering**: The trip's images are tracked in Convex via `imagStatus` (`"pending" | "completed" | "failed"`). While images fetch in the background, the UI displays loading skeleton animations, instantly updating once complete.
* **Self-Healing Fallbacks**: If Wikipedia returns no images or the action fails, the system marks the status as `failed` and serves styled local placeholder SVGs or Unsplash images rather than breaking the application layout.

---

## 🗄️ Database Schema (`convex/schema.ts`)
The application defines a strict, type-safe schema ensuring data consistency:

* **`users` Table**:
  * Fields: `name` (string), `imgUrl` (string), `email` (string), `subscription` (optional string).
  * Index: `by_email` for sub-millisecond profile querying.
* **`trips` Table**:
  * Fields:
    * `userEmail` (string) - Creator's email identifier.
    * `shareId` (optional string) - Unique UUID for public trip sharing.
    * `imagStatus` (optional string: `"pending" | "completed" | "failed"`) - Track state of background image generator.
    * `tripPlan` (object containing:
      * `destination` (string), `duration` (string), `origin` (string), `budget` (string), `group_size` (string).
      * `hotels`: Array of objects (containing `hotel_name`, `hotel_address`, `price_per_night`, `rating`, `description`, `geo_coordinates: { latitude, longitude }`, and optional `hotel_image_url`).
      * `itinerary`: Array of day objects (containing `day`, `day_plan`, `best_time_to_visit_day`, and nested `activities` containing `place_name`, `place_details`, `geo_coordinates: { latitude, longitude }`, `place_address`, `ticket_pricing`, `time_travel_each_location`, `best_time_to_visit`, and optional `place_image_url`).
  * Indexes:
    * `by_email` (querying user's plans)
    * `by_shareId` (public lookup)

---

## 🛠️ Local Development & Installation

### Prerequisites
* Node.js (v20 or higher)
* npm, pnpm, or bun

### 1. Clone & Install Dependencies
```bash
git clone <your-repository-url>
cd ai-trip-planner
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Convex Database URL
NEXT_PUBLIC_CONVEX_URL=your_convex_url_endpoint

# Security & API Credentials
ARCJET_KEY=your_arcjet_key
OPENROUTER_API_KEY=your_openrouter_api_key

# PDF Generation Offloading (Optional for local dev, recommended for production)
BLESS_TOKEN=your_browserless_token
```

### 3. Run the Convex Backend
Convex functions must run in development mode. In a separate terminal session, execute:
```bash
npx convex dev
```
*This synchronizes your local mutations/queries with Convex and sets up the serverless backend environment.*

### 4. Start the Frontend Dev Server
Run the development environment locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
