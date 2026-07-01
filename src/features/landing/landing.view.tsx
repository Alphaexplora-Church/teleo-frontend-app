export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
      <h1 className="text-3xl font-bold">Welcome, Juan!</h1>
      <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
        Swipe from the left edge to open your menu, or use the sidebar on desktop to navigate.
      </p>
    </div>
  )
}