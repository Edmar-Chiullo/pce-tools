export function extraction(...props:any) {
    const [carga] = props

    const parent = carga.value.target.parentElement
    const element = carga.bulk.filter(({carga}:any) => carga.bulkId === parent.id)

    return element[0]
}