const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const baseURL = "https://developer.nps.gov/api/v1";
const Park = require("../models/parkmodel");
const connectDB = require("./config.js");

connectDB();

const getNPS = async () => {
    try {

        const response = await axios.get(`${baseURL}/parks?limit=496&api_key=${process.env.NPS_KEY}`);
        
        const parks = response.data.data; 
        // console.log(parks);

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
         let phone; 
         
            if (park.contacts.phoneNumbers[0]) {
                phone = park.contacts.phoneNumbers[0].phoneNumber
            }
            else {
                phone = null
            }
        

            const lat = park.latLong ? park.latLong.split(', ')[0].slice(4) : null;
            const long = park.latLong ? park.latLong.split(', ')[1].slice(5) : null;
        return {
            name: park.name,
            description: park.description,
            activities: activities,
            images: images,
            address: park.addresses[0].line1,
            city: park.addresses[0].city,
            state: park.addresses[0].stateCode,
            zip: park.addresses[0].postalCode,
            phone: phone,
            cost: park.entranceFees[0] ?park.entranceFees[0].cost :null,
            lat: lat,
            long: long,
            parkType: 'National Park',

        }
        });

       await Park.deleteMany();

       await Park.insertMany(formattedParks);

        console.log("parks Added");
    
    } catch (err) {
        console.log(err);
    }
};



getNPS();
