import { useState, useEffect } from 'react'

interface TimerProps {
  props: {
    date: string
    onYellowLimitReached?: () => void
    onRedLimitReached?: () => void
    yellowLimitSeconds?: number
    redLimitSeconds?: number
  }
}

export default function Timer({ props }: TimerProps) {
  const { date, onYellowLimitReached, onRedLimitReached, yellowLimitSeconds, redLimitSeconds }:any = props
  
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const formatTime = (totalSeconds: number) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const secs = String(totalSeconds % 60).padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  };

  useEffect(() => {
    setStartTime(new Date(date))
  }, [date])

  useEffect(() => {
    if (startTime !== null) {
      const interval = setInterval(() => {
        const now = new Date()
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        
        setElapsedSeconds(diff)
        if (diff >= yellowLimitSeconds && onYellowLimitReached && diff <= redLimitSeconds) onYellowLimitReached()
        if (diff >= redLimitSeconds && onRedLimitReached) onRedLimitReached()
      
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [startTime, yellowLimitSeconds, redLimitSeconds, onYellowLimitReached, onRedLimitReached])

  return <span>{formatTime(elapsedSeconds)}</span>
}
