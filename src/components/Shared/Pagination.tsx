import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { PaginationProps } from '../../interfaces/typings';
import PaginationBtns from './PaginationBtns';

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }: PaginationProps) => {
	const { renderPageButtons, handlePageChange } = PaginationBtns({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange });

	return (
		<div className='pagination-container'>
			<div className='pagination-info'>
				<p>Showing</p>
				<select
					value={currentPage}
					onChange={(e) => {
						onPageChange(+e.target.value);
					}}
					className='select-field'>
					{Array.from({ length: totalPages }, (_, index) => (
						<option key={index + 1} value={index + 1} data-testid={`option-${index + 1}`}>
							{index + 1}
						</option>
					))}
				</select>
				out of {totalPages}
			</div>
			{totalPages > 1 && (
				<div className='pagination-pages'>
					<span className='pagination-arrow'>
						<MdKeyboardArrowLeft size={25} onClick={() => handlePageChange(currentPage - 1)} />
					</span>
					{renderPageButtons()}
					<span className='pagination-arrow'>
						<MdKeyboardArrowRight size={25} onClick={() => handlePageChange(currentPage + 1)} />
					</span>
				</div>
			)}
		</div>
	);
};

export default Pagination;
