import { formatDistanceToNow, addYears } from "date-fns";
export const Measure_Date = (DateFormat: any): string => {

    const createdAt = new Date(DateFormat);
    const now = new Date();
    const daysSinceCreation = Math.round(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
    );

    let createdAtLabel: string;
    // Check if the blog was created today
    if (daysSinceCreation < 1) {
        createdAtLabel = "Today";
    }
    // Check if the blog was created more than or equal to 1 year ago
    else if (daysSinceCreation >= 365) {
        const yearsSinceCreation = Math.floor(daysSinceCreation / 365);
        createdAtLabel = `${yearsSinceCreation} year${yearsSinceCreation > 1 ? "s" : ""} ago`;
    }
    // If the blog was created within the past year
    else {
        // Use the formatDistanceToNow function to generate a relative time label
        createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
    }
    return createdAtLabel;
}