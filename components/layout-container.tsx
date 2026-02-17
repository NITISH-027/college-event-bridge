import { cn } from "@/lib/utils"

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div className={cn("px-4 py-2", className)}>
      {children}
    </div>
  )
}
