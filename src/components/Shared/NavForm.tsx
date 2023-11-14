import React, { FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const NavForm = () => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<form className='nav_search_form' onSubmit={handleSubmit}>
			<input type='text' placeholder='Search for anything' className='search_input' />
			<button type='submit' className='search_btn'>
				<AiOutlineSearch size={30} className='icon' />
			</button>
		</form>
	);
};

export default NavForm;
