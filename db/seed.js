const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const baseURL = "https://developer.nps.gov/api/v1";


const getNPS = async () => {
    try {

        const response = await axios.get(`${baseURL}/parks?api_key=${process.env.NPS_KEY}`);
        
        const parks = response.data.data; 

        const formattedParks = parks.map((park) => {
            const activities = park.activities.map((activity) => {
             return activity.name
            });
            const images = park.images.map((img) => {
             return {
                url: img.url,
                alt: img.altText,
                caption: img.caption
             }
            });
        return {
            name: park.name,
            description: park.description,
            activities: activities,
            images: images,
            address: park.addresses[0].line1,
            city: park.addresses[0].city,
            state: park.addresses[0].stateCode,
            zip: park.addresses[0].postalCode,
            phone: park.contacts.phoneNumbers.phoneNumber,


        }
        });

        console.log(formattedParks);
    } catch (err) {
        console.log(err);
    }
};



getNPS();
