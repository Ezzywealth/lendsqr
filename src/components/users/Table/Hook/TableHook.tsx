import React, { useState } from 'react';

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

	const onClose = () => {
		console.log('onClose');
	};

	const applyFilters = () => {
		console.log('applyFilters');
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
	};
};

export default TableHook;
