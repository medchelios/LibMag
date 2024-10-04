export const has30DaysDifference = (date1: Date, date2: Date): boolean => {
    // Convert both dates to timestamps in milliseconds
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());

    // Convert the time difference from milliseconds to days
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    // Check if the difference is 30 days or more
    return dayDiff >= 30;
}

    // Function to get the exact difference in days
export const getDayDifference = (date1: Date, date2: Date): number => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const convertToDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));  // Convert milliseconds to days
        const diffInDays = convertToDays - 30
        return diffInDays
    };