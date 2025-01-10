import mongoose from "mongoose";

// Dữ liệu mock cho Category
const mockCategories = [
    {
        name: 'Laptop',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732979305315-594457545.png?alt=media&token=d4b16390-f735-4977-bd79-a129ef4c3dbb',
        description: 's',
        createdAt: new Date('2022-01-01T00:00:00Z'),
    },
    {
        name: 'Television',
        image: 'https://example.com/images/television.jpg',
        description: 'High-definition TVs for home entertainment',
        createdAt: new Date('2022-02-01T00:00:00Z'),
    },
    {
        name: 'Camera',
        image: 'https://firebasestorage.googleapis.com/v0/b/my-app-4c221.appspot.com/o/nmcnpm%2Fimage-1732979331824-543906419.png?alt=media&token=c72f9d33-a52b-4bb3-be75-a70721c85a73',
        description: 'Capture memories with professional cameras',
        createdAt: new Date('2022-03-01T00:00:00Z'),
    },
    {
        name: 'Phone',
        image: 'https://example.com/images/phone.jpg',
        description: 'Smartphones with the latest technology',
        createdAt: new Date('2022-04-01T00:00:00Z'),
    },
    {
        name: 'Watch',
        image: 'https://example.com/images/watch.jpg',
        description: 'Stylish and functional timepieces',
        createdAt: new Date('2022-05-01T00:00:00Z'),
    },
];


