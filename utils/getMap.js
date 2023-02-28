import {API_KEY} from 'react-native-dotenv';


const API_KEY = process.env.MAP_API_KEY;

export const getMapUri = (lon, lat) => {
	const uri = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&marker=lonlat:${lon},${lat};color:%23ff0000;size:medium&zoom=13&apiKey=${API_KEY}`;

	return uri;
};

export const getAddress = async (lon,lat) => {
	const uri = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`

	const response = await fetch(uri);

	if(!response.ok){
		throw new Error('Error while finding the address!');
	}

	const data = await response.json();

	const address = data.results[0].formatted
	return address;
}
