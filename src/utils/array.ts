export const sliceByNumber = <T>(
    array: ReadonlyArray<T>,
    number: number
): Array<Array<T>> | undefined => {
    let tmpArr = [];
    const targetList = array.concat();
    while (targetList.length > 0) {
        tmpArr.push(targetList.splice(0, number));
    }
    return tmpArr;
};
