import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver"

const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
};

async function downloadImage(_id, photo) {
  try {
    const response = await fetch(photo)

    if(!response.ok) {
      alert(`Failed to get response`)
    }

    const blobImage = await response.blob()
    const fileName = `download-${_id}.jpg`

    FileSaver.saveAs(blobImage, fileName)

  } catch (error) {
    alert(error)
  }

  
}

export { getRandomPrompt, downloadImage };
