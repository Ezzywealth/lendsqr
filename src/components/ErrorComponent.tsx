import React from 'react';
import { BiRefresh } from 'react-icons/bi';
type Props = {
	errorMessage: string;
	reload: () => void;
};
const ErrorComponent = ({ errorMessage, reload }: Props) => {
	return (
		<div className='error_container'>
			<h3 className='error_message'>{errorMessage}</h3>
			<BiRefresh size={30} onClick={reload} cursor='pointer' color='#213f7d' />
		</div>
	);
};

export default ErrorComponent;
