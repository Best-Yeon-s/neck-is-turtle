/**
 * 
 * @param {int} sec 
 * @returns `${hour}h ${min}min` format string
 */
export const secToString = (sec) => {
    const hour = parseInt(sec / 3600);
    const min = parseInt(sec / 60) % 60;
    return `${hour}h ${min}min`;
}