import pdf2img from 'pdf-img-convert';
import { writeFile, existsSync, mkdirSync } from 'fs'
import path from 'path';

const pdfPath = 'Endocarditis.pdf'

function createPath(folderPath: string) {
  if (existsSync(folderPath)) {
    return
  }

  mkdirSync(folderPath)
}

async function convertPDF(pdfPath: string) {
  console.log("Converting ", pdfPath);
  const pdfArray = await pdf2img.convert(pdfPath, { scale: 3 });
  const baseName = path.basename(pdfPath, '.pdf')

  for (let i = 0; i < pdfArray.length; i++) {
    createPath('output')
    writeFile(path.join("output", baseName + i + ".jpg"), pdfArray[i], function (error) {
      if (error) { console.error("Error: " + error); }
    });
  }
}

convertPDF(pdfPath)