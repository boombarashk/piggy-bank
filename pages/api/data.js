import fs from 'fs';
import path from 'path';

// req — входящее сообщение HTTP, res — HTTP-ответ сервера
export default async function handler(req, res) {
  // fixme check exist filename
  const filePath = path.join(process.cwd(), 'public', `storage/${req.query?.filename ?? req.body.filename}.json`);

  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка чтения файла', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const newData = req.body.data;
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
      res.status(200).json({ message: 'Данные успешно сохранены' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка записи файла', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
