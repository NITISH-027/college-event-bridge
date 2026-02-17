import { LayoutContainer } from "@/components/layout-container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pb-20">
      <header className="sticky top-0 z-40 bg-background border-b">
        <LayoutContainer>
          <div className="flex items-center justify-between h-14">
            <Skeleton className="h-7 w-24" />
          </div>
        </LayoutContainer>
      </header>

      <LayoutContainer className="py-4">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </LayoutContainer>
    </div>
  )
}
