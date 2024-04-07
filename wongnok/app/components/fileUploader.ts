import { promises as fsPromises } from 'fs';

type CallbackFunction = (error: NodeJS.ErrnoException | null, fileName?: string) => void;

const uploadPath = process.env.DEFAULT_UPLOAD_PATH;

export default async function fileUploader(file: File, fileName: string, directoryPath: string, callback: CallbackFunction): Promise<void> {
    try {
        const currentDate = Date.now()
        const formattedName: string = fileName.replace(/\s+/g, '-')

        const newFileName = `${currentDate}-${formattedName}-${file.name}`

        const filePath = uploadPath + directoryPath + newFileName

        const fileData = await file.arrayBuffer();

        await fsPromises.writeFile(filePath, Buffer.from(fileData))

        callback(null, filePath)

    } catch (error: any) {
        console.error('เกิดข้อผิดพลาดในการบันทึกไฟล์:', error)
        callback(error)
    }
}
