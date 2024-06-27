const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/user', middleware.user());

// 添加 GET 方法
router.get('/user', async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// 添加 POST 方法
router.put('/user', async (req, res) => {
  const { username, email, phone } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { id: 1 },
      data: { id: 1, username, email, phone },
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

module.exports = router;
