## 注意事项

本 demo 使用了 mysql 数据库，并使用了 prisma 来生成映射。
因此需先执行以下操作:

1. **链接 mysql**
   在.env 文件中设置 mysql 链接
2. **使用 prisma 生成映射**

```
npx prisma generate
npx prisma migrate dev
```

3. **生成 seeding data**

```
npm run seed
```
