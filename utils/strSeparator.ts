export function formatString(str:string) {
    
    if (str.includes('-')) return str;
    
    const divisao = Math.floor(str.length / 2);
    return str.slice(0, divisao) + '-' + str.slice(divisao)
}