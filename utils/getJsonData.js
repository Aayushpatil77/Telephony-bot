import { read, utils } from "xlsx";
/**
 * Takes excel buffer and returns json data
 * @param {Buffer} buffer 
 * @returns {any[]}
 */
export default function getJsonData(buffer) {
    const workbook = read(buffer, { type: "buffer" });
    const jsonData = utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
    );

    console.log(jsonData);

    return jsonData;

}