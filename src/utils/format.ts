export const priceFormat = (price: number | string, digits: number | null) => {
    const digitsPrice = typeof price === 'number' ? price : Number(price);
    const digitsNumber = typeof digits === 'number' ? digits : 3;
    const match = digitsPrice.toFixed(digitsNumber).match(/(-?)(\d+)\.(\d+)/);
    if (!match) {
      return digitsPrice.toString();
    }
  
    const sign = match[1];
    const intPart = String(match[2]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // const decimalPart = match[3];
    // return `${sign}${intPart}.${decimalPart}`;
    return `${sign}${intPart}`;
}
