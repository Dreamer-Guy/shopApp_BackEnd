import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';
import Product from '../models/Product.js';
import ProductDetail, { PhoneDetail, LaptopDetail, WatchDetail, CameraDetail, TelevisionDetail } from '../models/ProductDetails.js';
import ProductProperties from '../models/ProductProperties.js';
import ProductPropertyValues from '../models/ProductPropertyValues.js';


// Cấu hình kết nối MongoDB

export const up = async () => {
    try {

        // Dữ liệu mock cho Category
        const mockCategories = [
            {
                name: 'laptop',
                image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732979305315-594457545.png?alt=media&token=d4b16390-f735-4977-bd79-a129ef4c3dbb',
                description: 's',
                createdAt: new Date('2022-01-01T00:00:00Z'),
            },
            {
                name: 'television',
                image: 'https://example.com/images/television.jpg',
                description: 'High-definition TVs for home entertainment',
                createdAt: new Date('2022-02-01T00:00:00Z'),
            },
            {
                name: 'camera',
                image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732979331824-543906419.png?alt=media&token=c72f9d33-a52b-4bb3-be75-a70721c85a73',
                description: 'Capture memories with professional cameras',
                createdAt: new Date('2022-03-01T00:00:00Z'),
            },
            {
                name: 'phone',
                image: 'https://example.com/images/phone.jpg',
                description: 'Smartphones with the latest technology',
                createdAt: new Date('2022-04-01T00:00:00Z'),
            },
            {
                name: 'watch',
                image: 'https://example.com/images/watch.jpg',
                description: 'Stylish and functional timepieces',
                createdAt: new Date('2022-05-01T00:00:00Z'),
            },
        ];
        

        // Dữ liệu mock cho Brand
        const mockBrands = [
            {
                name: 'samsung',
                image: 'https://example.com/images/samsung.jpg',
                description: 'Pioneer in electronics and home appliances',
                createdAt: new Date('2022-02-01T00:00:00Z'),
            },
            {
                name: 'vivo',
                image: 'https://example.com/images/vivo.jpg',
                description: 'High-quality smartphones with innovative features',
                createdAt: new Date('2022-03-01T00:00:00Z'),
            },
            {
                name: 'Acer',
                image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732955748009-636246553.png?alt=media&token=934bdedd-8cf0-49d7-9266-76bfca3aae2a',
                description: 'New brand of our store',
                createdAt: new Date('2022-04-01T00:00:00Z'),
            },
            {
                name: 'oppo',
                image: 'https://example.com/images/oppo.jpg',
                description: 'Innovative and stylish smartphones',
                createdAt: new Date('2022-05-01T00:00:00Z'),
            },
            {
                name: 'Lazada',
                image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732949124488-530719261.png?alt=media&token=145c41aa-15b4-492e-a3fd-8ae8ba76145b',
                description: 'This is a stupid brand',
                createdAt: new Date('2024-11-30T06:45:33.946Z'),
            },
        ];


        // Thêm dữ liệu vào bảng Categories và Brands
        const categories = await Category.insertMany(mockCategories);
        const brands = await Brand.insertMany(mockBrands);
        

        // Dữ liệu mock cho Product
        const mockProducts = [
            {
                name: 'MacBook Pro 14-inch',
                price: 1999,
                salePrice: 1799,
                totalStock: 50,
                image: 'https://cdn.tgdd.vn/Products/Images/44/309532/acer-predator-helios-neo-phn16-71-7460-i7-nhqltsv004-glr-thumb-600x600.jpg',
                rating: 4.8,
                description: 'Powerful laptop with M1 Pro chip',
                status: 'On stock',
                createdAt: new Date('2022-01-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "laptop")._id,
                brand_id: brands.find(c => c.name === "Lazada")._id,
            },
            {
                name: 'Samsung QLED TV 55-inch',
                price: 999,
                salePrice: 899,
                totalStock: 30,
                image: 'https://example.com/images/samsung-qled-55.jpg',
                rating: 4.7,
                description: 'Crystal-clear 4K picture quality',
                status: 'On stock',
                createdAt: new Date('2022-02-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "television")._id,
                brand_id: brands.find(c => c.name === "Lazada")._id,
            },
            {
                name: 'Canon EOS R6',
                price: 2499,
                salePrice: 2199,
                totalStock: 20,
                image: 'https://example.com/images/canon-eos-r6.jpg',
                rating: 4.9,
                description: 'Full-frame mirrorless camera for professionals',
                status: 'On stock',
                createdAt: new Date('2022-03-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "camera")._id,
                brand_id: brands.find(c => c.name === "samsung")._id,
            },
            {
                name: 'iPhone 14 Pro Max',
                price: 1099,
                salePrice: 999,
                totalStock: 80,
                image: 'https://example.com/images/iphone-14-pro-max.jpg',
                rating: 4.6,
                description: "Apple's latest flagship smartphone",
                status: 'On stock',
                createdAt: new Date('2022-04-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "phone")._id,
                brand_id: brands.find(c => c.name === "samsung")._id,
            },
            {
                name: 'Fossil Gen 6 Smartwatch',
                price: 299,
                salePrice: 249,
                totalStock: 40,
                image: 'https://example.com/images/fossil-gen-6.jpg',
                rating: 4.5,
                description: 'Advanced smartwatch with Wear OS',
                status: 'On stock',
                createdAt: new Date('2022-05-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "watch")._id,
                brand_id: brands.find(c => c.name === "Lazada")._id,
            },
            {
                name: 'Dell XPS 13',
                price: 1399,
                salePrice: 1299,
                totalStock: 25,
                image: 'https://example.com/images/dell-xps-13.jpg',
                rating: 4.7,
                description: 'Premium ultrabook for professionals',
                status: 'On stock',
                createdAt: new Date('2022-06-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "laptop")._id,
                brand_id: brands.find(c => c.name === "vivo")._id,
            },
            {
                name: 'Samsung Galaxy S22 Ultra',
                price: 1199,
                salePrice: 1099,
                totalStock: 60,
                image: 'https://example.com/images/galaxy-s22-ultra.jpg',
                rating: 4.8,
                description: 'Samsung\'s flagship smartphone with S-Pen',
                status: 'On stock',
                createdAt: new Date('2022-07-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "phone")._id,
                brand_id: brands.find(c => c.name === "vivo")._id,
            },
            {
                name: 'Sony Alpha a7 IV',
                price: 2699,
                salePrice: 2599,
                totalStock: 15,
                image: 'https://example.com/images/sony-alpha-a7-iv.jpg',
                rating: 4.9,
                description: 'Advanced mirrorless camera with high resolution',
                status: 'On stock',
                createdAt: new Date('2022-08-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "camera")._id,
                brand_id: brands.find(c => c.name === "Acer")._id,
            },
            {
                name: 'Acer Aspire 7',
                price: 799,
                salePrice: 699,
                totalStock: 70,
                image: 'https://example.com/images/acer-aspire-7.jpg',
                rating: 4.3,
                description: 'Affordable laptop with gaming capabilities',
                status: 'On stock',
                createdAt: new Date('2022-09-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "laptop")._id,
                brand_id: brands.find(c => c.name === "Acer")._id,
            },
            {
                name: 'LG OLED TV 65-inch',
                price: 1999,
                salePrice: 1899,
                totalStock: 35,
                image: 'https://example.com/images/lg-oled-65.jpg',
                rating: 4.9,
                description: 'Best-in-class picture quality with OLED',
                status: 'On stock',
                createdAt: new Date('2022-10-01T00:00:00Z'),
                category_id: categories.find(c => c.name === "television")._id,
                brand_id: brands.find(c => c.name === "oppo")._id,
            },
            {
                name: 'iPhone 11 128GB',
                price: 627.95,
                salePrice: 500,
                totalStock: 40,
                image: 'https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg',
                rating: 4.1,
                description: 'Latest generation iphone',
                status: 'On stock',
                createdAt: new Date(),
                category_id: categories.find(c => c.name === "phone")._id,
                brand_id: brands.find(c => c.name === "Lazada")._id,
            },
        ];
        

        // Dữ liệu mock cho ProductDetail
        const mockProductDetails = [
            {
                productId: null,
                type: "phone",
                weight: "194g",
                internalMemory: "128GB",
                chip: "Apple A13 Bionic",
                screenSize: "6.1 inches",
                batteryCapacity: "3110mAh",
                operatingSystem: "IOS 17"
            },
            {
                productId: "64a0c88a57f1c78d1b634a10",
                type: "phone",
                weight: "227g",
                internalMemory: "256GB",
                chip: "Apple A18 Pro 6 nhân",
                screenSize: "6.9 inches",
                batteryCapacity: "4676mAh",
                operatingSystem: "IOS 18"
            },
            {
                productId: "64a0c88a57f1c78d1b634a10",
                type: "phone",
                weight: "217g",
                internalMemory: "128GB",
                chip: "MediaTek Dimensity 6100+",
                screenSize: "6.5 inches",
                batteryCapacity: "6000mAh",
                operatingSystem: "Android 14"
            },
            {
                productId: "64a0c88a57f1c78d1b634a10",
                type: "phone",
                weight: "245g",
                internalMemory: "512GB",
                chip: "Sanpdragon 8 Gen 2 8 nhân",
                screenSize: "7.82 inches (main), 6.31 inches (extra)",
                batteryCapacity: "4805mAh",
                operatingSystem: "Android 13"
            },
            {
                productId: "64a0c88a57f1c78d1b634a10",
                type: "phone",
                weight: "285g",
                internalMemory: "256GB",
                chip: "MediaTek Dimensity 7300 Energy 5G 8 nhân",
                screenSize: "6.67 inches",
                batteryCapacity: "5000mAh",
                operatingSystem: "Android 14"
            },
            {
                productId: "67135ef9a844ab7ea1b00755",
                type: "laptop",
                weight: "1.63kg",
                CPU: "AMD Ryzen 5 - 7520U",
                RAM: "16GB",
                storage: "512GB SSD",
                screenSize: "15.6 inches",
                operatingSystem: "Windows 11"
            },
            {
                productId: "67135ef9a844ab7ea1b00755",
                type: "laptop",
                weight: "1.29kg",
                CPU: "Apple M1",
                RAM: "8GB",
                storage: "256GB SSD",
                screenSize: "13.3 inches",
                operatingSystem: "macOS"
            },
            {
                productId: "67135ef9a844ab7ea1b00755",
                type: "laptop",
                weight: "1.7kg",
                CPU: "AMD Ryzen 7 - 5700U",
                RAM: "8GB",
                storage: "512GB SSD",
                screenSize: "15.6 inches",
                operatingSystem: "Windows 11"
            },
            {
                productId: "67135ef9a844ab7ea1b00755",
                type: "laptop",
                weight: "1.24kg",
                CPU: "Apple M2",
                RAM: "8GB",
                storage: "256GB SSD",
                screenSize: "13.6 inches",
                operatingSystem: "macOS"
            },
            {
                productId: "67135ef9a844ab7ea1b00755",
                type: "laptop",
                weight: "2.29kg",
                CPU: "Intel Core i5 Alder Lake - 12450H",
                RAM: "16GB",
                storage: "512GB SSD",
                screenSize: "15.6 inches",
                operatingSystem: "Windows 11"
            },
            {
                productId: "64a0c88a57f1c78d1b634a12",
                type: "watch",
                weight: "44.52g",
                batteryCapacity: "230mAh",
                screenSize: "1.95 inches",
                operatingSystem: "Không công bố"
            },
            {
                productId: "64a0c88a57f1c78d1b634a12",
                type: "watch",
                weight: "41.67g",
                batteryCapacity: "289mAh",
                screenSize: "1.83 inches",
                operatingSystem: "Không công bố"
            },
            {
                productId: "64a0c88a57f1c78d1b634a12",
                type: "watch",
                weight: "61.8g",
                batteryCapacity: "36-72 giờ",
                screenSize: "1.92 inches",
                operatingSystem: "WatchOS"
            },
            {
                productId: "64a0c88a57f1c78d1b634a12",
                type: "watch",
                weight: "38.7g",
                batteryCapacity: "18-36 giờ",
                screenSize: "1.9 inches",
                operatingSystem: "WatchOS"
            },
            {
                productId: "64a0c88a57f1c78d1b634a12",
                type: "watch",
                weight: "26.6g",
                batteryCapacity: "247mAh",
                screenSize: "1.2 inches",
                operatingSystem: "WearOS"
            },
            {
                productId: "67135f33a844ab7ea1b0075b",
                type: "camera",
                weight: "190g",
                batteryCapacity: "1770mAh",
                cameraType: "Action Camera",
                cameraSensor: "CMOS",
                imageStabilization: "Electronic",
                screenSize: "Front Display: 1.4 inches, Rear Display: 2.25 inches",
                screenType: "Touchscreen"
            },
            {
                productId: "67135f33a844ab7ea1b0075b",
                type: "camera",
                weight: "180g",
                batteryCapacity: "1800mAh",
                cameraType: "360° Action Camera",
                cameraSensor: "Dual 48MP sensors (1/2 inch)",
                imageStabilization: "FlowState",
                screenSize: "2.29 inches",
                screenType: "LCD Touchscreen"
            },
            {
                productId: "67135f33a844ab7ea1b0075b",
                type: "camera",
                weight: "190g",
                batteryCapacity: "1900mAh",
                cameraType: "Action Camera",
                cameraSensor: "CMOS",
                imageStabilization: "Electronic",
                screenSize: "Front Display: 1.4 inches, Rear Display: 2.27 inches",
                screenType: "Touchscreen"
            },
            {
                productId: "67135f33a844ab7ea1b0075b",
                type: "camera",
                weight: "246g",
                batteryCapacity: "2250mAh",
                cameraType: "Flycam",
                cameraSensor: "CMOS 1/2.3",
                imageStabilization: "3-pillar mechanics",
                screenSize: "Depends on the connected screen",
                screenType: "Smartphone Screen remote control"
            },
            {
                productId: "67135f33a844ab7ea1b0075b",
                type: "camera",
                weight: "154g",
                batteryCapacity: "1300mAh",
                cameraType: "Action Camera",
                cameraSensor: "CMOS",
                imageStabilization: "Electronic",
                screenSize: "1.8 inches",
                screenType: "Touchscreen"
            },
        ];

        

        // Dữ liệu mock cho ProductProperty
        const mockProductProperties = [
            {
                category_id: categories.find(c => c.name === "phone")._id,
                name: "InternalMemory",
                description: "256GB internal memory",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "laptop")._id,
                name: "CPU",
                description: "Qualcomm Snapdragon 888 CPU",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "laptop")._id,
                name: "RAM",
                description: "8GB LPDDR4X RAM",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "laptop")._id,
                name: "Storage",
                description: "128GB UFS 3.1 storage",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "laptop")._id,
                name: "ScreenSize",
                description: "6.5 inch FHD+ AMOLED display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "laptop")._id,
                name: "OperatingSystem",
                description: "iOS 16",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "phone")._id,
                name: "BatteryCapacity",
                description: "4000mAh battery",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "phone")._id,
                name: "ScreenSize",
                description: "6.1 inch Super Retina display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "phone")._id,
                name: "OperatingSystem",
                description: "macOS Ventura",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "BatteryCapacity",
                description: "4500mAh battery",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "CameraType",
                description: "Triple lens camera",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "CameraSensor",
                description: "48MP primary sensor",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "ImageStabilization",
                description: "Optical image stabilization",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "ScreenSize",
                description: "6.5 inch OLED display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "camera")._id,
                name: "ScreenType",
                description: "AMOLED display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "ScreenSize",
                description: "6.7 inch FHD+ AMOLED display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "ScreenType",
                description: "OLED display",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "RefreshRate",
                description: "120Hz refresh rate",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "ImageTechnology",
                description: "HDR10+ support",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "SoundTechnology",
                description: "Dolby Atmos sound technology",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "television")._id,
                name: "OperatingSystem",
                description: "Android 13",
                createdAt: new Date("2024-11-28T08:00:00.000Z")
            },
            {
                category_id: categories.find(c => c.name === "phone")._id,
                name: "Screen",
                description: "How much satisfaction the device can bring to you",
                createdAt: new Date("2024-11-30T23:33:28.467Z")
            }
        ];

        // Dữ liệu cho Product Property Values
        const mockProductPropertyValues = [
            {
            product_id: null,
            property_id: null,
            value: "6.7 inch FHD+ AMOLED display",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
            {
            product_id: null,
            property_id: null,
            value: "OLED display",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
            {
            product_id: null,
            property_id: null,
            value: "120Hz refresh rate",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
            {
            product_id: null,
            property_id: null,
            value: "HDR10+ support",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
            {
            product_id: null,
            property_id: null,
            value: "Dolby Atmos sound technology",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
            {
            product_id: null,
            property_id: null,
            value: "Android 13",
            createdAt: new Date("2024-11-28T08:00:00.000Z"),
            },
        ];


        // Thêm dữ liệu mock vào bảng Products
        const insertedProducts = await Product.insertMany(mockProducts);

        
        // Cập nhật productId cho ProductDetail
        mockProductDetails[0].productId = insertedProducts[10]._id;

        // Thêm dữ liệu vào bảng ProductDetail
        await ProductDetail.insertMany(mockProductDetails);
 
        
        const insertPropertyValues = await ProductProperties.insertMany(mockProductProperties);


        // Thêm dữ liệu mock vào ProductPropertiesValues
        mockProductPropertyValues[0].product_id = insertedProducts[0]._id;
        mockProductPropertyValues[1].product_id = insertedProducts[0]._id;
        mockProductPropertyValues[2].product_id = insertedProducts[0]._id;
        mockProductPropertyValues[3].product_id = insertedProducts[0]._id;
        mockProductPropertyValues[4].product_id = insertedProducts[0]._id;
        mockProductPropertyValues[5].product_id = insertedProducts[0]._id;


        mockProductPropertyValues[0].property_id = insertPropertyValues[15]._id;
        mockProductPropertyValues[1].property_id = insertPropertyValues[16]._id;
        mockProductPropertyValues[2].property_id = insertPropertyValues[17]._id;
        mockProductPropertyValues[3].property_id = insertPropertyValues[18]._id;
        mockProductPropertyValues[4].property_id = insertPropertyValues[19]._id;
        mockProductPropertyValues[5].property_id = insertPropertyValues[20]._id;
        

        await ProductPropertyValues.insertMany(mockProductPropertyValues);

        console.log('Mock data has been successfully inserted into the database!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        // Đảm bảo đóng kết nối khi hoàn thành
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

export const down = async () => {
  try {
    await mongoose.connect(uri);

    // Xóa tất cả sản phẩm, thương hiệu, danh mục và các chi tiết sản phẩm để rollback migration
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});
    await ProductDetail.deleteMany({});
    await ProductProperties.deleteMany({});
    await ProductPropertyValues.deleteMany({});
    console.log('Data has been successfully removed from the database!');
  } catch (error) {
    console.error('Error during rollback:', error);
  } finally {
    // Đảm bảo đóng kết nối khi hoàn thành
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};
