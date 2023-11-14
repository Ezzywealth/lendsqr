import React, { useState } from 'react';
import { useAppDispatch } from '../../../../Redux/store';
import { buttonPagination, filterUsers, setShowOptionsModal, updateUserStatus } from '../../../../Redux/slices/userSlice';
import { OptionsDataProp, StatusProp } from '../../../../interfaces/typings';
import { BsEye, BsPersonXFill, BsPersonCheckFill } from 'react-icons/bs';

export const optionsData: OptionsDataProp[] = [
	{
		id: 1,
		title: 'Blacklist User',
		icon: <BsPersonXFill />,
		status: 'Blacklisted',
	},
	{
		id: 2,
		title: 'Activate User',
		icon: <BsPersonCheckFill />,
		status: 'Active',
	},
];
const TableHook = () => {
	const [showFilterModal, setShowFilterModal] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const [organization, setOrganization] = useState('');
	const [username, setUsername] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [date, setDate] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	// const [showOptionsModal, setShowOptionsModal] = useState(false);
	const dispatch = useAppDispatch();

	const handleOptionsModal = (value: boolean) => {
		dispatch(setShowOptionsModal(value));
	};

	const onClose = () => {
		console.log('onClose');
	};

	const applyFilters = () => {
		dispatch(filterUsers({ organization, username, phoneNumber, date, email, status }));
		setOrganization('');
		setUsername('');
		setPhoneNumber('');
		setDate('');
		setEmail('');
		setStatus('');
	};

	const handlePageChange = (page: number) => {
		console.log(page);
		dispatch(buttonPagination(page));
	};

	const handleUserStatus = (id: string, status: StatusProp) => {
		dispatch(updateUserStatus({ id, status }));
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
		handleOptionsModal,
		handlePageChange,
		handleUserStatus,
	};
};

export default TableHook;
