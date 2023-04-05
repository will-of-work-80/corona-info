export const japanDateFormat = (date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
};

export const japanDateTimeFormat = (date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}年${month}月${day}日${hour}:${minute}:${second}`;
};

export const yyyymmddFormat = (date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = ('00' + (date.getMonth() + 1)).slice(-2);
    const day = ('00' + date.getDate()).slice(-2);
    return `${year}${month}${day}`;
};

export const getBeforeNdays = (n: number) => {
    const dt = new Date();
    dt.setDate(dt.getDate() - n);
    return yyyymmddFormat(dt);
};
