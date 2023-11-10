export type CardProps = {
	title: string;
	icon: string;
	amount: number;
	id: number;
};

export type AppState = {
	user: null;
	counter: number;
};

export type Guarantor = {
	fullName: string;
	phone_number: string;
	email: string;
	relationship: string;
};

export type UserProps = {
	id: string;
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
	monthly_income: number;
	loan_repayment: number;
	socials: string[];
	guarantor: Guarantor[];
};
