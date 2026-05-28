"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Wallet,
  Users,
  MapPin,
  Compass,
  Trash2,
  ArrowRight,
  Plus,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Itinerary, TripPlan } from "@/types/trip";
import MyTripsSkeleton from "@/components/my-trips/skeleton";

export default function MyTrips() {
  const { user, isLoaded } = useUser();
  const userEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress;

  // get all trips for the current user, or skip if the user is not loaded/signed in yet
  const trips = useQuery(
    api.trips.getTrips,
    isLoaded && user ? {} : "skip",
  );

  const deleteTripMutation = useMutation(api.trips.deleteTrip);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: Id<"trips">) => {
    try {
      setIsDeleting(true);
      await deleteTripMutation({ tripId: id });
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Could not delete the trip. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper to extract cover image
  const getTripCoverImage = (tripPlan: TripPlan) => {
    // 1. Try first hotel image
    if (tripPlan.hotels?.[0]?.hotel_image_url) {
      return tripPlan.hotels[0].hotel_image_url;
    }
    // 2. Try first activity image
    const itinerary = tripPlan.itinerary;
    if (itinerary && itinerary.length > 0) {
      for (const day of itinerary) {
        if (day.activities && day.activities.length > 0) {
          for (const act of day.activities) {
            if (act.place_image_url) {
              return act.place_image_url;
            }
          }
        }
      }
    }
    // 3. Fallback image
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800";
  };

  if (!isLoaded || trips === undefined) {
    return <MyTripsSkeleton />;
  }

  if (isLoaded && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-background">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
          Sign in to View Trips
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">
          Please sign in to access your customized AI travel itineraries and
          saved journeys.
        </p>
        <Link href="/sign-in">
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 py-5 font-semibold">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <header className="relative border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/30 dark:bg-neutral-900/10 py-12 md:py-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Travel Journal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              My Adventures
            </h1>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
              Explore, manage, and view details for all your customized AI
              travel itineraries in one place.
            </p>
          </div>

          <Link href="/create-new-trip" className="shrink-0">
            <Button className="bg-gradient-to-r from-primary to-orange-500 text-white hover:opacity-95 shadow-md shadow-primary/20 hover:shadow-lg rounded-2xl py-6 px-6 font-bold flex items-center gap-2 transition-all">
              <Plus className="w-5 h-5" />
              <span>Plan New Trip</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Trips list or empty state */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-full bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-center mb-6 text-neutral-400 dark:text-neutral-600 border border-neutral-200/40 dark:border-neutral-800/30 relative shadow-inner">
              <Compass className="w-12 h-12 animate-[spin_12s_linear_infinite] text-primary/80" />
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary border border-primary/30">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight">
              No Trips Planned Yet
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed text-sm">
              It looks like your travel book is empty. Let our AI travel guide
              construct your perfect itinerary and discover hidden gems today!
            </p>
            <Link href="/create-new-trip">
              <Button className="bg-gradient-to-r from-primary to-orange-500 text-white hover:opacity-95 shadow-md rounded-2xl py-6 px-8 font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Plan Your First Trip</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trips.map((trip) => {
              const hotelsCount = trip.tripPlan.hotels?.length || 0;
              let activitiesCount = 0;
              if (trip.tripPlan.itinerary) {
                trip.tripPlan.itinerary.forEach((day: Itinerary) => {
                  if (day.activities) {
                    activitiesCount += day.activities.length;
                  }
                });
              }

              return (
                <div
                  key={trip._id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-900/20 border border-neutral-200/60 dark:border-neutral-800/60 transition-all hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_36px_rgba(255,255,255,0.01)] hover:-translate-y-1.5 duration-500 w-full h-[430px]"
                >
                  {/* Inline Delete Confirmation Overlay */}
                  {deleteConfirmId === trip._id && (
                    <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-6 text-center text-white animate-in fade-in duration-300">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 mb-4 animate-bounce">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">
                        Delete Trip Plan?
                      </h4>
                      <p className="text-xs text-neutral-400 max-w-xs mb-6 font-normal">
                        Are you sure you want to delete your trip to{" "}
                        <span className="text-white font-semibold">
                          {trip.tripPlan.destination}
                        </span>
                        ? This action cannot be undone.
                      </p>
                      <div className="flex gap-3 w-full max-w-[240px]">
                        <Button
                          variant="outline"
                          onClick={() => setDeleteConfirmId(null)}
                          disabled={isDeleting}
                          className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl py-4 cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleDelete(trip._id)}
                          disabled={isDeleting}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none rounded-xl py-4 cursor-pointer"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Card Cover Image */}
                  <div className="relative h-60 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800/55">
                    <Image
                      src={getTripCoverImage(trip.tripPlan)}
                      alt={trip.tripPlan.destination}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized={true}
                    />

                    {/* Shadow overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-white border border-white/10 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {trip.tripPlan.duration}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5" />
                        {trip.tripPlan.budget}
                      </span>
                    </div>

                    {/* Destination and Origin Details */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col text-white z-10">
                      <h3 className="font-extrabold text-xl line-clamp-1 mb-1 tracking-tight drop-shadow-md">
                        {trip.tripPlan.destination}
                      </h3>
                      {trip.tripPlan.origin && (
                        <span className="text-[11px] text-neutral-300 font-semibold flex items-center gap-1.5 opacity-90">
                          <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                          <span>From: {trip.tripPlan.origin}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex flex-col grow gap-4">
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-4 h-4 text-primary/70" />
                        <span>Group: {trip.tripPlan.group_size}</span>
                      </span>
                      <span className="font-bold bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-md text-[10px]">
                        {hotelsCount} {hotelsCount === 1 ? "Hotel" : "Hotels"} •{" "}
                        {activitiesCount}{" "}
                        {activitiesCount === 1 ? "Activity" : "Activities"}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5 mt-auto pt-2">
                      <Link href={`/my-trips/${trip._id}`} className="grow">
                        <Button className="w-full bg-primary hover:bg-primary/95 text-white rounded-2xl py-5.5 font-bold transition-all group/btn flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                          <span>View Itinerary</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirmId(trip._id)}
                        className="w-11.5 h-11.5 p-0 shrink-0 rounded-2xl border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-900/30 transition-all cursor-pointer"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
