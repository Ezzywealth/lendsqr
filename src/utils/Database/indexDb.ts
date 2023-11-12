import { UserProps } from '../../interfaces/typings';
import { usersData } from '../userDetails';

// Function to open or create a database
const openDatabase = (): IDBOpenDBRequest => {
	// Open (or create if not exists) a database named 'UsersDb' with version 1
	const request: IDBOpenDBRequest = indexedDB.open('UsersDb', 1);

	// Setup event handlers for database creation and version change
	request.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
		const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

		// Create an object store named 'Users'
		const userStore: IDBObjectStore = db.createObjectStore('Users', { keyPath: 'id', autoIncrement: true });

		// Create indexes for searching by 'username', 'email', and 'status'
		userStore.createIndex('customId', 'customId', { unique: true });
	};

	// Use type assertion to handle the case when the database is already open
	return request;
};

// Function to add multiple user records to the database
export const addUsers = () => {
	const users: UserProps[] = usersData;
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event) => {
		console.log('db was opened');
		// return;
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;
		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readwrite');
		const userStore: IDBObjectStore = transaction.objectStore('Users');
		console.log(userStore);
		console.log(users);
		// Add each user to the Users object store
		users.forEach((user: UserProps) => {
			// Use the 'add' method to let IndexedDB generate a key
			const addRequest: IDBRequest<IDBValidKey> = userStore.add(user);

			addRequest.onsuccess = (): void => {
				console.log(`User added successfully with generated key: ${addRequest.result}`);
			};

			addRequest.onerror = (errorEvent: Event): void => {
				const error: DOMException | null = (errorEvent.target as IDBRequest).error;
				console.error(`Error adding user: ${error?.message}`, user);
			};
		});
		return {
			status: 'success',
		};
	};

	request.onerror = (): void => {
		console.error('Error opening database');
	};
};

export const getAllUsers = async (callback: (users: UserProps[]) => void) => {
	const openRequest: IDBOpenDBRequest = indexedDB.open('UsersDb', 1);

	openRequest.onsuccess = (event: Event) => {
		const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

		// Open a transaction and get the object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readonly');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Retrieve all users
		const getAllRequest: IDBRequest<UserProps[]> = userStore.getAll();

		getAllRequest.onsuccess = () => {
			const users: UserProps[] = getAllRequest.result;
			callback(users);
		};

		getAllRequest.onerror = (error: Event) => {
			console.error('Error retrieving users:', error);
			callback([]);
		};
	};

	openRequest.onerror = (error: Event) => {
		console.error('Error opening database:', error);
		callback([]);
	};
};

// Function to search for a user by ID
export const searchUserById = (userId: number, callback: (user: UserProps | null) => void): void => {
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event): void => {
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readonly');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Use the 'auto-incremented' key to look up the user by ID
		const getRequest: IDBRequest<IDBValidKey | undefined> = userStore.get(userId);

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

// Example usage of addUsers and searchUserById
// addUsers();
