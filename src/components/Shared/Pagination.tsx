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

	const renderPageButtons = () => {
		const pageButtons = [];

		// Determine the range of pages to display
		const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 5));
		const endPage = Math.min(totalPages, startPage + 2); // Show 5 pages in total

		// Always show the last two pages if there are more than 5 pages
		const lastTwoPages = Math.max(1, totalPages - 1);

		for (let i = startPage; i <= endPage; i++) {
			pageButtons.push(
				<button key={i} className={`pagination-page ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>
					{i}
				</button>
			);
		}

		// Show dots if there are more than 5 pages
		if (totalPages > 5 && endPage < totalPages - 1) {
			pageButtons.push(
				<span key='dots' className='pagination-dots'>
					...
				</span>
			);
		}

		// Always show the last three pages
		for (let i = lastTwoPages; i <= totalPages; i++) {
			pageButtons.push(
				<button key={i} className={`pagination-page ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>
					{i}
				</button>
			);
		}

		return pageButtons;
	};

	return (
		<div className='pagination-container'>
			<div className='pagination-info'>
				Showing
				<select
					value={currentPage}
					onChange={(e) => {
						onPageChange(+e.target.value);
					}}>
					{Array.from({ length: totalPages }, (_, index) => (
						<option key={index + 1} value={index + 1}>
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