// Dữ liệu mock cho Brand
const mockBrands = [
    {
        name: 'Samsung',
        image: 'https://example.com/images/samsung.jpg',
        description: 'Pioneer in electronics and home appliances',
        createdAt: new Date('2022-02-01T00:00:00Z'),
    },
    {
        name: 'Apple',
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
        name: 'Oppo',
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


// Dữ liệu mock cho Product
const mockProducts = [
    // Phone
    {
        name: 'iPhone 11 128GB',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg',
        rating: 4.1,
        description: 'Latest generation smartphone',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'iPhone 16 Pro Max 256GB',
        price: 999,
        salePrice: 899,
        totalStock: 30,
        image: 'https://cdn.tgdd.vn/Products/Images/42/329149/Slider/vi-vn-iphone-16-pro-max-1.jpg',
        rating: 4.7,
        description: 'Crystal-clear 4K picture quality',
        status: 'On stock',
        createdAt: new Date('2022-02-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Samsung Galaxy M15 5G 4GB/128GB',
        price: 2499,
        salePrice: 2199,
        totalStock: 20,
        image: 'https://cdn.tgdd.vn/Products/Images/42/325073/Slider/samsung-galaxy-m15-5g-4gb638566551162956020.jpg',
        rating: 4.9,
        description: 'Mid-range phone with 5G support, sharp 6.6-inch screen, stable performance and spacious storage.',
        status: 'On stock',
        createdAt: new Date('2022-03-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'OPPO Find N3 5G 16GB/512GB',
        price: 1099,
        salePrice: 999,
        totalStock: 80,
        image: 'https://cdn.tgdd.vn/Products/Images/42/302953/Slider/vi-vn-oppo-find-n3-slider--(1).jpg',
        rating: 4.6,
        description: "High-end foldable smartphone with powerful performance.",
        status: 'On stock',
        createdAt: new Date('2022-04-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Realme 13+ 5G 8GB/256GB',
        price: 299,
        salePrice: 249,
        totalStock: 40,
        image: 'https://cdn.tgdd.vn/Products/Images/42/330620/Slider/realme-13-plus-5g-8gb-256gb638677081877884882.jpg',
        rating: 4.5,
        description: 'Stylish phone, stable performance with 5G support.',
        status: 'On stock',
        createdAt: new Date('2022-05-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },

    // Laptop
    {
        name: 'Laptop Asus Vivobook Go 15 E1504FA R5 7520U/16GB/512GB/Chuột/Win11 (NJ776W)',
        price: 1399,
        salePrice: 1299,
        totalStock: 25,
        image: 'https://cdn.tgdd.vn/Products/Images/44/311178/Slider/vi-vn-asus-vivobook-go-15-e1504fa-r5-nj776w-slider-1.jpg',
        rating: 4.7,
        description: 'Thin, light laptop, powerful performance, suitable for study and work.',
        status: 'On stock',
        createdAt: new Date('2022-06-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Laptop Apple MacBook Air 13 inch M1 8GB/256GB (MGN63SA/A)',
        price: 1199,
        salePrice: 1099,
        totalStock: 60,
        image: 'https://cdn.tgdd.vn/Products/Images/44/231244/Slider/apple-macbook-air-2020-mgn63saa638168474820399305.jpg',
        rating: 4.8,
        description: 'Ultra-thin laptop with powerful M1 chip, luxurious design and outstanding performance.',
        status: 'On stock',
        createdAt: new Date('2022-07-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Laptop Acer Aspire 3 A315 44P R9W8 R7 5700U/8GB/512GB/Win11 (NX.KSJSV.002)',
        price: 2699,
        salePrice: 2599,
        totalStock: 15,
        image: 'https://cdn.tgdd.vn/Products/Images/44/321436/Slider/vi-vn-acer-aspire-a315-44p-r9w8-r7-nxksjsv002-slider-1.jpg',
        rating: 4.9,
        description: 'Laptop with stable performance, simple design, suitable for study and work.',
        status: 'On stock',
        createdAt: new Date('2022-08-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Laptop Dell Inspiron 15 3520 i5 1235U/16GB/512GB/120Hz/OfficeHS/KYHD/Win11',
        price: 799,
        salePrice: 699,
        totalStock: 70,
        image: 'https://cdn.tgdd.vn/Products/Images/44/321192/Slider/vi-vn-dell-inspiron-15-3520-i5-25p231-slider-1.jpg',
        rating: 4.3,
        description: 'Laptop with smooth 120Hz screen, powerful performance, integrated licensed Office.',
        status: 'On stock',
        createdAt: new Date('2022-09-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Laptop HP Gaming VICTUS 15 fa1139TX i5 12450H/16GB/512GB/4GB RTX2050/144Hz/Win11 (8Y6W3PA)',
        price: 1999,
        salePrice: 1899,
        totalStock: 35,
        image: 'https://cdn.tgdd.vn/Products/Images/44/318163/Slider/vi-vn-hp-victus-15-fa1139tx-i5-8y6w3pa-slider-1.jpg',
        rating: 4.9,
        description: 'Powerful gaming laptop with RTX 2050 graphics card, 144Hz display, outstanding performance.',
        status: 'On stock',
        createdAt: new Date('2022-10-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },

    // Watch
    {
        name: 'BeFit Watch Ultra 52.6mm',
        price: 627.95,
        salePrice: 500,
        totalStock: 40,
        image: 'https://cdn.tgdd.vn/Products/Images/7077/315596/Slider/vi-vn-befit-watch-ultra-day-silicone-fix-1.jpg',
        rating: 4.1,
        description: 'Smartwatch with sporty design, health tracking features and large display.',
        status: 'On stock',
        createdAt: new Date(),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Xiaomi Redmi Watch 3 Active 46mm',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/7077/311333/Slider/vi-vn-redmi-watch-3-active-sld-1.jpg',
        rating: 4.8,
        description: '46mm smartwatch with dynamic design, health tracking and support for many sports features.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Apple Watch Ultra 2 GPS + Cellular 49mm viền Titanium đen dây Alpine',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/7077/329719/Slider/vi-vn-apple-watch-ultra-2-gps-cellular-49mm-vien-titanium-day-alpine-sld-f-1.jpg',
        rating: 4.8,
        description: 'Premium smartwatch with black titanium bezel, Alpine strap, GPS and Cellular support, suitable for outdoor activities and adventure sports.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Apple Watch Series 9 GPS 45mm',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/7077/314708/Slider/apple-watch-s9-45mm-vien-nhom-day-silicone638351569262602904.jpg',
        rating: 4.8,
        description: '45mm smartwatch with sophisticated design, health tracking features and precise GPS connectivity.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Samsung Galaxy Watch FE 40mm',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn.tgdd.vn/Products/Images/7077/327469/Slider/samsung-galaxy-watch-fe-40mm638555347177674476.jpg',
        rating: 4.8,
        description: '40mm smartwatch with compact design, health tracking features and smart connectivity.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },

    // Camera
    {
        name: 'DJI Action 4 Combo',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/o/combo-camera-hanh-dong-dji-action-4_2_.png',
        rating: 4.8,
        description: 'Versatile action camera with 4K video quality, powerful anti-shake and full accessories for outdoor activities.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Camera Insta360 One X3',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-hanh-trinh-insta360-one-x3.png',
        rating: 4.8,
        description: '360-degree action camera with 5.7K video recording, superior anti-shake and compact design.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'GoPro Hero 13 Black',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_3__5_87.png',
        rating: 4.8,
        description: 'Powerful action camera with 5.3K video, HyperSmooth stabilization, and superior waterproofing.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Flycam DJI Mini 2 SE',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/l/flycam-dji-mini-2-se_7_.png',
        rating: 4.8,
        description: 'Compact, easy-to-use flycam, records 4K video, suitable for beginners and travel.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Camera GoPro Hero 12',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-hanh-trinh-gopro-hero-12-phu-kien.png',
        rating: 4.8,
        description: 'Action camera with 5.3K video recording, HyperSmooth stabilization, and advanced waterproofing, ideal for extreme sports activities.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },

    // Television
    {
        name: 'Smart Tivi Samsung UHD 4K 65 inch UA65AU7700',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_8_14_638276187497562577_smart-tivi-samsung-uhd-4k-au7700-3.jpg',
        rating: 4.8,
        description: '65-inch TV with sharp 4K resolution, slim design and smart features, providing a great viewing experience.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Xiaomi Google Tivi A Pro 55 Inch 4K',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_8_9_638271937140598065_tivi-xiaomi-a-pro-55-inch-4.jpg',
        rating: 4.8,
        description: '55-inch TV with 4K resolution, integrated Google TV, brings smart entertainment experience and sharp images.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Casper Google Tivi HD 32 inch 32HG5200',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2024_4_8_638481808529924616_casper-32hg5200-5.jpg',
        rating: 4.8,
        description: '32-inch TV with HD resolution, integrated Google TV, brings a simple and easy-to-use entertainment experience.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Xiaomi Google Tivi 4K A 55 inch 2025 (L55MA-ASEA)',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/00910009_tivi_xiaomi_a_55_2025_l55ma_asea_0b7682dc52.png',
        rating: 4.8,
        description: '55-inch TV with 4K resolution, integrated Google TV, modern design and many smart features, providing a great entertainment experience.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
    {
        name: 'Casper Google Tivi QLED 4K 55 inch 55QG8000',
        price: 1999,
        salePrice: 1799,
        totalStock: 50,
        image: 'https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2024_1_16_638410017664877956_casper-google-tivi-qled-4k-55-inch-55qg8000-1.jpg',
        rating: 4.8,
        description: '55-inch TV with QLED technology, 4K resolution, integrated Google TV, brings vivid images and smart entertainment experience.',
        status: 'On stock',
        createdAt: new Date('2022-01-01T00:00:00Z'),
        category_id: "None",
        brand_id: "None",
        isDeleted: false,
    },
];


// Dữ liệu mock cho ProductDetail
const mockProductDetails = [
    {
        product_id: null,
        type: "Phone",
        weight: "194g",
        internalMemory: "128GB",
        chip: "Apple A13 Bionic",
        screenSize: "6.1 inches",
        batteryCapacity: "3110mAh",
        operatingSystem: "IOS 17"
    },
    {
        product_id: null,
        type: "Phone",
        weight: "227g",
        internalMemory: "256GB",
        chip: "Apple A18 Pro 6 nhân",
        screenSize: "6.9 inches",
        batteryCapacity: "4676mAh",
        operatingSystem: "IOS 18"
    },
    {
        product_id: null,
        type: "Phone",
        weight: "217g",
        internalMemory: "128GB",
        chip: "MediaTek Dimensity 6100+",
        screenSize: "6.5 inches",
        batteryCapacity: "6000mAh",
        operatingSystem: "Android 14"
    },
    {
        product_id: null,
        type: "Phone",
        weight: "245g",
        internalMemory: "512GB",
        chip: "Sanpdragon 8 Gen 2 8 nhân",
        screenSize: "7.82 inches (main), 6.31 inches (extra)",
        batteryCapacity: "4805mAh",
        operatingSystem: "Android 13"
    },
    {
        product_id: null,
        type: "Phone",
        weight: "285g",
        internalMemory: "256GB",
        chip: "MediaTek Dimensity 7300 Energy 5G 8 nhân",
        screenSize: "6.67 inches",
        batteryCapacity: "5000mAh",
        operatingSystem: "Android 14"
    },
    {
        product_id: null,
        type: "Laptop",
        weight: "1.63kg",
        CPU: "AMD Ryzen 5 - 7520U",
        RAM: "16GB",
        storage: "512GB SSD",
        screenSize: "15.6 inches",
        operatingSystem: "Windows 11"
    },
    {
        product_id: null,
        type: "Laptop",
        weight: "1.29kg",
        CPU: "Apple M1",
        RAM: "8GB",
        storage: "256GB SSD",
        screenSize: "13.3 inches",
        operatingSystem: "macOS"
    },
    {
        product_id: null,
        type: "Laptop",
        weight: "1.7kg",
        CPU: "AMD Ryzen 7 - 5700U",
        RAM: "8GB",
        storage: "512GB SSD",
        screenSize: "15.6 inches",
        operatingSystem: "Windows 11"
    },
    {
        product_id: null,
        type: "Laptop",
        weight: "1.24kg",
        CPU: "Apple M2",
        RAM: "8GB",
        storage: "256GB SSD",
        screenSize: "13.6 inches",
        operatingSystem: "macOS"
    },
    {
        product_id: null,
        type: "Laptop",
        weight: "2.29kg",
        CPU: "Intel Core i5 Alder Lake - 12450H",
        RAM: "16GB",
        storage: "512GB SSD",
        screenSize: "15.6 inches",
        operatingSystem: "Windows 11"
    },
    {
        product_id: null,
        type: "Watch",
        weight: "44.52g",
        batteryCapacity: "230mAh",
        screenSize: "1.95 inches",
        operatingSystem: "Không công bố"
    },
    {
        product_id: null,
        type: "Watch",
        weight: "41.67g",
        batteryCapacity: "289mAh",
        screenSize: "1.83 inches",
        operatingSystem: "Không công bố"
    },
    {
        product_id: null,
        type: "Watch",
        weight: "61.8g",
        batteryCapacity: "36-72 giờ",
        screenSize: "1.92 inches",
        operatingSystem: "WatchOS"
    },
    {
        product_id: null,
        type: "Watch",
        weight: "38.7g",
        batteryCapacity: "18-36 giờ",
        screenSize: "1.9 inches",
        operatingSystem: "WatchOS"
    },
    {
        product_id: null,
        type: "Watch",
        weight: "26.6g",
        batteryCapacity: "247mAh",
        screenSize: "1.2 inches",
        operatingSystem: "WearOS"
    },
    {
        product_id: null,
        type: "Camera",
        weight: "190g",
        batteryCapacity: "1770mAh",
        cameraType: "Action Camera",
        cameraSensor: "CMOS",
        imageStabilization: "Electronic",
        screenSize: "Front Display: 1.4 inches, Rear Display: 2.25 inches",
        screenType: "Touchscreen"
    },
    {
        product_id: null,
        type: "Camera",
        weight: "180g",
        batteryCapacity: "1800mAh",
        cameraType: "360° Action Camera",
        cameraSensor: "Dual 48MP sensors (1/2 inch)",
        imageStabilization: "FlowState",
        screenSize: "2.29 inches",
        screenType: "LCD Touchscreen"
    },
    {
        product_id: null,
        type: "Camera",
        weight: "190g",
        batteryCapacity: "1900mAh",
        cameraType: "Action Camera",
        cameraSensor: "CMOS",
        imageStabilization: "Electronic",
        screenSize: "Front Display: 1.4 inches, Rear Display: 2.27 inches",
        screenType: "Touchscreen"
    },
    {
        product_id: null,
        type: "Camera",
        weight: "246g",
        batteryCapacity: "2250mAh",
        cameraType: "Flycam",
        cameraSensor: "CMOS 1/2.3",
        imageStabilization: "3-pillar mechanics",
        screenSize: "Depends on the connected screen",
        screenType: "Smartphone Screen remote control"
    },
    {
        product_id: null,
        type: "Camera",
        weight: "154g",
        batteryCapacity: "1300mAh",
        cameraType: "Action Camera",
        cameraSensor: "CMOS",
        imageStabilization: "Electronic",
        screenSize: "1.8 inches",
        screenType: "Touchscreen"
    },
    {
        // https://fptshop.com.vn/tivi/smart-tivi-samsung-uhd-4k-65-inch-ua65au7700
        product_id: null,
        type: "Television",
        weight: "20.9kg",
        screenSize: "65 inches",
        screenType: "UHD",
        refreshRate: "60Hz",
        imageTechnology: "HDR10+",
        soundTechnology: "Adaptive Sound, Q-Symphony kết hợp loa tivi với loa thanh, Cải thiện âm thanh Dialog Enhancement",
        operatingSystem: "OS Tizen",
    },
    {
        // https://fptshop.com.vn/tivi/tivi-xiaomi-a-pro-55-inch
        product_id: null,
        type: "Television",
        weight: "11.23kg",
        screenSize: "55 inches",
        screenType: "UHD",
        refreshRate: "60Hz",
        imageTechnology: "Dolby Vision, HDR10",
        soundTechnology: "Dolby Audio, DTS Virtual:X, DTS-X",
        operatingSystem: "Android",
    },
    {
        // https://fptshop.com.vn/tivi/casper-goolgle-tivi-hd-32-inch-32hg5200
        product_id: null,
        type: "Television",
        weight: "3.8kg",
        screenSize: "32 inches",
        screenType: "HD",
        refreshRate: "Không công bố",
        imageTechnology: "Super Brightness, HDR",
        soundTechnology: "Nature Sound, Dolby Audio",
        operatingSystem: "Google TV",
    },
    {
        // https://fptshop.com.vn/tivi/xiaomi-google-tivi-4k-55-inch-a-55-2025-l55ma-asea
        product_id: null,
        type: "Television",
        weight: "14kg",
        screenSize: "55 inches",
        screenType: "LED",
        refreshRate: "60Hz",
        imageTechnology: "Tăng cường chuyển động MEMC 120Hz, HLG, HDR10, 4K HDR",
        soundTechnology: "Dolby Audio, DTS-X, DTS Virtual:X",
        operatingSystem: "Google TV",
    },
    {
        // https://fptshop.com.vn/tivi/casper-google-tivi-qled-4k-55-inch-55qg8000
        product_id: null,
        type: "Television",
        weight: "13.4kg",
        screenSize: "65 inches",
        screenType: "QLED",
        refreshRate: "60Hz",
        imageTechnology: "Dolby Vision, HDR10, Tăng cường chuyển động MEMC 120Hz, Màn hình siêu sáng Super Brightness",
        soundTechnology: "Dolby Digital Plus, Dolby Atmos, Pure Sound",
        operatingSystem: "Google TV",
    },
];


// Dữ liệu mock cho ProductProperty
const mockProductProperties = [
    // Sản phẩm 1
    { category_id: null, name: "InternalMemory", description: "128GB", createdAt: new Date() },
    { category_id: null, name: "Chip", description: "Apple A13 Bionic", createdAt: new Date() },
    { category_id: null, name: "ScreenSize", description: "6.1 inches", createdAt: new Date() },
    { category_id: null, name: "BatteryCapacity", description: "3110mAh", createdAt: new Date() },
    { category_id: null, name: "OperatingSystem", description: "IOS 17", createdAt: new Date() },

    // Sản phẩm 6
    { category_id: null, name: "CPU", description: "AMD Ryzen 5 - 7520U", createdAt: new Date("2024-12-01T09:00:00.000Z") },
    { category_id: null, name: "RAM", description: "16GB", createdAt: new Date("2024-12-01T09:00:00.000Z") },
    { category_id: null, name: "Storage", description: "512GB SSD", createdAt: new Date("2024-12-01T09:00:00.000Z") },
    { category_id: null, name: "ScreenSize", description: "15.6 inches", createdAt: new Date("2024-12-01T09:00:00.000Z") },
    { category_id: null, name: "OperatingSystem", description: "Windows 11", createdAt: new Date("2024-12-01T09:00:00.000Z") },

    // Sản phẩm 11
    { category_id: null, name: "ScreenSize", description: "15.6 inches", createdAt: new Date("2024-12-01T13:00:00.000Z") },
    { category_id: null, name: "OperatingSystem", description: "Windows 11", createdAt: new Date("2024-12-01T13:00:00.000Z") },
    { category_id: null, name: "BatteryCapacity", description: "289mAh", createdAt: new Date("2024-12-02T08:05:00.000Z") },
    
    // Sản phẩm 16
    { category_id: null, name: "ScreenSize", description: "1.2 inches", createdAt: new Date("2024-12-02T08:20:00.000Z") },
    { category_id: null, name: "OperatingSystem", description: "WearOS", createdAt: new Date("2024-12-02T08:20:00.000Z") },
    { category_id: null, name: "BatteryCapacity", description: "1800mAh", createdAt: new Date("2024-12-02T08:35:00.000Z") },
    { category_id: null, name: "CameraType", description: "360° Action Camera", createdAt: new Date("2024-12-02T08:35:00.000Z") },
    { category_id: null, name: "CameraSensor", description: "Dual 48MP sensors (1/2 inch)", createdAt: new Date("2024-12-02T08:35:00.000Z") },
    { category_id: null, name: "ImageStabilization", description: "FlowState", createdAt: new Date("2024-12-02T08:35:00.000Z") },

    // Sản phẩm 22
    {
        category_id: null,
        name: "SoundTechnology",
        desciption: "Adaptive Sound, Q-Symphony kết hợp loa tivi với loa thanh, Cải thiện âm thanh Dialog Enhancement",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        category_id: null,
        name: "OperatingSystem",
        desciption: "OS Tizen",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        category_id: null,
        name: "ScreenSize",
        desciption: "65 inches",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        category_id: null,
        name: "ScreenType",
        desciption: "UHD",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        category_id: null,
        name: "RefreshRate",
        desciption: "60Hz",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        category_id: null,
        name: "ImageTechnology",
        desciption: "HDR10+",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
];


// Dữ liệu cho Product Property Values
const mockProductPropertyValues = [
    // Sản phẩm 1
    {
        product_id: null,
        property_id: "InternalMemory",
        value: "128GB",
        createAt: new Date(),
    },
    {
        product_id: null,
        property_id: "Chip",
        value: "Apple A13 Bionic",
        createAt: new Date(),
    },
    {
        product_id: null,
        property_id: "ScreenSize",
        value: "6.1 inches",
        createAt: new Date(),
    },
    {
        product_id: null,
        property_id: "BatteryCapacity",
        value: "3110mAh",
        createAt: new Date(),
    },
    {
        product_id: null,
        property_id: "OperatingSystem",
        value: "IOS 17",
        createAt: new Date(),
    },

    // Sản phẩm 2
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "InternalMemory",
        value: "256GB",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "Chip",
        value: "Apple A18 Pro 6 nhân",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "ScreenSize",
        value: "6.9 inches",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "BatteryCapacity",
        value: "4676mAh",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "OperatingSystem",
        value: "IOS 18",
        createAt: new Date(),
    },

    // Sản phẩm 3
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "InternalMemory",
        value: "128GB",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "Chip",
        value: "MediaTek Dimensity 6100+",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "ScreenSize",
        value: "6.5 inches",
       createAt: new Date(),    
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "BatteryCapacity",
        value: "6000mAh",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "OperatingSystem",
        value: "Android 14",
        createAt: new Date(),
    },

    // Sản phẩm 4
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "InternalMemory",
        value: "512GB",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "Chip",
        value: "Sanpdragon 8 Gen 2 8 nhân",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "ScreenSize",
        value: "7.82 inches (main), 6.31 inches (extra)",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "BatteryCapacity",
        value: "4805mAh",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "OperatingSystem",
        value: "Android 13",
        createAt: new Date(),
    },

    // Sản phẩm 5
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "InternalMemory",
        value: "256GB",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "Chip",
        value: "MediaTek Dimensity 7300 Energy 5G 8 nhân",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "ScreenSize",
        value: "6.67 inches",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "BatteryCapacity",
        value: "5000mAh",
        createAt: new Date(),
    },
    {
        product_id: "64a0c88a57f1c78d1b634a10",
        property_id: "OperatingSystem",
        value: "Android 14",
        createAt: new Date(),
    },

    // Sản phẩm 6
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "CPU",
        value: "AMD Ryzen 5 - 7520U",
        createdAt: new Date("2024-12-01T09:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "RAM",
        value: "16GB",
        createdAt: new Date("2024-12-01T09:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "storage",
        value: "512GB SSD",
        createdAt: new Date("2024-12-01T09:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "15.6 inches",
        createdAt: new Date("2024-12-01T09:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "Windows 11",
        createdAt: new Date("2024-12-01T09:00:00.000Z")
    },
    // Sản phẩm7
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "CPU",
        value: "Apple M1",
        createdAt: new Date("2024-12-01T10:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "RAM",
        value: "8GB",
        createdAt: new Date("2024-12-01T10:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "storage",
        value: "256GB SSD",
        createdAt: new Date("2024-12-01T10:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "13.3 inches",
        createdAt: new Date("2024-12-01T10:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "macOS",
        createdAt: new Date("2024-12-01T10:00:00.000Z")
    },
    // Sản phẩm 8
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "CPU",
        value: "AMD Ryzen 7 - 5700U",
        createdAt: new Date("2024-12-01T11:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "RAM",
        value: "8GB",
        createdAt: new Date("2024-12-01T11:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "storage",
        value: "512GB SSD",
        createdAt: new Date("2024-12-01T11:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "15.6 inches",
        createdAt: new Date("2024-12-01T11:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "Windows 11",
        createdAt: new Date("2024-12-01T11:00:00.000Z")
    },
    // Sản phẩm 9
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "CPU",
        value: "Apple M2",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "RAM",
        value: "8GB",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "storage",
        value: "256GB SSD",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "13.6 inches",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "macOS",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    // Sản phẩm 10
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "CPU",
        value: "Intel Core i5 Alder Lake - 12450H",
        createdAt: new Date("2024-12-01T13:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "RAM",
        value: "16GB",
        createdAt: new Date("2024-12-01T13:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "storage",
        value: "512GB SSD",
        createdAt: new Date("2024-12-01T13:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "13.6 inches",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "macOS",
        createdAt: new Date("2024-12-01T12:00:00.000Z")
    },
    // Sản phẩm 11
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "screenSize",
        value: "15.6 inches",
        createdAt: new Date("2024-12-01T13:00:00.000Z")
    },
    {
        product_id: "67135ef9a844ab7ea1b00755",
        property_id: "operatingSystem",
        value: "Windows 11",
        createdAt: new Date("2024-12-01T13:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "batteryCapacity",
        value: "230mAh",
        createdAt: new Date("2024-12-02T08:00:00.000Z")
    },
    // Sản phẩm 12
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "screenSize",
        value: "1.95 inches",
        createdAt: new Date("2024-12-02T08:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "operatingSystem",
        value: "Không công bố",
        createdAt: new Date("2024-12-02T08:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "batteryCapacity",
        value: "289mAh",
        createdAt: new Date("2024-12-02T08:05:00.000Z")
    },
    // Sản phẩm 13
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "screenSize",
        value: "1.83 inches",
        createdAt: new Date("2024-12-02T08:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "operatingSystem",
        value: "Không công bố",
        createdAt: new Date("2024-12-02T08:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "batteryCapacity",
        value: "36-72 giờ",
        createdAt: new Date("2024-12-02T08:10:00.000Z")
    },
    // Sản phẩm 14
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "screenSize",
        value: "1.92 inches",
        createdAt: new Date("2024-12-02T08:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "operatingSystem",
        value: "WatchOS",
        createdAt: new Date("2024-12-02T08:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "batteryCapacity",
        value: "18-36 giờ",
        createdAt: new Date("2024-12-02T08:15:00.000Z")
    },
    // Sản phẩm 15
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "screenSize",
        value: "1.9 inches",
        createdAt: new Date("2024-12-02T08:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "operatingSystem",
        value: "WatchOS",
        createdAt: new Date("2024-12-02T08:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "batteryCapacity",
        value: "247mAh",
        createdAt: new Date("2024-12-02T08:20:00.000Z")
    },

    // Sản phẩm 16
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "screenSize",
        value: "1.2 inches",
        createdAt: new Date("2024-12-02T08:20:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a12",
        property_id: "operatingSystem",
        value: "WearOS",
        createdAt: new Date("2024-12-02T08:20:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "batteryCapacity",
        value: "1770mAh",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraType",
        value: "Action Camera",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraSensor",
        value: "CMOS",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "imageStabilization",
        value: "Electronic",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    // Sản phẩm 17
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenSize",
        value: "Front Display: 1.4 inches, Rear Display: 2.25 inches",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenType",
        value: "Touchscreen",
        createdAt: new Date("2024-12-02T08:30:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "batteryCapacity",
        value: "1800mAh",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraType",
        value: "360° Action Camera",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraSensor",
        value: "Dual 48MP sensors (1/2 inch)",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "imageStabilization",
        value: "FlowState",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    // Sản phẩm 18
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenSize",
        value: "2.29 inches",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenType",
        value: "LCD Touchscreen",
        createdAt: new Date("2024-12-02T08:35:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "batteryCapacity",
        value: "1900mAh",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraType",
        value: "Action Camera",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraSensor",
        value: "CMOS",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "imageStabilization",
        value: "Electronic",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    // Sản phẩm 19
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenSize",
        value: "Front Display: 1.4 inches, Rear Display: 2.27 inches",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenType",
        value: "Touchscreen",
        createdAt: new Date("2024-12-02T08:40:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "batteryCapacity",
        value: "2250mAh",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraType",
        value: "Flycam",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraSensor",
        value: "CMOS 1/2.3",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "imageStabilization",
        value: "3-pillar mechanics",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    // Sản phẩm 20
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenSize",
        value: "Depends on the connected screen",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenType",
        value: "Smartphone Screen remote control",
        createdAt: new Date("2024-12-02T08:45:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "batteryCapacity",
        value: "1300mAh",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraType",
        value: "Action Camera",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "cameraSensor",
        value: "CMOS",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "imageStabilization",
        value: "Electronic",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    // Sản phẩm 21
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenSize",
        value: "1.8 inches",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    {
        product_id: "67135f33a844ab7ea1b0075b",
        property_id: "screenType",
        value: "Touchscreen",
        createdAt: new Date("2024-12-02T08:50:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenSize",
        value: "65 inches",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenType",
        value: "UHD",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "refreshRate",
        value: "60Hz",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "imageTechnology",
        value: "HDR10+",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    // Sản phẩm 22
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "soundTechnology",
        value: "Adaptive Sound, Q-Symphony kết hợp loa tivi với loa thanh, Cải thiện âm thanh Dialog Enhancement",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "operatingSystem",
        value: "OS Tizen",
        createdAt: new Date("2024-12-02T09:00:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenSize",
        value: "55 inches",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenType",
        value: "UHD",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "refreshRate",
        value: "60Hz",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "imageTechnology",
        value: "Dolby Vision, HDR10",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    // Sản phẩm 23
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "soundTechnology",
        value: "Dolby Audio, DTS Virtual:X, DTS-X",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "operatingSystem",
        value: "Android",
        createdAt: new Date("2024-12-02T09:05:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenSize",
        value: "32 inches",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenType",
        value: "HD",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "refreshRate",
        value: "Không công bố",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "imageTechnology",
        value: "Super Brightness, HDR",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    // Sản phẩm 24
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "soundTechnology",
        value: "Nature Sound, Dolby Audio",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "operatingSystem",
        value: "Google TV",
        createdAt: new Date("2024-12-02T09:10:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenSize",
        value: "55 inches",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenType",
        value: "LED",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "refreshRate",
        value: "60Hz",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "imageTechnology",
        value: "Tăng cường chuyển động MEMC 120Hz, HLG, HDR10, 4K HDR",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    // Sản phẩm 25
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "soundTechnology",
        value: "Dolby Audio, DTS-X, DTS Virtual:X",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "operatingSystem",
        value: "Google TV",
        createdAt: new Date("2024-12-02T09:15:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenSize",
        value: "65 inches",
        createdAt: new Date("2024-12-02T09:20:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "screenType",
        value: "QLED",
        createdAt: new Date("2024-12-02T09:20:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "refreshRate",
        value: "60Hz",
        createdAt: new Date("2024-12-02T09:20:00.000Z")
    },
    {
        product_id: "64a0c88a57f1c78d1b634a11",
        property_id: "imageTechnology",
        value: "Dolby Vision, HDR10, Tăng cường chuyển động MEMC 120Hz, Màn hình siêu sáng Super Brightness",
        createdAt: new Date("2024-12-02T09:20:00.000Z")
    },
];


// Mock User
const mockUsers=[
    // Customer
    {
        fullName: "vinh nguyen",
        userName: "vinh nguyenGoogle",
        email: "vinh01515@gmail.com",
        password: "$2a$10$B3brr0sjJnx4PYIbZo1ASu0U23nHkNkweRlO8LLRFWFJGjMMZHyFi",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocLM8bNJw0NiUYgSnFdZ-jIUnxDKfQ…",
        role: "user",
        status: "active",
        createdAt: "2024-11-22T06:41:57.622+00:00",
    },
    {
        fullName: "Nguyen quoc vinh",
        userName: "vinh",
        email: "vinh@gmail.com",
        password: "$2a$10$Z1NR6Vc31tUkDMTjN94ZN.2rIUNyaOeQka234Z9yjCzheiNTXsdfa",
        avatar: "",
        role: "user",
        status: "active",
        createdAt: "2024-11-24T14:22:21.243+00:00",
    },
    {
        fullName: "abc",
        userName: "abc",
        email: "abc@gmail.com",
        password: "$2a$10$junYf4JC1h3ZfD6ntRSehez6tI.2AJGFdhCODw3l7fj48dFDoRgKy",
        avatar: "",
        role: "user",
        status: "active",
        createdAt: "2024-11-24T17:29:19.582+00:00",
    },
    {
        fullName: "Nguyen quoc vinh",
        userName: "vinh123",
        email: "vinh123@gmail.com",
        password: "$2a$10$uXLNcbwIZp/zuZ1VrK36W.2TeS6iG/eN18ZPGVtAR60d80s/mJAgS",
        avatar: "",
        role: "user",
        status: "active",
        createdAt: "2024-11-29T01:03:40.420+00:00",
    },
    {
        fullName: "Trần Minh Sơn",
        userName: "Trần Minh SơnGoogle",
        email: "sonhotboy82@gmail.com",
        password: "$2a$10$EEJvQPOx4qCwN1yatGiTLuTZTMuNSRbby0qGtMjymXCkG5phbNeWy",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocL3JsRS8yKzjLtPRfd_ErpXKFZOax…",
        role: "user",
        status: "active",
        createdAt: "2024-11-29T01:24:07.848+00:00",
    },
    {
        fullName: "son",
        userName: "son",
        email: "sontranminh82@gmail.com",
        password: "$2a$10$rYlMSJtHCQAaqvsRvWq52OzfYRfphoYVwLANz0LsvVr6VFZTJl6a2",
        avatar: "",
        role: "user",
        status: "active",
        createdAt: "2024-11-29T01:24:48.677+00:00",
    },
    {
        fullName: "duc toan",
        userName: "dt1",
        email: "a@gmail.com",
        password: "$2a$10$afdTmSfFyvm.DGcFLor8uOpnQ.cQXq971xvVnohLAoeu5hmehjq6u",
        avatar: "",
        role: "user",
        status: "active",
        createdAt: "2024-11-30T06:39:41.012+00:00",
    },
    {
        fullName: "Duc Toan Nguyen",
        userName: "Duc Toan NguyenGoogle",
        email: "ductoan137303@gmail.com",
        password: "$2a$10$BzYFuMl0Cjucn/e80U2uReoCGL1yTfI9bAJy0tZTehTBnXrNTn/yW",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocJuMbPymBYpD88AuzQ20OWZ4k4CpM…",
        role: "user",
        status: "active",
        createdAt: "2024-11-30T06:40:23.805+00:00",
    },
    {
        fullName: "Alice Johnson",
        userName: "AliceJ123",
        email: "alice.johnson@gmail.com",
        password: "$2b$10$wa5dNYwTH.2rR1Wi3CvpO.CUep.srTKWzLjQj/KIhmnrThgQ/7RX.", // bcrypt hashed password
        avatar: "https://example.com/avatar/alice.jpg",
        role: "user",
        status: "active",
        createdAt: "2024-11-28T08:30:00.000+00:00",
    },
    {
        fullName: "Bob Smith",
        userName: "BobTheCoder",
        email: "bob.smith@gmail.com",
        password: "$2b$10$Mjj/8a41S6IvZfRYuBnvPeshLH6GX781Qzacu8eDWenOPhPwXeKMq", // bcrypt hashed password
        avatar: "https://example.com/avatar/bob.jpg",
        role: "user",
        status: "active",
        createdAt: "2024-12-01T10:15:00.000+00:00",
    },
    {
        fullName: "Charlie Nguyen",
        userName: "CharlieN22",
        email: "charlie.nguyen@gmail.com",
        password: "$2b$10$K2Dit9SbBJSjBuFC8i7D9eaTGA3RbFvQSs1UZvkz05.JCsDMI4Bfa", // bcrypt hashed password
        avatar: "https://example.com/avatar/charlie.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-11-29T12:45:00.000+00:00",
    },
    {
        fullName: "Diana Carter",
        userName: "DianaC_99",
        email: "diana.carter@gmail.com",
        password: "$2b$10$sOMK/PXw4wQI3sNriHyvK.aaFmBzelwxCAzcIfyPzb/Bd9wkFQojG", // bcrypt hashed password
        avatar: "https://example.com/avatar/diana.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-02T05:00:00.000+00:00",
    },
    {
        fullName: "Evan Lee",
        userName: "EvanLPro",
        email: "evan.lee@gmail.com",
        password: "$2b$10$BA7Rn84wISdsUxy.Jb5hhuyn9aTXKAeZNeSoguGui47Sa5Udrs0w.", // bcrypt hashed password
        avatar: "https://example.com/avatar/evan.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-03T16:30:00.000+00:00",
    },
    {
        fullName: "Nguyen Van A",
        userName: "nguyenvana",
        email: "nguyenvana@gmail.com",
        password: "$2b$10$rEfBJWhl0H1z./3/rl268ekqxR0sfcusuQA4YmVWRO8jveLa0ZPxu", 
        avatar: "https://example.com/avatar1.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:00:00.000Z",
    },
    {
        fullName: "Tran Thi B",
        userName: "tranthib",
        email: "tranthib@gmail.com",
        password: "$2b$10$2c2DMHjpUSeXghJNTvGCNuqbz22OLSX/54v7NdwLXzrOq1QwVUjhO", 
        avatar: "https://example.com/avatar2.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:01:00.000Z",
    },
    {
        fullName: "Le Van C",
        userName: "levanc",
        email: "levanc@gmail.com",
        password: "$2b$10$A64C0yoHRqE38GN1Gw289uPJUKSHPbISk79Yq37ObtZto.AFYZOvq", 
        avatar: "https://example.com/avatar3.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:02:00.000Z",
    },
    {
        fullName: "Pham Thi D",
        userName: "phamthid",
        email: "phamthid@gmail.com",
        password: "$2b$10$s9itgfkGDsXQnsy25SlpV.PiT9sDLcEs2aFmrkLBOFld3lnFdwQ5y", 
        avatar: "https://example.com/avatar4.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:03:00.000Z",
    },
    {
        fullName: "Hoang Van E",
        userName: "hoangvane",
        email: "hoangvane@gmail.com",
        password: "$2b$10$JXQVETbfW.F0a67e8FoPUe66kZfuV/sAK0Yf4ySx9L8yrWtZITzfm", 
        avatar: "https://example.com/avatar5.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:04:00.000Z",
    },
    {
        fullName: "Do Thi F",
        userName: "dothif",
        email: "dothif@gmail.com",
        password: "$2b$10$I8LGHw4G5eGW8/QTxhyHvutFbU8/dgK21/x30ohGiMViStjbOvmjG", 
        avatar: "https://example.com/avatar6.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:05:00.000Z",
    },
    {
        fullName: "Vo Van G",
        userName: "vovang",
        email: "vovang@gmail.com",
        password: "$2b$10$.rgnBqXqAjrvurvXpBIlXuRTrocZL3TODzbjkO2Z7I1MkcyiTtGNC", 
        avatar: "https://example.com/avatar7.jpg",
        role: "user",
        status: "ban",
        createdAt: "2024-12-08T07:06:00.000Z",
    }
]
  


// Mock Review
const mockReviews=[
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: "Good quality, satisfied with the purchase.",
        createdAt: new Date("2024-11-13T12:34:56.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: "Excellent product, exceeded my expectations!",
        createdAt: new Date("2024-11-13T12:35:56.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 3,
        comment: "Decent, but there's room for improvement.",
        createdAt: new Date("2024-11-13T12:36:56.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: "Pretty good value for the price.",
        createdAt: new Date("2024-11-13T12:37:56.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: 'Excellent product, will buy again!',
        createdAt: new Date('2024-01-01T10:00:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 3,
        comment: 'Average quality, not worth the price.',
        createdAt: new Date('2024-01-02T11:30:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: 'Good, but could be better.',
        createdAt: new Date('2024-01-03T12:45:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: 'Absolutely love it!',
        createdAt: new Date('2024-01-04T09:00:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 2,
        comment: 'Not satisfied, expected better.',
        createdAt: new Date('2024-01-05T08:00:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 1,
        comment: 'Terrible quality, do not recommend.',
        createdAt: new Date('2024-01-06T07:15:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: 'Very good, fast delivery.',
        createdAt: new Date('2024-01-07T15:45:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 3,
        comment: 'Okay, but not worth the price.',
        createdAt: new Date('2024-01-08T18:00:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: 'Amazing! Highly recommend!',
        createdAt: new Date('2024-01-09T10:30:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: 'Good value for money.',
        createdAt: new Date('2024-01-10T16:00:00'),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: "Excellent product! Exceeded my expectations.",
        createdAt: new Date("2024-11-15T08:45:12.123Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 3,
        comment: "Average quality, but reasonable for the price.",
        createdAt: new Date("2024-11-16T14:22:35.456Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 2,
        comment: "Not very durable, disappointed with the material.",
        createdAt: new Date("2024-11-17T10:10:10.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: "Good value for money, works as advertised.",
        createdAt: new Date("2024-11-18T09:30:00.123Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 1,
        comment: "Poor quality, not worth the price. Would not recommend.",
        createdAt: new Date("2024-11-19T11:15:45.678Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: "Fantastic! Would definitely buy again.",
        createdAt: new Date("2024-11-20T17:50:22.987Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 3,
        comment: "It is okay, but there are better options out there.",
        createdAt: new Date("2024-11-21T12:00:00.000Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 4,
        comment: "Satisfied overall, but delivery was delayed.",
        createdAt: new Date("2024-11-22T18:25:30.456Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 2,
        comment: "The product does not match the description provided.",
        createdAt: new Date("2024-11-23T07:40:20.789Z"),
    },
    {
        productId: "None",
        userId: "None",
        rating: 5,
        comment: "High-quality product, would recommend to others!",
        createdAt: new Date("2024-11-24T20:55:15.321Z"),
    },
    {
        productId: "product001",
        userId: "user001",
        rating: 5,
        comment: "Excellent smartphone with great battery life and camera!",
        createdAt: "2024-11-20T15:35:10.000Z"
    },
    {
        productId: "product002",
        userId: "user002",
        rating: 4,
        comment: "Very good laptop, but the keyboard feels a bit stiff.",
        createdAt: "2024-11-22T12:20:30.000Z"
    },
    {
        productId: "product003",
        userId: "user003",
        rating: 3,
        comment: "The tablet is fine, but the display is not as sharp as expected.",
        createdAt: "2024-11-23T18:45:50.000Z"
    },
    {
        productId: "product004",
        userId: "user004",
        rating: 5,
        comment: "Amazing headphones with crystal-clear sound and excellent noise cancellation.",
        createdAt: "2024-11-25T08:15:25.000Z"
    },
    {
        productId: "product005",
        userId: "user005",
        rating: 2,
        comment: "The smartwatch stopped working after a week. Not satisfied.",
        createdAt: "2024-11-26T14:05:40.000Z"
    },
    {
        productId: "product006",
        userId: "user006",
        rating: 4,
        comment: "Good gaming mouse, but the software needs improvement.",
        createdAt: "2024-11-27T11:10:15.000Z"
    },
    {
        productId: "product007",
        userId: "user007",
        rating: 5,
        comment: "Highly recommend this gaming console! Runs smoothly with no issues.",
        createdAt: "2024-11-28T17:50:05.000Z"
    },
    {
        productId: "product008",
        userId: "user008",
        rating: 3,
        comment: "The external hard drive is fast but overheats after prolonged use.",
        createdAt: "2024-11-29T13:30:45.000Z"
    },
    {
        productId: "product009",
        userId: "user009",
        rating: 4,
        comment: "Solid monitor with great color accuracy, but slightly expensive.",
        createdAt: "2024-11-30T09:40:20.000Z"
    },
    {
        productId: "product010",
        userId: "user010",
        rating: 1,
        comment: "Terrible experience with this router. Frequent disconnections.",
        createdAt: "2024-12-01T10:20:30.000Z"
    },
    {
        productId: "product011",
        userId: "user011",
        rating: 5,
        comment: "Fantastic performance! This graphics card is worth every penny.",
        createdAt: "2024-12-02T14:25:10.000Z"
    },
    {
        productId: "product012",
        userId: "user012",
        rating: 4,
        comment: "Decent quality earbuds, but the bass could be stronger.",
        createdAt: "2024-12-03T09:50:20.000Z"
    },
    {
        productId: "product013",
        userId: "user013",
        rating: 3,
        comment: "The printer works fine, but the ink cartridges are too expensive.",
        createdAt: "2024-12-03T18:10:05.000Z"
    },
    {
        productId: "product014",
        userId: "user014",
        rating: 2,
        comment: "The keyboard feels cheap, and some keys stopped working after a month.",
        createdAt: "2024-12-04T11:35:15.000Z"
    },
    {
        productId: "product015",
        userId: "user015",
        rating: 4,
        comment: "Great smartwatch for fitness tracking, but battery life is average.",
        createdAt: "2024-12-05T08:45:25.000Z"
    },
    {
        productId: "product016",
        userId: "user016",
        rating: 5,
        comment: "This external SSD is blazing fast and compact. A must-have for professionals!",
        createdAt: "2024-12-06T15:30:40.000Z"
    }
];


// Mock Cart
const mockCarts=[
    // Cart 1
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 2
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 4
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 2
            }
        ]
    },
    // Cart 2
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 2
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 2
            }
        ]
    },
    // Cart 3
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 10
            },
        ]
    },
    // Cart 4
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            }
        ]
    },
    // Cart 5
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            }
        ]
    },
    // Cart 6
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            }
        ]
    },
    // Cart 7
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 2
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 4
            }
        ]
    },
    // Cart 8
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 2
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            },
            {
                productId: "648a1fc01234567890123457",
                quantity: 1
            }
        ]
    },
    // Cart 9
    {
        userId: "647f8fc01234567890123456",
        items: [
            {
                productId: "648a1fc01234567890123456",
                quantity: 1
            },
        ]
    },
];

const mockOrders = [
    // Order 1
    {
        userId: "None",
        items: [
            {
                name: "Laptop Dell Inspiron 15 3520 i5 1235U/16GB/512GB/120Hz/OfficeHS/KYHD/Win11",
                image: "https://cdn.tgdd.vn/Products/Images/44/321192/Slider/vi-vn-dell-inspiron-15-3520-i5-25p231-slider-1.jpg",
                price: 699,
                quantity: 2,
            },
            {
                name: "iPhone 11 128GB",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 1999,
                quantity: 1,
            },
            {
                name: "Smart Tivi Samsung UHD 4K 65 inch UA65AU7700",
                image: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_8_14_638276187497562577_smart-tivi-samsung-uhd-4k-au7700-3.jpg",
                price: 1999,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Banh Thi Vinh",
            street: "",
            city: "",
            postalCode: "",
            phone: ""
        },
        total: 100784,
        orderStatus: "pending",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-03T14:56:08.477+00:00",
    },
    // Order 2
    {
        userId: "None",
        items: [
            {
                name: "BeFit Watch Ultra 52.6mm",
                image: "https://cdn.tgdd.vn/Products/Images/7077/315596/Slider/vi-vn-befit-watch-ultra-day-silicone-fix-1.jpg",
                price: 627.95,
                quantity: 1,
            },
            {
                name: "Xiaomi Google Tivi 4K A 55 inch 2025 (L55MA-ASEA)",
                image: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/00910009_tivi_xiaomi_a_55_2025_l55ma_asea_0b7682dc52.png",
                price: 1999,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Nguyen Van A",
            street: "456 Ly Thuong Kiet",
            city: "Da Nang",
            postalCode: "550000",
            phone: "0987654321"
        },
        total: 1199,
        orderStatus: "pending",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-04T10:30:00.000+00:00",
    },
    // Order 3
    {
        userId: "None",
        items: [
            {
                name: "Xiaomi Google Tivi A Pro 55 Inch 4K",
                image: "https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_8_9_638271937140598065_tivi-xiaomi-a-pro-55-inch-4.jpg",
                price: 1999,
                quantity: 1,
            },
            {
                name: "Apple Watch Series 9 GPS 45mm",
                image: "https://cdn.tgdd.vn/Products/Images/7077/314708/Slider/apple-watch-s9-45mm-vien-nhom-day-silicone638351569262602904.jpg",
                price: 1999,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Tran Thi B",
            street: "789 Tran Hung Dao",
            city: "Ha Noi",
            postalCode: "100000",
            phone: "0931122334"
        },
        total: 1399,
        orderStatus: "processing",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-05T12:45:00.000+00:00",
    },
    // Order 4
    {
        userId: "None",
        items: [
            {
                name: "Laptop HP Gaming VICTUS 15 fa1139TX i5 12450H/16GB/512GB/4GB RTX2050/144Hz/Win11 (8Y6W3PA)",
                image: "https://cdn.tgdd.vn/Products/Images/44/318163/Slider/vi-vn-hp-victus-15-fa1139tx-i5-8y6w3pa-slider-1.jpg",
                price: 1999,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Le Van C",
            street: "321 Nguyen Trai",
            city: "Can Tho",
            postalCode: "900000",
            phone: "0911223344"
        },
        total: 399,
        orderStatus: "processing",
        checkoutStatus: "paid",
        createdAt: "2024-12-06T09:00:00.000+00:00",
    },
    // Order 5
    {
        userId: "None",
        items: [
            {
                name: "Realme 13+ 5G 8GB/256GB",
                image: "https://cdn.tgdd.vn/Products/Images/42/330620/Slider/realme-13-plus-5g-8gb-256gb638677081877884882.jpg",
                price: 299,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Nguyen Thi D",
            street: "678 Cach Mang Thang 8",
            city: "Nha Trang",
            postalCode: "650000",
            phone: "0901234567"
        },
        total: 999,
        orderStatus: "completed",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-07T15:20:00.000+00:00",
    },
    // Order 6
    {
        userId: "None",
        items: [
            {
                name: "Realme 13+ 5G 8GB/256GB",
                image: "https://cdn.tgdd.vn/Products/Images/42/330620/Slider/realme-13-plus-5g-8gb-256gb638677081877884882.jpg",
                price: 299,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Le Thanh Vinh",
            street: "Quoc Lo 26",
            city: "Ho Chi Minh City",
            postalCode: "700000",
            phone: "090xxxx567"
        },
        total: 999,
        orderStatus: "completed",
        checkoutStatus: "paid",
        createdAt: "2024-12-07T15:20:00.000+00:00",
    },
    // Order 7
    {
        userId: "None",
        items: [
            {
                name: "Vivo V40 5G 12GB/256GB",
                image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/331985/vivo-v40-5g-cam-hong-1-638682157901110213-750x500.jpg",
                price: 492,
                quantity: 1,
            },
            {
                name: "Xiaomi 14T 5G 12GB/512GB Xanh",
                image: "https://cdn.tgdd.vn/Products/Images/42/329892/Slider/xiaomi-14t-5g-12gb-512gb-xanh638665075497966263.jpg",
                price: 499,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Nguyen Van Sang",
            street: "123 Le Loi",
            city: "Ho Chi Minh City",
            postalCode: "700000",
            phone: "0909001234"
        },
        total: 1797,
        orderStatus: "pending",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-04T10:20:30.477+00:00"
    },
    // Order 8
    {
        userId: "674efe63fa5b9cb7f4020944",
        items: [
            {
                name: "Apple Watch Ultra 2 GPS + Cellular 49mm viền Titanium đen dây Alpine",
                image: "https://cdn.tgdd.vn/Products/Images/7077/329719/Slider/vi-vn-apple-watch-ultra-2-gps-cellular-49mm-vien-titanium-day-alpine-sld-f-1.jpg",
                price: 499,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Le Thi D",
            street: "12 Hai Ba Trung",
            city: "Can Tho",
            postalCode: "900000",
            phone: "0933001234"
        },
        total: 499,
        orderStatus: "processing",
        checkoutStatus: "paid",
        createdAt: "2024-12-07T15:50:00.000+00:00"
    },
    // Order 9
    {
        userId: "674efe63fa5b9cb7f4020943",
        items: [
            {
                name: "GoPro Hero 13 Black",
                image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_3__5_87.png",
                price: 599,
                quantity: 1,
            },
            {
                name: "Camera GoPro Hero 12",
                image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-hanh-trinh-gopro-hero-12-phu-kien.png",
                price: 599,
                quantity: 1,
            },
        ],
        address: {
            fullName: "Hoang Van C",
            street: "789 Nguyen Trai",
            city: "Da Nang",
            postalCode: "550000",
            phone: "0928007890"
        },
        total: 1898,
        orderStatus: "completed",
        checkoutStatus: "unpaid",
        createdAt: "2024-12-06T08:30:45.000+00:00"
    },
    // Order 10
    {
        userId: "None",
        items: [
            {
                name: "iPhone 11 128GB",
                image: "https://cdn.tgdd.vn/Products/Images/42/210644/Slider/iphone-11-128gb638176672333284623.jpeg",
                price: 699,
                quantity: 10,
            },
        ],
        address: {
            fullName: "Le Thanh T",
            street: "Mac Dinh Chi Street, Tan Hoa Quarter, Dong Hoa Ward",
            city: "Di An City, Binh Duong Province",
            postalCode: "820000",
            phone: "094xxxxx32"
        },
        total: 1898,
        orderStatus: "completed",
        checkoutStatus: "paid",
        createdAt: "2024-12-06T08:30:45.000+00:00"
    },
]


export const up = async (db, client) => {
    const categories=await db.collection("categories").insertMany(mockCategories);
    const brands=await db.collection("brands").insertMany(mockBrands);
    const categoryIdMap = categories.insertedIds;
    const brandIdMap = brands.insertedIds;

    const products = await db.collection("products").insertMany(mockProducts);
    const users=await db.collection("users").insertMany(mockUsers);
    const productIdMap = products.insertedIds;
    const userIdMap=users.insertedIds;

    const updatedProductDetails = mockProductDetails.map((detail,index) => {
        return {
        ...detail,
        product_id: productIdMap[index],  
        };
    });

    await db.collection("productdetails").insertMany(updatedProductDetails);


    const updatedProducts = mockProducts.map((product) => {
        // Lấy thông tin productDetail tương ứng
        const productDetail = updatedProductDetails.find(detail => detail.product_id === product._id);

        // Tìm category phù hợp dựa trên type của productDetail
        const category = mockCategories.find(cat => cat.name === productDetail.type);
        return {
            ...product,
            category_id: categoryIdMap[mockCategories.indexOf(category)], // Gán ID của category
        };
    });

    updatedProducts.forEach((item, index) => {
        item.brand_id = brandIdMap[Math.floor(index % 5)];
    });

    for (const product of updatedProducts) {
        // Cập nhật category_id của từng product
        await db.collection("products").updateOne(
            { _id: product._id }, // Tìm sản phẩm bằng _id
            { $set: { 
                category_id: product.category_id,
                brand_id: product.brand_id,
             } }, // Cập nhật category_id
        );
    }


    mockProductProperties[0].category_id = categoryIdMap[3];
    mockProductProperties[1].category_id = categoryIdMap[3];
    mockProductProperties[2].category_id = categoryIdMap[3];
    mockProductProperties[3].category_id = categoryIdMap[3];
    mockProductProperties[4].category_id = categoryIdMap[3];
    mockProductProperties[5].category_id = categoryIdMap[0];
    mockProductProperties[6].category_id = categoryIdMap[0];
    mockProductProperties[7].category_id = categoryIdMap[0];
    mockProductProperties[8].category_id = categoryIdMap[0];
    mockProductProperties[9].category_id = categoryIdMap[0];
    mockProductProperties[10].category_id = categoryIdMap[4];
    mockProductProperties[11].category_id = categoryIdMap[4];
    mockProductProperties[12].category_id = categoryIdMap[4];
    mockProductProperties[13].category_id = categoryIdMap[2];
    mockProductProperties[14].category_id = categoryIdMap[2];
    mockProductProperties[15].category_id = categoryIdMap[2];
    mockProductProperties[16].category_id = categoryIdMap[2];
    mockProductProperties[17].category_id = categoryIdMap[2];
    mockProductProperties[18].category_id = categoryIdMap[2];
    mockProductProperties[19].category_id = categoryIdMap[1];
    mockProductProperties[20].category_id = categoryIdMap[1];
    mockProductProperties[21].category_id = categoryIdMap[1];
    mockProductProperties[22].category_id = categoryIdMap[1];
    mockProductProperties[23].category_id = categoryIdMap[1];
    mockProductProperties[24].category_id = categoryIdMap[1];
    


    const productProperties = await db.collection("productproperties").insertMany(mockProductProperties);
    const propertyIdMap = productProperties.insertedIds; // Lưu _id của các productproperties
    

    const updatedProductPropertyValues = mockProductPropertyValues.map((detail, index) => { 
        return {
            ...detail,
            // product_id: productIdMap[Math.floor(index / 5)],
            __v: index,
        };
    });


    updatedProductPropertyValues.forEach((item, index) => {
        if (index < 25) {
            item.product_id = productIdMap[Math.floor(index / 5)];
        } 
        else if (index < 50) {
            item.product_id = productIdMap[Math.floor(((index - 25) / 5) + 5)];
        }
        else if (index < 65) {
            item.product_id = productIdMap[Math.floor(((index - 50) / 3) + 10)];
        } 
        else if (index < 95) {
            item.product_id = productIdMap[Math.floor(((index - 65) / 6) + 15)];
        }
        else {
            item.product_id = productIdMap[Math.floor(((index - 95) / 6) + 20)];
        }
    });

    updatedProductPropertyValues.forEach((item, index) => {
        if (index < 25) {
            item.property_id = propertyIdMap[Math.floor(index % 5)];
        } 
        else if (index < 50) {
            item.property_id = propertyIdMap[Math.floor((index % 5) + 5)];
        } 
        else if (index < 65) {
            item.property_id = propertyIdMap[Math.floor((index % 3) + 10)];
        } 
        else if (index < 95) {
            item.property_id = propertyIdMap[Math.floor((index % 6) + 13)];
        }
        else {
            item.property_id = propertyIdMap[Math.floor((index % 6) + 19)];
        }
    });

    await db.collection("productpropertyvalues").insertMany(updatedProductPropertyValues);

    const updatedReviews = mockReviews.map((review, index) => {
        return {
        ...review,
        userId: userIdMap[Math.floor(index / 4)],
        productId: productIdMap[index % 25],
        __v: index,
        };
    });

    await db.collection("reviews").insertMany(updatedReviews);


    const updatedCarts = mockCarts.map((cart, cartIndex) => {
        return {
            ...cart,
            userId: userIdMap[cartIndex],
            items: cart.items.map((item, itemIndex) => {
                // Lấy index ngẫu nhiên hoặc theo công thức từ danh sách productIdMap
                const randomProductIndex = (cartIndex * 3 + itemIndex) % 25;
                return {
                    ...item,
                    productId: productIdMap[randomProductIndex],
                };
            }),
        };
    });
    
    await db.collection("carts").insertMany(updatedCarts);
    
    const updatedOrders = mockOrders.map((order, orderIndex) => {
        return {
            ...order,
            userId: userIdMap[orderIndex],
            address: {
                ...order.address,
                fullName: mockUsers[orderIndex].fullName,
            },
        };
    });

    await db.collection("orders").insertMany(updatedOrders);

    for (const order of updatedOrders) {
        // Tính tổng tiền từ items
        const newTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Cập nhật giá trị total trong đơn hàng
        await db.collection("orders").updateOne(
            { _id: order._id },
            { $set: { total: newTotal } }
        );
    }
};

export const down = async (db, client) => {
    const productIds = mockProducts.map(product => product._id);

    // Xóa dữ liệu trong các collection liên quan
    await db.collection("products").deleteMany({ _id: { $in: productIds } });
    await db.collection("productdetails").deleteMany({ productId: { $in: productIds } });
    await db.collection("productproperties").deleteMany({ productId: { $in: productIds } });
    await db.collection("productpropertyvalues").deleteMany({ productId: { $in: productIds } });
    await db.collection("reviews").deleteMany({ productId: { $in: productIds } });
    await db.collection("users").deleteMany({ userName: { $in: mockUsers.map(user => user.userName) } });

    // Xóa các dữ liệu liên quan đến brand và category
    await db.collection("brands").deleteMany({ _id: { $in: Object.values(mockBrands).map(brand => brand._id) } });
    await db.collection("categories").deleteMany({ _id: { $in: Object.values(mockCategories).map(category => category._id) } });

    // Xóa collection nếu cần thiết
    await db.collection("products").drop();
    await db.collection("productdetails").drop();
    await db.collection("productproperties").drop();
    await db.collection("productpropertyvalues").drop();
    await db.collection("reviews").drop();
    await db.collection("users").drop();
    await db.collection("brands").drop();
    await db.collection("categories").drop();
    await db.collection("carts").drop();
    await db.collection("orders").drop();
};
