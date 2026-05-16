"use client";
import { Timeline } from "@/components/ui/timeline";
import {
  MapPin,
  Star,
  Clock,
  Coins,
  Users,
  Calendar,
  Wallet,
  Sparkles,
  Map,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripPlan } from "./ChatBox";

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
  const trip = TRIP_DATA;
  const openMap = (lat: number, lng: number, placeId: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeId)}`;
    window.open(url, "_blank");
  };

  const itineraryTimelineData = trip.itinerary.map((day) => ({
    title: `Day ${day.day}`,
    content: (
      <div className="flex flex-col gap-8 mb-16 w-full max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {day.day_plan}
          </h3>
          <div className="flex items-center gap-1.5 text-sm bg-neutral-100 dark:bg-neutral-800/50 px-3 py-1.5 rounded-full text-neutral-600 dark:text-neutral-300 font-medium">
            <Clock className="w-4 h-4" />
            <span>{day.best_time_to_visit_day}</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {day.activities.map((activity, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:-translate-y-1 duration-300 w-full group h-full"
            >
              <div className="h-52 shrink-0 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 m-2 rounded-2xl">
                <img
                  src={activity.place_image_url}
                  alt={activity.place_name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Image+Unavailable";
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm text-neutral-800 dark:text-neutral-100">
                  <Navigation className="w-3.5 h-3.5 text-blue-500" />
                  <span>Stop {idx + 1}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow gap-4">
                <div>
                  <h4
                    className="font-bold text-lg text-neutral-900 dark:text-neutral-100 line-clamp-1 mb-1"
                    title={activity.place_name}
                  >
                    {activity.place_name}
                  </h4>
                  <div className="flex items-start gap-1.5 text-neutral-500 dark:text-neutral-400">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <p
                      className="text-sm line-clamp-1"
                      title={activity.place_address}
                    >
                      {activity.place_address}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow line-clamp-3"
                  title={activity.place_details}
                >
                  {activity.place_details}
                </p>

                <div className="flex flex-col gap-3 mt-auto pt-5">
                  <div className="grid grid-cols-2 gap-2 text-sm bg-white dark:bg-neutral-950 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        Time
                      </span>
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="line-clamp-1 text-xs">
                          {activity.best_time_to_visit}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        Cost
                      </span>
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Coins className="w-3.5 h-3.5 shrink-0" />
                        <span
                          className="line-clamp-1 text-xs"
                          title={activity.ticket_pricing}
                        >
                          {activity.ticket_pricing}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2 rounded-xl border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-semibold py-5 transition-all group/btn"
                    onClick={() => {
                      openMap(
                        activity.geo_coordinates.latitude,
                        activity.geo_coordinates.longitude,
                        activity.place_name,
                      );
                    }}
                  >
                    <span>View Location</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  const originName = trip.origin.split(",")[0];
  const destName = trip.destination.split("(")[0].trim();

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 pb-20 max-w-7xl mx-auto space-y-16">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 p-8 md:p-12 mt-4">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>AI-Generated Plan</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl">
            Your trip from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              {originName}
            </span>{" "}
            to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              {destName}
            </span>{" "}
            is ready.
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-lg text-orange-600 dark:text-orange-400">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.budget}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-4 py-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {trip.group_size}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stays (Hotels) - Moved outside timeline for prominence */}
      <section className="px-2 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Featured Stays
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => {
                openMap(
                  hotel.geo_coordinates.latitude,
                  hotel.geo_coordinates.longitude,
                  hotel.hotel_name,
                );
              }}
            >
              <img
                src={hotel.hotel_image_url}
                alt={hotel.hotel_name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x800?text=Image+Unavailable";
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Top badges */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-white">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{hotel.rating}</span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2 pointer-events-none">
                <h3 className="font-bold text-xl text-white line-clamp-1 leading-tight">
                  {hotel.hotel_name}
                </h3>
                <div className="flex items-center gap-1.5 text-neutral-300 text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <p className="line-clamp-1">{hotel.hotel_address}</p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" />
                    {hotel.price_per_night}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <Map className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="md:pl-4">
        <div className="flex items-center gap-3 mb-8 px-2 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            Daily Itinerary
          </h2>
        </div>
        <div className="-mx-4 sm:mx-0">
          <Timeline data={itineraryTimelineData} />
        </div>
      </section>
    </div>
  );
}

export default Itinerary;
