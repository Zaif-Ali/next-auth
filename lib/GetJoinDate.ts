export const formattedJoinDate = (dateString: string): string => {
    const joinDate = new Date(dateString);

    const options: any = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(joinDate);;
}