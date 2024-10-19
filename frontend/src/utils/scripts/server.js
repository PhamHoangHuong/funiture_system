// const express = require('express');
// const { generateAllPages } = require('./generateAllPages');
// const app = express();

// app.post('/api/generate-page', async (req, res) => {
//   try {
//     const result = await generatePage(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Lỗi server' });
//   }
// });