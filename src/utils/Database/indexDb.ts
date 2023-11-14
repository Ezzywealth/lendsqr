import { StatusProp, UserProps } from '../../interfaces/typings';
import { usersData } from '../userDetails';

// Function to open or create a database
const openDatabase = (): IDBOpenDBRequest => {
	// Open (or create if not exists) a database named 'UsersDb' with version 1
	const request: IDBOpenDBRequest = indexedDB.open('UsersDb', 1);

	// Setup event handlers for database creation and version change
	request.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
		const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

		// Create an object store named 'Users'
		const userStore: IDBObjectStore = db.createObjectStore('Users', { keyPath: 'customId', autoIncrement: true });

		// Create indexes for searching by 'username', 'email', and 'status'
		userStore.createIndex('customId', 'customId', { unique: true });
	};

	// Use type assertion to handle the case when the database is already open
	return request;
};

// Function to add multiple user records to the database
export const addUsers = (): Promise<{ status: 'success' | 'existingData' | 'error' }> => {
	return new Promise((resolve) => {
		const users: UserProps[] = usersData;
		const request: IDBOpenDBRequest = openDatabase();

		request.onsuccess = (event: Event) => {
			const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

			const transaction: IDBTransaction = db.transaction(['Users'], 'readonly'); // Use readonly transaction
			const userStore: IDBObjectStore = transaction.objectStore('Users');

			const getAllRequest: IDBRequest<UserProps[]> = userStore.getAll();

			getAllRequest.onsuccess = () => {
				const existingUsers: UserProps[] = getAllRequest.result;

				if (existingUsers.length > 0) {
					// There is existing data, don't add new users
					resolve({ status: 'existingData' });
				} else {
					// No existing data, proceed to add users
					const writeTransaction: IDBTransaction = db.transaction(['Users'], 'readwrite');
					const writeUserStore: IDBObjectStore = writeTransaction.objectStore('Users');

					// Add each user to the Users object store
					users.forEach((user: UserProps) => {
						const addRequest: IDBRequest<IDBValidKey> = writeUserStore.add(user);

						addRequest.onsuccess = (): void => {
							console.log(`User added successfully with generated key: ${addRequest.result}`);
						};

						addRequest.onerror = (errorEvent: Event): void => {
							const error: DOMException | null = (errorEvent.target as IDBRequest).error;
							console.error(`Error adding user: ${error?.message}`, user);
						};
					});

					writeTransaction.oncomplete = () => {
						resolve({ status: 'success' });
					};

					writeTransaction.onerror = () => {
						resolve({ status: 'error' });
					};
				}
			};

			getAllRequest.onerror = () => {
				resolve({ status: 'error' });
			};
		};

		request.onerror = (): void => {
			console.error('Error opening database');
			resolve({ status: 'error' });
		};
	});
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
			callback([]);
		};
	};

	openRequest.onerror = (error: Event) => {
		callback([]);
	};
};

// Function to search for a user by ID
export const searchUserById = (customId: string, callback: (user: UserProps | undefined) => void): void => {
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event): void => {
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readonly');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Use the 'auto-incremented' key to look up the user by ID
		const getRequest: IDBRequest<IDBValidKey | undefined> = userStore.get(customId);

		getRequest.onsuccess = (): void => {
			const user: UserProps | undefined = getRequest.result as UserProps | undefined;
			callback(user || undefined);
		};

		getRequest.onerror = (): void => {
			callback(undefined);
		};
	};

	request.onerror = (): void => {
		callback(undefined);
	};
};

export const updateUserStatusById = (customId: string, newStatus: StatusProp, callback: (success: boolean) => void): void => {
	const request: IDBOpenDBRequest = openDatabase();

	request.onsuccess = (event: Event): void => {
		const db: IDBDatabase = 'result' in request ? request.result : (event.target as IDBOpenDBRequest).result;

		// Create a transaction and get the Users object store
		const transaction: IDBTransaction = db.transaction(['Users'], 'readwrite');
		const userStore: IDBObjectStore = transaction.objectStore('Users');

		// Use the 'customId' index to look up the user by ID
		const idIndex: IDBIndex = userStore.index('customId');
		const getRequest: IDBRequest<IDBValidKey | undefined> = idIndex.getKey(customId);

		getRequest.onsuccess = (): void => {
			const userId: IDBValidKey | undefined = getRequest.result;

			if (userId !== undefined) {
				// Fetch the existing user object
				const getRequestData: IDBRequest<UserProps | undefined> = userStore.get(userId);

				getRequestData.onsuccess = (): void => {
					const userData: UserProps | undefined = getRequestData.result;

					if (userData) {
						// Update the status property
						userData.status = newStatus;

						// Use the userId to update the user with the modified data
						const updateRequest: IDBRequest<IDBValidKey> = userStore.put(userData);

						updateRequest.onsuccess = (): void => {
							callback(true);
						};

						updateRequest.onerror = (): void => {
							console.error(`Error updating user status for ID ${customId}`);
							callback(false);
						};
					} else {
						console.error(`User data not found for ID ${customId}`);
						callback(false);
					}
				};

				getRequestData.onerror = (): void => {
					console.error(`Error fetching user data for ID ${customId}`);
					callback(false);
				};
			} else {
				console.error(`User with ID ${customId} not found`);
				callback(false);
			}
		};

		getRequest.onerror = (): void => {
			console.error(`Error searching for user with ID ${customId}`);
			callback(false);
		};
	};

	request.onerror = (): void => {
		console.error('Error opening database');
		callback(false);
	};
};
