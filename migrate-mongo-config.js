const config = {
  mongodb: {
    url: "mongodb+srv://vinh01515application:YrQQXix0hXIPZLD2@cluster0.c6dwy.mongodb.net",
    databaseName: "MyBackEndApp",
    options: {
      // connectTimeoutMS: 3600000, // Optional: increase connection timeout
      // socketTimeoutMS: 3600000,  // Optional: increase socket timeout
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

export default config;
