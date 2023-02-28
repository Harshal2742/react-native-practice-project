import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		// convert it into promise
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lon REAL NOT NULL,
        lat REAL NOT NULL
      )`,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const insertPlace = (place) => {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places (title,imageUri,address,lon,lat) VALUES (?,?,?,?,?)`,
				[
					place.title,
					place.imageUri,
					place.address,
					place.location.lon,
					place.location.lat,
				],
				(_, result) => {
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM places',
				[],
				(_, result) => {
					const places = [];

					for (const place of result.rows._array) {
						places.push(
							new Place(
								place.title,
								place.imageUri,
								{
									address: place.address,
									lon: place.lon,
									lat: place.lat,
								},
								place.id
							)
						);
					}
					resolve(places);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const fetchPlaceDetails = (id) => {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM places WHERE id = ?',
				[id],
				(_, result) => {
					resolve(result.rows._array[0]);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};
