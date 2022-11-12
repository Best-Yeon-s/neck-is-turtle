/**
 * 
 * @param {int} sec 
 * @returns `${hour}h ${min}min` format string
 */
export const secToString = (s) => {
    const hour = parseInt(s / 3600);
    const min = parseInt(s / 60) % 60;
    const sec = parseInt(s % 60);
    return `${hour}h ${min}m ${sec}s`;
}