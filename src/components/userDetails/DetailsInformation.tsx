import React from 'react';
import { UserProps } from '../../interfaces/typings';
type Props = {
	user: UserProps;
};
const DetailsInformation = ({ user }: Props) => {
	return (
		<section className='general_informations_container'>
			<article className='information_section'>
				<h3 className='information_title'>Personal Information</h3>
				<div className='section_details'>
					<div className='details_container'>
						<p className='details_title'>Full Name</p>
						<h3 className='details_value'>{user.fullName}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Phone Number</p>
						<h3 className='details_value'>{user.phone_number}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Email Address</p>
						<h3 className='details_value'>{user.email}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>BVN</p>
						<h3 className='details_value'>{user.bvn}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Gender</p>
						<h3 className='details_value'>{user.gender}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Marital Status</p>
						<h3 className='details_value'>{user.marital_status}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Children</p>
						<h3 className='details_value'>{user.children}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Type Of Residence</p>
						<h3 className='details_value'>{user.resident_type}</h3>
					</div>
				</div>
			</article>
			<article className='information_section'>
				<h3 className='information_title'>Education and Employment</h3>
				<div className='section_details'>
					<div className='details_container'>
						<p className='details_title'>Level of Education</p>
						<h3 className='details_value'>{user.education_level}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Employment Status</p>
						<h3 className='details_value'>{user.employment_status}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Sector of Employment</p>
						<h3 className='details_value'>{user.industry}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Duration of Employment</p>
						<h3 className='details_value'>{user.duration_of_employment}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Office Email</p>
						<h3 className='details_value'>{user.office_email}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Monthly Income</p>
						<h3 className='details_value'>{user.monthly_income}</h3>
					</div>
					<div className='details_container'>
						<p className='details_title'>Loan Repayment</p>
						<h3 className='details_value'>{user.loan_repayment}</h3>
					</div>
				</div>
			</article>
			<article className='information_section'>
				<h3 className='information_title'>Socials</h3>
				<ul className='section_details'>
					{user.socials.map((item) => (
						<li key={item.platform} className='details_container'>
							<p className='details_title'>{item.platform}</p>
							<h3 className='details_value'>{item.handle}</h3>
						</li>
					))}
				</ul>
			</article>
			<article className=' guarantor'>
				<h3 className='information_title'>Guarantors</h3>
				<div>
					{user.guarantor.map((item) => (
						<div className='section_details information_section'>
							<div className='details_container'>
								<p className='details_title'>Full Name</p>
								<h3 className='details_value'>{item.fullName}</h3>
							</div>
							<div className='details_container'>
								<p className='details_title'>Phone Number</p>
								<h3 className='details_value'>{item.phone_number}</h3>
							</div>
							<div className='details_container'>
								<p className='details_title'>Email Address</p>
								<h3 className='details_value'>{item.email}</h3>
							</div>
							<div className='details_container'>
								<p className='details_title'>Relationship</p>
								<h3 className='details_value'>{item.relationship}</h3>
							</div>
						</div>
					))}
				</div>
			</article>
		</section>
	);
};

export default DetailsInformation;
