import { ChatBox } from "@/app/_components/createTrip/ChatBox";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Itinerary from "@/app/_components/createTrip/Itinerary";

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
const CreateTrip = () => {
  return (
    <div className="w-full h-[calc(100vh-70px)] overflow-hidden">
      <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
        {/* chat box */}
        <ResizablePanel
          defaultSize={40}
          minSize={25}
          className="bg-white min-w-full lg:min-w-0"
        >
          <ChatBox />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden lg:flex" />
        {/* display map and area place  */}
        <ResizablePanel
          defaultSize={60}
          minSize={30}
          className="hidden lg:block bg-white dark:bg-neutral-950 overflow-hidden h-full"
        >
          {TRIP_DATA ? (
            <Itinerary trip_data={TRIP_DATA} />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h1 className="text-neutral-500 font-medium">Trip plan will be showing here</h1>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CreateTrip;
