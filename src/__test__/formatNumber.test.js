import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { formatNumber } from '../utils/userDetails';

describe('formatNumber function', () => {
	it('returns undefined for null input', () => {
		expect(formatNumber(null)).toBeUndefined();
	});

	it('returns undefined for undefined input', () => {
		expect(formatNumber(undefined)).toBeUndefined();
	});

	it('formats a positive number with commas', () => {
		expect(formatNumber(123456789)).toBe('123,456,789');
	});

	it('formats a negative number with commas', () => {
		expect(formatNumber(-987654321)).toBe('-987,654,321');
	});

	it('returns undefined for NaN input', () => {
		expect(formatNumber(NaN)).toBeUndefined();
	});

	it('returns undefined for non-numeric input', () => {
		expect(formatNumber('not a number')).toBeUndefined();
	});

	it('returns undefined for an empty string input', () => {
		expect(formatNumber('')).toBeUndefined();
	});

	it('returns undefined for a string with non-numeric characters', () => {
		expect(formatNumber('abc123')).toBeUndefined();
	});

	it('handles zero as input', () => {
		expect(formatNumber(0)).toBeUndefined();
	});

	it('handles decimals as input', () => {
		expect(formatNumber(1234.5678)).toBe('1,234.5,678');
	});
});
