export class Place {
	constructor(title, imageUri, location,id) {
		this.title = title;
		this.imageUri = imageUri;
		this.address = location.address;
		this.location = { lon: location.lon, lat: location.lat };
		this.id = id;
	}
}
