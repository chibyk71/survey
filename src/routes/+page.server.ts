import type { PageServerLoad } from './$types';

export const load = (async ({url}) => {

    const id = Math.round(Math.random() * 728983).toString(32)
    
    const shortUrl = await fetch('https://www.urlday.com/api/v1/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + 'BGes6CewZDsyPXzhA1Hk3tQ5IcBVZAYYGoS4boIIA4ieIX2BZDUiGiyMSqoi', // Replace with your actual API key
        },
        body: new URLSearchParams({
            url: url.origin+"?r="+id, // Replace with the actual URL you want to submit
        }),
    })
        .then(response => { return response.json() })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    
    return { shortUrl: shortUrl.data.short_url,id};
}) satisfies PageServerLoad;