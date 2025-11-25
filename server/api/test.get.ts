import { GoogleSheets } from "../utils/google-sheets"



export default defineEventHandler(async (event) => {
  console.log(event.path)

  const googleSheets = new GoogleSheets()
  await googleSheets.appendNewRow()
  await googleSheets.testAppendData()

  return {
    hello: "world",
  }
})




