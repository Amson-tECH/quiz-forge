import pdfParse from 'pdf-parse'

export const extractTextFromPdfBuffer = async (buffer) => {
  const data = await pdfParse(buffer)
  return String(data.text || '').replace(/\s+/g, ' ').trim()
}