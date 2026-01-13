import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export class TestcaseController {
  static async downloadTestcaseFile(
    req: Request,
    res: Response,
  ): Promise<void> {
    const fileBody = req.body;
    const fileName = fileBody.fileName || "default.txt";
    const fileContent = fileBody.content || "";

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "text/plain");
    res.send(fileContent);
  }

  static async saveTestcaseFile(
    content: string,
    folderPath: string,
    chatId: string,
  ): Promise<string> {
    try {
      const testcaseDirectory = path.join(folderPath, chatId || "");

      // Create the directory if it doesn't exist
      if (!fs.existsSync(testcaseDirectory)) {
        fs.mkdirSync(testcaseDirectory, { recursive: true });
      }
      const fileName = `test-case-${chatId}.txt`;
      const filePath = path.join(testcaseDirectory, fileName);
      // Save the screenshot
      fs.writeFileSync(filePath, content);
      console.log(`Testcase saved: ${filePath}`);

      // Return the relative path of the saved screenshot
      return path.relative(folderPath, filePath);
    } catch (error) {
      console.log(`Testcase Save Error`, error);
      return "";
    }
  }

  static downloadTestcase = async (
    messages: any[],
    currentChatId: string,
    path: string,
  ) => {
    const testcase: string[] = [];
    messages.forEach((msg) => {
      const roi =
        msg.text.match(/(<about_this_action>(.*?)<\/about_this_action>)/g) ||
        [];

      if (roi.length > 0) {
        const action = roi[0]
          ?.replace(/<about_this_action>/g, "")
          ?.replace(/<\/about_this_action>/g, "");
        action && testcase.push(action);
      }
    });
    await TestcaseController.saveTestcaseFile(
      testcase.join("\n"),
      path,
      currentChatId,
    ).then();
  };
}
