export function getElementId(element: any) {
    const parentElement = element.target.parentElement
    const chOne = parentElement.children[0]
    const chTwo = chOne.children[0]
    const chThree = chTwo.children[0]
    
    const value = chThree.children[1].innerText

    return value
}
    
export function getElementTask(element: any) {
    const parentElement = element.target.parentElement
    const chOne = parentElement.children[0]
    const chTwo = chOne.children[1]
    const chThree = chTwo.children[1]
    
    const value = chThree.children[1].innerText

    return value
}