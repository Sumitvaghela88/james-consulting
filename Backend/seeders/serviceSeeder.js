
const Service = require('../models/service');

const defaultServices = [
  {
    title: "FREE CONSULTATION",
    duration: "45 min",
    description: "Get expert advice tailored to your business needs",
    price: "Free",
    image: "https://static.wixstatic.com/media/84770f_8ca194a8244a42ae99f70c880b6ce9e6~mv2.jpeg/v1/fill/w_400,h_400,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/84770f_8ca194a8244a42ae99f70c880b6ce9e6~mv2.jpeg",
    isActive: true
  },
  {
    title: "PROJECT MANAGEMENT",
    duration: "1 hr",
    description: "Comprehensive project planning and execution strategies",
    price: "$150",
    image: "https://static.wixstatic.com/media/82fcd3_0b475e3f9c2a4244aceaa58c1ca3c932~mv2.jpg/v1/fill/w_400,h_400,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_0b475e3f9c2a4244aceaa58c1ca3c932~mv2.jpg",
    isActive: true
  },
  {
    title: "OPERATIONAL CONSULTING",
    duration: "1 hr",
    description: "Optimize your business operations for maximum efficiency",
    price: "$200",
    image: "https://static.wixstatic.com/media/82fcd3_ee75c9f1b8e7451cbbf134f22529874e~mv2.jpg/v1/fill/w_400,h_400,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_ee75c9f1b8e7451cbbf134f22529874e~mv2.jpg",
    isActive: true
  },
  {
    title: "CORPORATE STRATEGY",
    duration: "1 hr",
    description: "Strategic planning for long-term business growth",
    price: "$250",
    image: "https://static.wixstatic.com/media/82fcd3_e66f8029559c412da564aead8063cd76~mv2.jpg/v1/fill/w_400,h_400,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/82fcd3_e66f8029559c412da564aead8063cd76~mv2.jpg",
    isActive: true
  }
];

const seedServices = async () => {
  try {
    // Check if services already exist
    const existingServices = await Service.countDocuments();
    
    if (existingServices > 0) {
      console.log('✅ Services already exist in database. Skipping seed.');
      return;
    }

    // Insert default services
    await Service.insertMany(defaultServices);
    console.log('✅ Default services seeded successfully!');
    console.log(`📦 ${defaultServices.length} services added to database`);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
};

// Function to clear all services (use with caution!)
const clearServices = async () => {
  try {
    await Service.deleteMany({});
    console.log(' All services deleted from database');
  } catch (error) {
    console.error(' Error clearing services:', error);
    throw error;
  }
};

// Function to reset services (clear and reseed)
const resetServices = async () => {
  try {
    await clearServices();
    await seedServices();
    console.log('🔄 Services reset successfully!');
  } catch (error) {
    console.error(' Error resetting services:', error);
    throw error;
  }
};

module.exports = {
  seedServices,
  clearServices,
  resetServices,
  defaultServices
};