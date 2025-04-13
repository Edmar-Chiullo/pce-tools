export function tractDate(dateMill: number) {
    const date = new Date(dateMill).toISOString()
    return date
}