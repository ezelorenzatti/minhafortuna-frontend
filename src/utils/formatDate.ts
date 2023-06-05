const formatDate = (dateString: string): string => {
    if (!dateString) {
        return "";
    }
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
const stringToDate = (dateString: string): Date | undefined => {
    if (!dateString) {
        return undefined;
    }
    const [year, month, day] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    return utcDate;
}

const dateToString = (date: Date | undefined): string => {
    if (!date) {
        return "";
    }
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const day = utcDate.getDate();
    const month = utcDate.getMonth() + 1;
    const year = utcDate.getFullYear();
    return `${year}-${month}-${day}`;
}

export {formatDate, stringToDate, dateToString} ;