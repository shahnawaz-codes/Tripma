"use client";
import { Timeline } from "@/components/ui/timeline";
import {
  MapPin,
  Star,
  Clock,
  Coins,
  Users,
  Calendar,
  Map,
  Navigation,
  BedDouble,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TRIP_DATA = {
  budget: "Moderate",
  destination: "South Korea (Seoul & Surroundings)",
  duration: "7 days",
  group_size: "Family (4 members)",
  hotels: [
    {
      description:
        "Luxury city‑center hotel with spacious family rooms, indoor pool, kids' lounge and easy access to Myeong‑dong and Gyeongbokgung Palace.",
      geo_coordinates: {
        latitude: 37.5663,
        longitude: 126.9983,
      },
      hotel_address: "30, Eulji-ro, Jung-gu, Seoul 04533, South Korea",
      hotel_image_url: "https://example.com/images/lotte_hotel_seoul.jpg",
      hotel_name: "Lotte Hotel Seoul",
      price_per_night: "USD 150",
      rating: 4.5,
    },
    {
      description:
        "Serviced apartments with kitchenettes, perfect for families who want a home‑like stay while staying close to Seoul Station.",
      geo_coordinates: {
        latitude: 37.5597,
        longitude: 126.9792,
      },
      hotel_address:
        "40, Sejong-daero 23‑gil, Jung-gu, Seoul 04538, South Korea",
      hotel_image_url: "https://example.com/images/fraser_namdaemun.jpg",
      hotel_name: "Fraser Place Namdaemun",
      price_per_night: "USD 120",
      rating: 4.2,
    },
    {
      description:
        "Family‑friendly resort adjacent to Everland theme park, featuring water park access, shuttle service and family‑size suites.",
      geo_coordinates: {
        latitude: 37.2924,
        longitude: 127.1816,
      },
      hotel_address:
        "1992, Everland-ro, Pogok-eup, Cheoin-gu, Yongin-si, Gyeonggi-do 17104, South Korea",
      hotel_image_url: "https://example.com/images/everland_resort.jpg",
      hotel_name: "Gyeonggi Resort Hotel (Everland)",
      price_per_night: "USD 130",
      rating: 4.3,
    },
  ],
  itinerary: [
    {
      activities: [
        {
          best_time_to_visit: "Morning arrival",
          geo_coordinates: {
            latitude: 37.4602,
            longitude: 126.4407,
          },
          place_address:
            "Incheon International Airport, Jung‑in‑gu, Incheon, South Korea",
          place_details:
            "Take the AREX Express Train (≈43 min) or a pre‑booked private van to your hotel in central Seoul.",
          place_image_url: "https://example.com/images/arex_train.jpg",
          place_name: "Incheon International Airport → Hotel Transfer",
          ticket_pricing:
            "USD 10 per adult (AREX) / Private transfer USD 60 total",
          time_travel_each_location: "≈45 min",
        },
        {
          best_time_to_visit: "Sunset (around 7 pm) for city lights",
          geo_coordinates: {
            latitude: 37.5512,
            longitude: 126.9882,
          },
          place_address:
            "105 Namsangongwon-gil, Yongsan-gu, Seoul 04340, South Korea",
          place_details:
            "Enjoy panoramic city views, cable‑car ride up Namsan Hill and a light dinner at the revolving restaurant.",
          place_image_url: "https://example.com/images/n_seoul_tower.jpg",
          place_name: "Namsan Seoul Tower (N‑Seoul Tower)",
          ticket_pricing:
            "USD 12 adults, USD 8 children (cable car + observatory)",
          time_travel_each_location: "30 min from hotel, 2 hr visit",
        },
      ],
      best_time_to_visit_day: "Afternoon‑Evening",
      day: 1,
      day_plan: "Arrival & Settling In",
    },
    {
      activities: [
        {
          best_time_to_visit: "10:00 am – 12:00 pm (avoid lunch crowds)",
          geo_coordinates: {
            latitude: 37.5796,
            longitude: 126.977,
          },
          place_address: "161 Sajik-ro, Jongno-gu, Seoul 03045, South Korea",
          place_details:
            "Guided tour of the main royal palace, guard‑changing ceremony, and optional hanbok rental for family photos.",
          place_image_url: "https://example.com/images/gyeongbokgung.jpg",
          place_name: "Gyeongbokgung Palace",
          ticket_pricing:
            "USD 3 adults, free for children under 6; hanbok rental USD 15 per person",
          time_travel_each_location: "15 min from hotel, 2 hr visit",
        },
        {
          best_time_to_visit: "Mid‑morning",
          geo_coordinates: {
            latitude: 37.5826,
            longitude: 126.983,
          },
          place_address: "37 Gyedong-gil, Jongno-gu, Seoul 03045, South Korea",
          place_details:
            "Stroll through preserved traditional houses, craft workshops, and tea houses.",
          place_image_url: "https://example.com/images/bukchon_hanok.jpg",
          place_name: "Bukchon Hanok Village",
          ticket_pricing: "Free (guided walk optional USD 10 per person)",
          time_travel_each_location:
            "10 min walk from Gyeongbokgung, 1.5 hr visit",
        },
        {
          best_time_to_visit: "Early afternoon",
          geo_coordinates: {
            latitude: 37.574,
            longitude: 126.985,
          },
          place_address: "Insadong-gil, Jongno-gu, Seoul 03158, South Korea",
          place_details:
            "Shopping for souvenirs, street food, and a traditional Korean lunch in a family‑friendly restaurant.",
          place_image_url: "https://example.com/images/insadong.jpg",
          place_name: "Insadong Street",
          ticket_pricing: "Free entry; meal approx. USD 8‑12 per person",
          time_travel_each_location: "5 min walk, 2 hr lunch + shopping",
        },
      ],
      best_time_to_visit_day: "Morning‑Afternoon",
      day: 2,
      day_plan: "Cultural Heart of Seoul",
    },
    {
      activities: [
        {
          best_time_to_visit: "09:00 am – 12:00 pm",
          geo_coordinates: {
            latitude: 37.5126,
            longitude: 127.0588,
          },
          place_address:
            "531 Bongeunsa-ro, Gangnam-gu, Seoul 06164, South Korea",
          place_details:
            "Morning meditation session at Bongeunsa followed by a relaxed walk in the adjoining COEX Mall’s aquarium and kid‑friendly exhibition zones.",
          place_image_url: "https://example.com/images/bongeunsa.jpg",
          place_name: "Bongeunsa Temple & COEX Mall",
          ticket_pricing:
            "Temple free; COEX Aquarium USD 12 adults, USD 8 children",
          time_travel_each_location:
            "30 min by subway (Line 2 → Samseong), 3 hr total",
        },
        {
          best_time_to_visit: "Afternoon (1:00 pm – 4:00 pm)",
          geo_coordinates: {
            latitude: 37.5443,
            longitude: 127.0395,
          },
          place_address:
            "273 Ttukseom-ro, Seongdong-gu, Seoul 04763, South Korea",
          place_details:
            "Picnic, bike rentals, deer enclosure, and playgrounds – perfect for a low‑key family afternoon.",
          place_image_url: "https://example.com/images/seoul_forest.jpg",
          place_name: "Seoul Forest",
          ticket_pricing: "Free entry; bike rental USD 5 per hour",
          time_travel_each_location:
            "20 min subway (Bundang Line → Seoul Forest Station), 2 hr visit",
        },
        {
          best_time_to_visit: "After sunset (7:30 pm – 10:00 pm)",
          geo_coordinates: {
            latitude: 37.5663,
            longitude: 127.011,
          },
          place_address: "281 Eulji-ro, Jung-gu, Seoul 04566, South Korea",
          place_details:
            "Evening stroll to watch the LED rose garden light show; optional late‑night street food market.",
          place_image_url: "https://example.com/images/ddp_night.jpg",
          place_name: "Dongdaemun Design Plaza (DDP) Night Light Show",
          ticket_pricing: "Free; street food approx. USD 5‑10 per person",
          time_travel_each_location:
            "25 min subway (Line 2 → Dongdaemun History & Culture Park), 1.5 hr",
        },
      ],
      best_time_to_visit_day: "Morning‑Evening",
      day: 3,
      day_plan: "Relaxation & Nature",
    },
    {
      activities: [
        {
          best_time_to_visit: "Early morning arrival to beat queues",
          geo_coordinates: {
            latitude: 37.2927,
            longitude: 127.1764,
          },
          place_address:
            "1992 Everland-ro, Pogok-eup, Cheoin-gu, Yongin-si, Gyeonggi-do 17104, South Korea",
          place_details:
            "K‑kids zone, Safari Expedition, T‑Express wooden coaster, and the seasonal flower garden. Hotel shuttle provided by Gyeonggi Resort Hotel.",
          place_image_url: "https://example.com/images/everland.jpg",
          place_name: "Everland Resort (Yongin)",
          ticket_pricing:
            "USD 55 adults, USD 45 children (age 3‑12); family package (2 adults + 2 children) USD 180",
          time_travel_each_location:
            "≈70 min by private shuttle or express bus from Seoul, full‑day (09:00 – 18:00)",
        },
      ],
      best_time_to_visit_day: "Full Day",
      day: 4,
      day_plan: "Day Trip – Everland Theme Park",
    },
    {
      activities: [
        {
          best_time_to_visit: "09:00 am – 12:00 pm",
          geo_coordinates: {
            latitude: 37.5272,
            longitude: 126.9249,
          },
          place_address:
            "330 Yeouidong-ro, Yeongdeungpo-gu, Seoul 07336, South Korea",
          place_details:
            "Bike rentals, river‑cruise, and a family picnic with rental of a floating lounge (Yeouido Hangang Cruise).",
          place_image_url: "https://example.com/images/hangang_yeouido.jpg",
          place_name: "Hangang River Park – Yeouido",
          ticket_pricing:
            "Bike USD 6 per hour; Cruise USD 15 adults, USD 10 children",
          time_travel_each_location:
            "30 min subway (Line 5 → Yeouinaru), 3 hr activity",
        },
        {
          best_time_to_visit: "Evening (6:30 pm – 9:30 pm)",
          geo_coordinates: {
            latitude: 37.5572,
            longitude: 126.9238,
          },
          place_address: "Hongik-ro, Mapo-gu, Seoul 04039, South Korea",
          place_details:
            "Street performances, quirky shops, and a casual Korean BBQ dinner suitable for families.",
          place_image_url: "https://example.com/images/hongdae.jpg",
          place_name: "Hongdae (Hongik University) Street",
          ticket_pricing:
            "Free to explore; BBQ dinner approx. USD 15‑20 per person",
          time_travel_each_location:
            "25 min subway (Line 5 → Hongik University), 2‑3 hr evening",
        },
      ],
      best_time_to_visit_day: "Morning‑Evening",
      day: 5,
      day_plan: "Relaxing Han River & Shopping",
    },
    {
      activities: [
        {
          best_time_to_visit: "Morning arrival",
          geo_coordinates: {
            latitude: 37.2653,
            longitude: 126.9214,
          },
          place_address:
            "90 Duseong-ro, Giheung-gu, Yongin-si, Gyeonggi-do 17128, South Korea",
          place_details:
            "Live cultural performances, traditional craft workshops, and horseback rides – very engaging for kids.",
          place_image_url: "https://example.com/images/korean_folk_village.jpg",
          place_name: "Korean Folk Village (Baegot-myeon)",
          ticket_pricing: "USD 22 adults, USD 15 children",
          time_travel_each_location:
            "≈55 min by train (KTX or ITX) to Suwon + shuttle, full‑day 09:00 – 17:00",
        },
        {
          best_time_to_visit: "Afternoon (13:00 – 15:30)",
          geo_coordinates: {
            latitude: 37.2635,
            longitude: 127.0286,
          },
          place_address:
            "901, Gwanggyosan-ro, Paldal-gu, Suwon-si, Gyeonggi-do 16442, South Korea",
          place_details:
            "World‑heritage wall walk, cannon fire show, and a short cable‑car ride to the top for city views.",
          place_image_url: "https://example.com/images/hwaseong.jpg",
          place_name: "Suwon Hwaseong Fortress",
          ticket_pricing:
            "USD 3 adults, free for children under 7; cable car USD 8 adults, USD 5 children",
          time_travel_each_location: "15 min from Folk Village, 2 hr visit",
        },
      ],
      best_time_to_visit_day: "Full Day",
      day: 6,
      day_plan: "Day Trip – Korean Folk Village & Suwon",
    },
    {
      activities: [
        {
          best_time_to_visit: "Morning (09:00 – 11:30)",
          geo_coordinates: {
            latitude: 37.5636,
            longitude: 126.985,
          },
          place_address: "Myeongdong-gil, Jung-gu, Seoul 04537, South Korea",
          place_details:
            "Pick up souvenirs, Korean skincare, and snack packs before heading to the airport.",
          place_image_url: "https://example.com/images/myeongdong.jpg",
          place_name: "Last‑minute Shopping – Myeongdong",
          ticket_pricing:
            "Free entry; shopping budget variable (suggest USD 100‑150)",
          time_travel_each_location: "20 min from hotel, 2 hr",
        },
        {
          best_time_to_visit: "Leave hotel by 13:00 for a 16:00–18:00 flight",
          geo_coordinates: {
            latitude: 37.4602,
            longitude: 126.4407,
          },
          place_address:
            "Incheon International Airport, Jung‑in‑gu, Incheon, South Korea",
          place_details:
            "AREX express train or private van to catch your evening flight back to London.",
          place_image_url: "https://example.com/images/incheon_airport.jpg",
          place_name: "Transfer to Incheon Airport",
          ticket_pricing:
            "USD 10 per adult (AREX) or private transfer USD 60 total",
          time_travel_each_location: "≈45 min",
        },
      ],
      best_time_to_visit_day: "Morning",
      day: 7,
      day_plan: "Departure",
    },
  ],
  origin: "London, United Kingdom",
};

export function Itinerary() {
  // TODO: Fetch this data dynamically from the backend or via props based on the active trip plan
  const trip = TRIP_DATA;
  const openMap = (lat: number, lng: number, placeId: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeId)}`;
    window.open(url, "_blank");
  };
  
  const hotelTimelineData = [
    {
      title: "Options",
      content: (
        // Changed to auto-fit so it wraps based on container width rather than viewport width
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mb-8 w-full max-w-full">
          {trip.hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md w-full h-full"
            >
              {/* Reduced image height */}
              <div className="h-36 sm:h-40 shrink-0 overflow-hidden relative">
                <img
                  src={hotel.hotel_image_url}
                  alt={hotel.hotel_name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Image+Unavailable";
                  }}
                />
                <div className="absolute top-2 left-2 bg-blue-600/90 text-white backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-[10px] font-semibold shadow-sm">
                  <BedDouble className="w-3 h-3" />
                  <span>Hotel</span>
                </div>
                <div className="absolute top-2 right-2 bg-white/95 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-[10px] font-bold shadow-sm text-neutral-900 dark:text-white">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{hotel.rating}</span>
                </div>
              </div>

              {/* Reduced padding */}
              <div className="p-3 sm:p-4 flex flex-col grow gap-3">
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-2">
                  <div>
                    <h3
                      className="font-bold text-lg line-clamp-1 text-neutral-900 dark:text-white"
                      title={hotel.hotel_name}
                    >
                      {hotel.hotel_name}
                    </h3>
                    <div className="flex items-start gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span
                        className="line-clamp-1"
                        title={hotel.hotel_address}
                      >
                        {hotel.hotel_address}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded border border-green-100 dark:border-green-900/50 self-start">
                    <p className="text-green-600 dark:text-green-400 font-bold text-sm whitespace-nowrap">
                      {hotel.price_per_night}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 grow">
                  <div className="flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                    <p
                      className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3"
                      title={hotel.description}
                    >
                      {hotel.description}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-1.5 mt-auto bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 py-4 rounded-lg font-medium text-xs"
                  onClick={() => {
                    openMap(
                      hotel.geo_coordinates.latitude,
                      hotel.geo_coordinates.latitude,
                      hotel.hotel_name,
                    );
                  }}
                >
                  <Map className="w-3.5 h-3.5" />
                  View on Map
                </Button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Transform itinerary into a timeline format
  const itineraryTimelineData = trip.itinerary.map((day) => ({
    title: `Day ${day.day}`,
    content: (
      <div className="flex flex-col gap-4 mb-8 w-full max-w-full">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
            {day.day_plan}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Best time: {day.best_time_to_visit_day}</span>
          </div>
        </div>

        {/* Responsive grid with auto-fit for container width awareness */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {day.activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-neutral-900 shadow border border-neutral-200 dark:border-neutral-800 w-full group h-full"
            >
              <div className="h-32 shrink-0 relative overflow-hidden">
                <img
                  src={activity.place_image_url}
                  alt={activity.place_name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Image+Unavailable";
                  }}
                />
                <div className="absolute top-2 left-2 bg-indigo-600/90 text-white backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-[10px] font-semibold shadow-sm">
                  <Navigation className="w-3 h-3" />
                  <span>Activity {idx + 1}</span>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex flex-col flex-grow gap-3">
                <h4
                  className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1"
                  title={activity.place_name}
                >
                  {activity.place_name}
                </h4>

                <div className="space-y-2 bg-neutral-50 dark:bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/50 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                    <span
                      className="leading-tight line-clamp-1"
                      title={activity.place_address}
                    >
                      {activity.place_address}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                    <span className="leading-tight">
                      {activity.best_time_to_visit}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Coins className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                    <span
                      className="leading-tight font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1"
                      title={activity.ticket_pricing}
                    >
                      {activity.ticket_pricing}
                    </span>
                  </div>
                </div>

                <p
                  className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1 flex-grow line-clamp-2"
                  title={activity.place_details}
                >
                  {activity.place_details}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-1.5 mt-auto py-4 rounded-lg border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors text-xs"
                  onClick={() => {
                    openMap(
                      activity.geo_coordinates.latitude,
                      activity.geo_coordinates.longitude,
                      activity.place_name,
                    );
                  }}
                >
                  <Map className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-semibold">View on Map</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  // Parse location text to make headers prettier
  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 space-y-10 pb-10">
      {/* Main Header */}
      <div className="mb-2 pt-2">
        <h1 className="text-2xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          Your Personal{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Travel Itinerary
          </span>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm font-medium max-w-xl">
          Explore your AI-curated {trip.duration} travel plan for{" "}
          <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
            {destName}
          </span>
          , complete with top hotel recommendations and a daily activity guide.
        </p>
      </div>

      {/* Trip Highlights Section */}
      <section>
        <h2 className="text-lg font-extrabold tracking-tight mb-3 text-neutral-900 dark:text-white flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          Trip Details
        </h2>
        {/* Responsive grid using auto-fit */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-3 rounded-xl flex flex-col items-start gap-1.5 transition-all hover:shadow-sm">
            <div className="bg-white dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-blue-600/70 dark:text-blue-400/70 font-bold uppercase tracking-wider">
                Destination
              </p>
              <p
                className="font-bold text-xs text-blue-950 dark:text-blue-50 leading-snug line-clamp-1"
                title={trip.destination}
              >
                {trip.destination}
              </p>
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 p-3 rounded-xl flex flex-col items-start gap-1.5 transition-all hover:shadow-sm">
            <div className="bg-white dark:bg-orange-900/50 p-2 rounded-lg text-orange-600 dark:text-orange-400 shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-orange-600/70 dark:text-orange-400/70 font-bold uppercase tracking-wider">
                Duration
              </p>
              <p className="font-bold text-xs text-orange-950 dark:text-orange-50">
                {trip.duration}
              </p>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-3 rounded-xl flex flex-col items-start gap-1.5 transition-all hover:shadow-sm">
            <div className="bg-white dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-emerald-600/70 dark:text-emerald-400/70 font-bold uppercase tracking-wider">
                Group Size
              </p>
              <p
                className="font-bold text-xs text-emerald-950 dark:text-emerald-50 line-clamp-1"
                title={trip.group_size}
              >
                {trip.group_size}
              </p>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 p-3 rounded-xl flex flex-col items-start gap-1.5 transition-all hover:shadow-sm">
            <div className="bg-white dark:bg-purple-900/50 p-2 rounded-lg text-purple-600 dark:text-purple-400 shadow-sm">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-purple-600/70 dark:text-purple-400/70 font-bold uppercase tracking-wider">
                Budget
              </p>
              <p className="font-bold text-xs text-purple-950 dark:text-purple-50">
                {trip.budget}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Recommendations via Timeline */}
      <section>
        <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-indigo-500" />
          Where to Stay
        </h2>
        <div className="-mx-4 sm:mx-0">
          <Timeline data={hotelTimelineData} />
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section>
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
          <Navigation className="w-6 h-6 text-blue-500" />
          Daily Itinerary
        </h2>
        <div className="-mx-4 sm:mx-0">
          <Timeline data={itineraryTimelineData} />
        </div>
      </section>
    </div>
  );
}

export default Itinerary;
