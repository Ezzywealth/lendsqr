import { UserProps } from '../../interfaces/typings';
import { usersData } from '../userDetails';

// Function to open or create a database
export const openDatabase = (): IDBOpenDBRequest => {
	// Open (or create if not exists) a database named 'UsersDb' with version 1
	const request: IDBOpenDBRequest = indexedDB.open('UsersDb', 1);

	// Setup event handlers for database creation and version change
	request.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
		const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

		// Create an object store named 'Users' with 'customid' as the key path
		const userStore: IDBObjectStore = db.createObjectStore('Users', { keyPath: 'customid' });

		// Create indexes for searching by 'username', 'email', and 'status'
		userStore.createIndex('usernameIndex', 'username', { unique: true });
		userStore.createIndex('idIndex', 'id', { unique: true });
	};

	// Use type assertion to handle the case when the database is already open
	return request;
};

// Function to add multiple user records to the database
export const addUsers = (users: UserProps[]): void => {
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event): void => {
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readwrite');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Add each user to the Users object store
		users.forEach((user: UserProps) => {
			const addRequest: IDBRequest<IDBValidKey> = userStore.add(user);

			addRequest.onsuccess = (): void => {
				console.log(`User ${user.id} added successfully`);
			};

			addRequest.onerror = (): void => {
				console.error(`Error adding user ${user.id}`);
			};
		});
	};

	request.onerror = (): void => {
		console.error('Error opening database');
	};
};

// Function to search for a user by ID
export const searchUserById = (userId: string, callback: (user: UserProps | null) => void): void => {
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event): void => {
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readonly');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Use the 'idIndex' index to look up the user by ID
		const idIndex: IDBIndex = userStore.index('idIndex');
		const getRequest: IDBRequest<IDBValidKey | undefined> = idIndex.get(userId);

		getRequest.onsuccess = (): void => {
			const user: UserProps | undefined = getRequest.result as UserProps | undefined;
			callback(user || null);
		};

		getRequest.onerror = (): void => {
			console.error(`Error searching for user with ID ${userId}`);
			callback(null);
		};
	};

	request.onerror = (): void => {
		console.error('Error opening database');
		callback(null);
	};
};

addUsers(usersData);
