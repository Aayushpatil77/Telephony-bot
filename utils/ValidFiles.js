
/**
 * 
 * @param {String} filename 
 */
function getExtension(filename) {
    return filename.split('.').pop();
}

/**
 * 
 * @param {any} files 
 * @returns {Array}
 */
export default function validFile(files) {
    
    let validFile = ['', ''];
    

    if(files.length != 2) return [];
    
    const extensions = [];
    for (let i = 0;i < 2; i++) {
        extensions.push(getExtension(files[i].name));
    }

    if (!extensions.includes('xlsx')) return [];
    if (!extensions.includes('mp3')) return [];

    if (getExtension(files[0].name) == 'xlsx') {
        validFile[0] = files[0];
        validFile[1] = files[1];
    } else {
        validFile[0] = files[1];
        validFile[1] = files[0];
    }


    return validFile;
}