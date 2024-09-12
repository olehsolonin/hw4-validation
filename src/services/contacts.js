import ContactModel from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js'

export const getContacts = async ({ perPage, page }) => {
	const skip = (page - 1) * perPage;
	const contacts = await ContactModel.find().skip(skip).limit(perPage);
	const count = await ContactModel.find().countDocuments();

	const paginationData = calculatePaginationData({ count, perPage, page });

	return {
		page,
		perPage,
		contacts,
		totalItems: count,
		...paginationData,
	};
};

export const getContactById = (id) => ContactModel.findById(id);

export const createContact = payload => ContactModel.create(payload);

export const updateContact = async (filter, data, options = {}) => {
	const rawResult = await ContactModel.findOneAndUpdate(filter, data, {
		new: true,
		runValidators: true,
		includeResultMetadata: true,
		...options,
	});

	if (!rawResult || !rawResult.value) return null;

	return {
		data: rawResult.value,
		isNew: Boolean(rawResult?.lastErrorObject?.upserted),
	};
};

export const deleteContact = filter => ContactModel.findOneAndDelete(filter);