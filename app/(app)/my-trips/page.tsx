"use client"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"

const Trips = () => {
  const {user} = useUser()
  
  // get all trips for the current user
  const trips = useQuery(api.trips.getTrips, {
    email: user?.emailAddresses[0].emailAddress as string
  })
  console.log(trips)

  return (
    <div>
      <h1>My trip</h1>
    </div>
  )
}

export default Trips
