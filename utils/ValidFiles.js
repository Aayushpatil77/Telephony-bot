/**
 *
 * @param {String} filename
 */
function getExtension(filename) {
  return filename.split(".").pop();
}

/**
 *
 * @param {any} files
 * @returns {Array}
 */
export default function validFiles(files) {
  let validFile = ["", "", ""];

  if (files.length != 3) return [];

  const extensions = [];
  for (let i = 0; i < 3; i++) {
    extensions.push(getExtension(files[i].name));
  }

  if (
    !(
      extensions.includes("xlsx") ||
      extensions.includes("xls") ||
      extensions.includes("mp3") ||
      extensions.includes("txt")
    )
  )
    return [];

  // Sort According to the file extension
  for (let i = 0; i < 3; i++) {
    let ext = getExtension(files[i].name);
    if (ext == "xlsx" || ext == "xls") {
      validFile[0] = files[i];
    } else if (ext == "mp3") {
      validFile[1] = files[i];
    } else if (ext == "txt") {
      validFile[2] = files[i];
    }
  }

  return validFile;
}
