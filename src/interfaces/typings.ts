export type CardProps = {
	title: string;
	icon: string;
	amount: number;
	id: number;
};

export type OptionsDataProp = {
	id: number;
	title: string;
	icon: JSX.Element;
	status: StatusProp;
};

export type StatusProp = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export type UpdateStatusProps = {
	id: string;
	status: StatusProp;
};

export type LoginProps = {
	email: string;
	password: string;
};

export type AdminProps = {
	id: number;
	image: string;
	firstName: string;
	lastName: string;
};

export type AuthProps = {
	admin: undefined | AdminProps;
	loginLoading: boolean;
	loginError: string;
};

export type AppState = {
	users: UserProps[];
	user: UserProps | null | undefined;
	filteredUsers: UserProps[];
	usersLoading: boolean;
	usersError: string;
	userLoading: boolean;
	userError: string;
	updateLoading: boolean;
	updateError: string;
	currentPage: number;
	totalPages: number;
	pageSize: number;
	noOfItems: number;
	showOptionsModal: boolean;
	sidebarOpen: boolean;
};

export type Guarantor = {
	fullName: string;
	phone_number: string;
	email: string;
	relationship: string;
};

export type MonthlyIncomeProp = {
	'min': number;
	'max': number;
};

export type UserProps = {
	customId: string;
	id: number;
	fullName: string;
	profile_picture: string;
	organization: string;
	username: string;
	email: string;
	date_joined: string;
	status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
	phone_number: string;
	acc_tier: 1 | 2 | 3;
	acc_balance: number;
	acc_number: number;
	bank_name: string;
	bvn: number;
	gender: 'Male' | 'Female';
	marital_status: string;
	children: 'Yes' | 'No';
	resident_type: 'Parental Resident' | 'Own Resident';
	education_level: string;
	employment_status: string;
	industry: string;
	duration_of_employment: string;
	office_email: string;
	monthly_income: MonthlyIncomeProp;
	loan_repayment: number;
	socials: Social[];
	guarantor: Guarantor[];
};

export type Social = {
	platform: string;
	handle: string;
};

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
	onPageChange: (page: number) => void;
}
