import { Router } from 'express';
import { join } from 'path';

const router = Router();

// GET / - renderiza la vista index.html
router.get('^/$|index(.html)?', (_, res) => {
  res.sendFile(join(__dirname, '..', 'views', 'index.html'));
});

export default router;
