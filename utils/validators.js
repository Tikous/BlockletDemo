import { z } from 'zod';

// 定义用户 profile 验证器
export const profileSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^1[3-9]\d{9}$/, { message: 'Invalid Chinese phone number' }),
});
