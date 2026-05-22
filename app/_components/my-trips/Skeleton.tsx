import { Skeleton } from "@/components/ui/skeleton";

function MyTripsSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Skeleton */}
      <div className="border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/30 dark:bg-neutral-900/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-3.5">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-10 w-64 rounded-md" />
            <Skeleton className="h-5 w-[380px] rounded-md" />
          </div>
          <Skeleton className="h-12 w-44 rounded-2xl" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 w-full h-[430px]"
            >
              <Skeleton className="h-60 w-full rounded-t-3xl" />
              <div className="p-5 flex flex-col grow gap-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                </div>
                <Skeleton className="h-6 w-2/3 rounded-md" />
                <div className="flex gap-2.5 mt-auto">
                  <Skeleton className="h-11 grow rounded-2xl" />
                  <Skeleton className="h-11 w-11 rounded-2xl shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTripsSkeleton