import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  date: { type: Date },
  text: { type: String, trim: true },
  email: { type: String, trim: true },
  name: { type: String, trim: true },
});

EmailSchema.path('text').required(true, 'Email must have text');
EmailSchema.path('name').required(true, 'Email must have text');
EmailSchema.path('email').required(true, 'Email must have email');
/* eslint-disable func-names*/
EmailSchema.pre('save', function (next) {
  const err = this.validateSync();
  next(err);
});

export default mongoose.model('Email', EmailSchema);
