const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Data defined inline
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = [];

    // Use User.create instead of insertMany to trigger password hashing middleware
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin'
    });
    createdUsers.push(admin);

    const customer = await User.create({
      name: 'John Doe',
      email: 'customer@pretex.com',
      password: 'password123',
      role: 'customer'
    });
    createdUsers.push(customer);


    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      {
        name: 'Royal Silk Saree',
        image: "/image/Royal Silk Saree.png",
        description: 'Handwoven pure silk saree with zari border.',
        category: 'Silk',
        color: 'Red',
        price: 150,
        stock: 10,
      },
      {
        name: 'Kanjeevaram Silk',
        image: '/image/Kanjeevaram Silk green.png',
        description: 'Authentic Kanjeevaram silk with temple border.',
        category: 'Silk',
        color: 'Green',
        price: 250,
        stock: 8,
      },
      {
        name: 'Designer Party Wear Saree',
        image: '/image/Designer Party Wear Saree -black.png',
        description: 'Modern designer saree for party occasions.',
        category: 'Designer',
        color: 'Black',
        price: 300,
        stock: 12,
      },
      {
        name: 'Cotton Daily Wear Saree',
        image: '/image/Cotton Daily Wear Saree blue.png',
        description: 'Comfortable cotton saree for daily use.',
        category: 'Cotton',
        color: 'Blue',
        price: 60,
        stock: 20,
      },
      {
        name: 'Chiffon Elegant Saree',
        image: '/image/Chiffon Elegant Saree pink.png',
        description: 'Lightweight chiffon saree with soft drape.',
        category: 'Designer',
        color: 'Pink',
        price: 180,
        stock: 15,
      },
      {
        name: 'Georgette Festive Saree',
        image: '/image/Georgette Festive Saree purple.png',
        description: 'Festive wear georgette saree with embroidery.',
        category: 'Designer',
        color: 'Purple',
        price: 220,
        stock: 7,
      },
      {
        name: 'Traditional Temple Border Saree',
        image: '/image/Traditional Temple Border Saree gold.png',
        description: 'Classic temple border silk saree.',
        category: 'Silk',
        color: 'Gold',
        price: 280,
        stock: 5,
      },
      {
        name: 'Linen Summer Saree',
        image: '/image/Linen Summer Saree white.png',
        description: 'Breathable linen saree perfect for summer.',
        category: 'Cotton',
        color: 'White',
        price: 90,
        stock: 18,
      },
      {
        name: 'Bridal Grand Saree',
        image: '/image/Bridal Grand Saree red.png',
        description: 'Heavy bridal saree with intricate design.',
        category: 'Bridal',
        color: 'Red',
        price: 550,
        stock: 3,
      },
      {
        name: 'Soft Silk Wedding Saree',
        image: '/image/Soft Silk Wedding Saree Magenta.png',
        description: 'Elegant soft silk saree perfect for weddings.',
        category: 'Bridal',
        color: 'Magenta',
        price: 480,
        stock: 6,
      },
      {
        name: 'Handloom Cotton Saree',
        image: '/image/Handloom Cotton Saree yellow.png',
        description: 'Traditional handloom cotton saree with natural dye.',
        category: 'Cotton',
        color: 'Yellow',
        price: 95,
        stock: 14,
      }

    ];


    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
