const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
const stringToDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return utcDate;
}

const dateToString = (date: Date): string => {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const day = utcDate.getDate();
    const month = utcDate.getMonth() + 1;
    const year = utcDate.getFullYear();
    return `${year}-${month}-${day}`;
}

export {formatDate, stringToDate, dateToString} ;