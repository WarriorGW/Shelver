import { cn } from "@/lib/utils"

function BodyWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "w-full h-full mx-auto max-w-screen-xl px-2.5 sm:px-10 md:px-15 lg:px-20 py-5",
        className
      )}
    >
      {children}
    </div>
  )
}

export default BodyWrapper
