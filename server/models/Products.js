import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  image2: {
    url: String,
    public_id: String,
  },
  image3: {
    url: String,
    public_id: String,
  },
  image4: {
    url: String,
    public_id: String,
  },
  image5: {
    url: String,
    public_id: String,
  },
  sizes: {
    type: Array,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
    trim: true,
  },
  price: {
    type: Number,
  },
  oldPrice: {
    type: Number,
  },
  available: {
    type: Boolean,
  },
  collectionType: {
    type: String,
    // required: true,
    trim: true,
  },
  type: {
    type: String,
    // required: true,
    trim: true,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.model('Product', productSchema);

/* 
    title: es para el nombre,
    description: descripcion del producto,
    image1,
    image2,
    image3,
    image4,
    image5,
    sizes: tallas,
    category: categoria, tipo pantalon, tshirt, sweater, etc,
    price: precio,
    oldPrice: precio biejo,
    available: disponible, true o false,
    collection: a cual coleccion pertenece,
    type: tipo, si es mas vendidos o recientes,
*/
