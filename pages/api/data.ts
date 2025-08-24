import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { body, query, method } = req;
  // fixme check exist filename
  const filePath = path.join(
    process.cwd(),
    "public",
    `storage/${query?.filename ?? body.filename}.json`,
  );

  if (method === "GET") {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Ошибка чтения файла",
        error: (error as Error).message,
      });
    }
  } else if (method === "POST") {
    try {
      const newData = body.data;
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
      res.status(200).json({ message: "Данные успешно сохранены" });
    } catch (error) {
      res.status(500).json({
        message: "Ошибка записи файла",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}
