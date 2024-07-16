import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: Object,
  },
});

export default mongoose.model('Collection', collectionSchema);
