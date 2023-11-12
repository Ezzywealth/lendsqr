import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

type Props = {
	color: string;
};
const RotatingSpinner = ({ color }: Props) => {
	return <RotatingLines strokeColor={color} strokeWidth='5' animationDuration='0.75' width='16' visible={true} />;
};

export default RotatingSpinner;
