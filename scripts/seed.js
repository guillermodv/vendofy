require('dotenv').config({ path: '../.env.local' });
const { MongoClient } = require('mongodb');

const products = [
  {
    name: 'Laptop Pro',
    price: 1200,
    purchasePrice: 900,
    quantity: 10,
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Laptop+Pro',
    description: 'Una laptop potente para profesionales y creativos.'
  },
  {
    name: 'Smartphone X',
    price: 800,
    purchasePrice: 600,
    quantity: 5,
    cost: 600,      
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Smartphone+X',
    description: 'El último smartphone con una cámara increíble y un rendimiento excepcional.'
  },
  {
    name: 'Auriculares Inalámbricos',
    price: 150,
    purchasePrice: 100,
    quantity: 20,
    cost: 100,
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Auriculares',
    description: 'Sumérgete en tu música con estos auriculares con cancelación de ruido.'
  },
  {
    name: 'Teclado Mecánico',
    price: 120,
    purchasePrice: 80,
    quantity: 15,
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Teclado',
    description: 'Un teclado mecánico responsivo y duradero para gaming y productividad.'
  },
  {
    name: 'Monitor 4K',
    price: 600,
    purchasePrice: 450,
    quantity: 7,
    cost: 450,
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Monitor+4K',
    description: 'Disfruta de una calidad de imagen impresionante con este monitor 4K de 27 pulgadas.'
  },
  {
    name: 'Ratón Gaming',
    price: 75,
    purchasePrice: 50,
    quantity: 25,
    cost: 50,
    image: 'https://placehold.co/600x400/2d3748/ffffff?text=Ratón+Gaming',
    description: 'Un ratón gaming de alta precisión con iluminación RGB personalizable.'
  }
];

async function seedDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI no está definida en .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const database = client.db('vendofy'); // Asegúrate que el nombre de la BD sea correcto
    const collection = database.collection('products');

    await collection.deleteMany({}); 
    await collection.insertMany(products);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedDB();
