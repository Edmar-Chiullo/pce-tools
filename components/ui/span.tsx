import { useState, useEffect } from 'react';

export default function Timer(date:any) {
    const [startTime, setStartTime]:any = useState<Date | null>(null)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    const formatTime = (totalSeconds: number) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
        const secs = String(totalSeconds % 60).padStart(2, '0')
        return `${hrs}:${mins}:${secs}`
    }
    
    useEffect(() => {
        setStartTime(new Date(date.props.date))
    }, [])

    useEffect(() => {        
        if (startTime !== null) {            
            let interval = setInterval(() => {
            const now = new Date()
            const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000)
            setElapsedSeconds(diff)
          }, 1000);
        }
    }, [startTime])

    return (
        <>
            <span>{formatTime(elapsedSeconds)}</span>
        </>
    )
}