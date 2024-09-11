import { Schema, model } from "mongoose";
import contactTypeList from '../../constants/contacts.js'

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,

	},
	email: {
		type: String,
		required: false,

	},
	isFavourite: {
		type: Boolean,
		default: false,
	},
	contactType: {
		type: String,
		enum: contactTypeList,
		required: true,
		default: 'personal',
	}
	// createdAt: {
	// 	type: String,
	// 	required: true,
	// },
	// updatedAt: {
	// 	type: String,
	// 	required: true,
	// }

}, { versionKey: false, timestamps: true });

const ContactModel = model('contact', contactSchema);

export default ContactModel;