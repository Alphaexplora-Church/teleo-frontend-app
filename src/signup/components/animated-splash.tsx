import { useEffect, useState } from "react"

type Props = {
  show: boolean
  text: string
  onDone?: () => void
}

export default function AnimatedSplash({ show, text, onDone }: Props) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!show) return

    setFade(false)

    const t1 = setTimeout(() => setFade(true), 1000)
    const t2 = setTimeout(() => onDone?.(), 3000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-blue-500 text-4xl text-white transition ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {text}
    </div>
  )
}
