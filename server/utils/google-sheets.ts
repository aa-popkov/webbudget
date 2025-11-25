import type { AuthClient, GoogleAuth } from "google-auth-library"
import { google } from "googleapis"

export class GoogleSheets {
  private auth: GoogleAuth<AuthClient>

  constructor() {
    const config = useRuntimeConfig()
    this.auth = new google.auth.GoogleAuth({
      credentials: config.googleSheets.serviceAccount,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
  }

  public async appendNewRow() {
    const sheets = google.sheets({ version: "v4", auth: this.auth })

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: "11P56sYiDtt9uRCaWvn3a4qnhA7kSoHS0qCWL75FL3iE",
      requestBody: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: 1,
                endIndex: 2,
              },
              inheritFromBefore: false,
            },
          },
        ],
      },
    })

    console.log("Data saved successfully!")
  }

  async testAppendData() {
    const sheets = google.sheets({ version: "v4", auth: this.auth })

    const values = exampleData.map((item) => [
      item.firstName,
      item.lastName,
      item.email,
      item.phone,
      item.plan,
      item.premium_amount,
      item.start_policy_date,
      item.end_policy_date,
    ])

    await sheets.spreadsheets.values.append({
      spreadsheetId: "11P56sYiDtt9uRCaWvn3a4qnhA7kSoHS0qCWL75FL3iE",
      range: "Sheet1!A2", // Adjust based on your sheet structure
      valueInputOption: "RAW",
      requestBody: { values },
    })

    console.log("Data saved successfully!")
  }
}

const exampleData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    plan: "Gold Plan",
    premium_amount: 50000,
    start_policy_date: "2025-01-01",
    end_policy_date: "2026-01-01",
  },
]
