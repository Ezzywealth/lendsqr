import React, { useState } from 'react';
import { useAppDispatch } from '../../../../Redux/store';
import { activateUser, blackListUser, buttonPagination, filterUsers } from '../../../../Redux/slices/userSlice';

const TableHook = () => {
	const [showFilterModal, setShowFilterModal] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const [organization, setOrganization] = useState('');
	const [username, setUsername] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [date, setDate] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [showOptionsModal, setShowOptionsModal] = useState(false);
	const dispatch = useAppDispatch();
	const onClose = () => {
		console.log('onClose');
	};

	const applyFilters = () => {
		console.log('applyFilters');
		console.log(organization, username, phoneNumber, date, email, status);
		dispatch(filterUsers({ organization, username, phoneNumber, date, email, status }));
	};

	const handlePageChange = (page: number) => {
		console.log(page);
		dispatch(buttonPagination(page));
	};

	const handleActivateUser = (id: string | undefined) => {
		dispatch(activateUser({ id }));
	};

	const handleBlacklistUser = (id: string  | undefined) => {
		dispatch(blackListUser({ id }));
	};
	return {
		showFilterModal,
		setShowFilterModal,
		onClose,
		applyFilters,
		isOpen,
		setIsOpen,
		organization,
		setOrganization,
		username,
		setUsername,
		phoneNumber,
		setPhoneNumber,
		date,
		setDate,
		email,
		setEmail,
		status,
		setStatus,
		showOptionsModal,
		setShowOptionsModal,
		handlePageChange,
		handleActivateUser,
		handleBlacklistUser,
	};
};

export default TableHook;
