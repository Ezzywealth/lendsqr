import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useAppDispatch } from '../../Redux/store';
import { setItemsPerPage } from '../../Redux/slices/userSlice';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }: PaginationProps) => {
	const dispatch = useAppDispatch();
	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		onPageChange(page);
	};

	const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedItemsPerPage = parseInt(e.target.value, 10);
		dispatch(setItemsPerPage(selectedItemsPerPage));
	};
	return (
		<div className='pagination-container'>
			<div className='pagination-info'>
				Showing
				<select
					value={itemsPerPage}
					onChange={(e) => {
						handleItemsPerPage(e);
						onPageChange(1);
					}}>
					<option value={itemsPerPage} disabled>
						{itemsPerPage}
					</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>{' '}
				out of {totalItems}
			</div>
			{totalPages > 1 && (
				<div className='pagination-pages'>
					<span className='pagination-arrow'>
						<MdKeyboardArrowLeft size={25} onClick={() => handlePageChange(currentPage - 1)} />
					</span>
					{Array.from({ length: totalPages }, (_, index) => (
						<button key={index} className={`pagination-page ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => handlePageChange(index + 1)}>
							{index + 1}
						</button>
					))}
					<span className='pagination-arrow'>
						<MdKeyboardArrowRight size={25} onClick={() => handlePageChange(currentPage + 1)} />
					</span>
				</div>
			)}
		</div>
	);
};

export default Pagination;
