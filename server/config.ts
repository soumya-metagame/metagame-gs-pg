
interface DatabaseConfig {
    connectionString: string;
  }
  
  interface AppConfig {
    port: number;
    database: DatabaseConfig;
    secretKey: string;
    // Add more configuration options as needed
  }
  
  const config: AppConfig = {
    port: parseInt(process.env.PORT as string, 10),
    database: {
      connectionString: process.env.DB_CONNECTION_STRING || "",
    },
    secretKey: process.env.SECRET_KEY || '',
    // Add more configuration options as needed
  };
  
  export default config;

