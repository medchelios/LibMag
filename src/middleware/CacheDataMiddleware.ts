// import { Response, Request, NextFunction } from "express";
// import Redis from "ioredis";


// // Create a Redis client
// const redis: Redis = new Redis();

// // Middleware to check if data is in the cache
// export const CheckCache = async (req: Request, res: Response, next: NextFunction) => {
//     const cachedData = await redis.get('cachedData');
  
//     if (cachedData) {
//       res.send(JSON.parse(cachedData));
//     } else {
//       next(); // Continue to the route handler if data is not in the cache
//     }
//   };