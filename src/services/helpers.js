/*

    Helpers

*/
export const shortenAddress = (str) => { return str.substr(0, 6) + '\u2026' + str.substr(str.length-4, 4); };
export const toDate = (timestamp) => { return new Date(timestamp * 1000).toLocaleDateString('en-US', { timezone: 'UTC' }) };
export const toEther = (amount) => { return window.web3.utils.fromWei(amount, 'Ether'); };
export const toWei = (amount) => { return window.web3.utils.toWei(amount, 'Ether'); };
export const round = (num) => { return Math.round(Number((Math.abs(num) * 100).toPrecision(16))) / 100 * Math.sign(num); };

