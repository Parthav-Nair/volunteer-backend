
import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  role: { type: String, trim: true },
  availability: { type: String, trim: true },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Applicant = mongoose.model('Applicant', ApplicantSchema);

export default Applicant;