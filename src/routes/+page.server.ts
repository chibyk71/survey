import type { PageServerLoad } from './$types';

export const load = (async ({url}) => {

    const id = Math.round(Math.random() * 728983).toString(32)
    const headers = {
        "Content-Type": "application/json",
        "apikey": "8991346cb2f5418286f4e510cf99acaf",
    }
    const shorten = async (url: string): Promise<string> => {
        const endpoint = "https://api.rebrandly.com/v1/links";
        const linkRequest = {
            destination: url,
            domain: { fullName: "rebrand.ly" }
        }
        const apiCall = {
            method: 'post',
            body: JSON.stringify(linkRequest),
            headers: headers
        }
        const link = await fetch(endpoint, apiCall)
            .then((apiResponse) => {
                return apiResponse.json()
            });
        
            return link.shortUrl;
    }

    const shortUrl = await shorten(url.origin+"?r="+id);
    return {shortUrl,id};
}) satisfies PageServerLoad;