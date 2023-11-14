import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/slices/userSlice';

type Props = {
	name: string;
};
const CardHook = ({ name }: Props) => {
	const { users } = useSelector((state: RootState) => state.users);
	const [usersLength, setUsersLength] = useState<number>(users.length);
	const [activeUsers, setActiveUsers] = useState<number>(0);
	const [usersWithLoans, setUsersWithLoans] = useState<number>(0);
	const [usersWithSavings, setUsersWithSavings] = useState<number>(0);
	const [returnVal, setReturnVal] = useState<number>(0);

	useEffect(() => {
		if (users.length > 0) {
			setUsersLength(users.length);
			setActiveUsers(users.filter((user) => user.status === 'Active').length);
			setUsersWithLoans(users.filter((user) => user.loan_repayment).length);
			setUsersWithSavings(users.filter((user) => user.acc_balance).length);
		}
	}, [users, name]);

	useEffect(() => {
		if (name.toLowerCase() === 'users') {
			setReturnVal(usersLength);
		} else if (name.toLowerCase() === 'active users') {
			setReturnVal(activeUsers);
		} else if (name.toLowerCase() === 'users with loans') {
			setReturnVal(usersWithLoans);
		} else if (name.toLowerCase() === 'users with savings') {
			setReturnVal(usersWithSavings);
		}
	}, [usersLength, activeUsers, usersWithLoans, usersWithSavings]);

	return {
		usersLength,
		activeUsers,
		usersWithLoans,
		usersWithSavings,
		returnVal,
	};
};

export default CardHook;
