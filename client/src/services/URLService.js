const axios = require('axios');
const baseURL = "https://nk-url-shortener.herokuapp.com:38870"

async function checkShortURLPresent(short_url){
    let result = await axios.post(`${baseURL}/check`, {
        "short_url": short_url        
    })
    return result['data']; // returns "URL present" or "URL not present"
}

export async function getShortURL(long_url){
    // Generate a shortened URL
    let charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let appended_string = ''
    for (let i = 0; i < 5; i++){
        appended_string += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    let full_url = 'https://' + long_url.replace(/^https?:\/\//, '')

    // Check if the shortened URL is present. If present, generate another URL
    while (checkShortURLPresent(full_url) === "URL present"){
        for (let i = 0; i < 5; i++){
            appended_string += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        full_url = 'https://' + long_url.replace(/^https?:\/\//, '')
    }
    let short_url = baseURL + '/' + appended_string

    // Call backend API to store generated short URL and long URL in database
    let req = {
        "long_url": full_url,
        "short_url": short_url        
    }
    axios.post(`${baseURL}/url`, req);
    return short_url;
}

export async function getLongURL(short_url){
    // Call backend API to retrieve long URL from database
    let req = {
        "short_url": short_url,
    }
    let long_url = await axios.get(`${baseURL}/url`, req)
    return long_url
}