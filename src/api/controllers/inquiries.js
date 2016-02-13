import Inquiry from '../models/Inquiry';


export function saveInquiry(data, cb) {
  const inquiry = new Inquiry(data);
  inquiry.save((err) => {
    console.log(err);
    cb(err);
  });
}


export async function findInquiries() {
  try {
    return Inquiry.find()
      .exec();
  } catch (e) {
    throw new Error(e);
  }
}
