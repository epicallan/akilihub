import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  date: { type: Date },
  name: { type: String, trim: true },
  email: { type: String, trim: true, unique: true },
});

InquirySchema.plugin(uniqueValidator);
InquirySchema.path('name').required(true, 'inquiry must have a name');
InquirySchema.path('email').required(true, 'inquiry must have an email');
/* eslint-disable func-names*/
InquirySchema.pre('save', function (next) {
  const err = this.validateSync();
  next(err);
});

export default mongoose.model('Inquiry', InquirySchema);
