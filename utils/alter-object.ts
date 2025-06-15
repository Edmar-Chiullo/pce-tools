
export function extractionData(data:any) {
    const { listData, obj } = data
    const result = listData.filter((obj:any) => obj.bulkId !== obj.bulkId)
    result.push(obj)
    
    return result
}