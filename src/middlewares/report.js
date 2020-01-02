import XLSX from 'xlsx'

const data = [
  {
    "Order": "778000000000",
    "Name": "#1001",
    "Created At": "2/1/2019  5:59:00 PM",
    "Amount": "53.45",
    "Currency": "USD",
    "Gateway": "Shopify Paymets",
    "Card Type": "master",
    "Payment Status": "Partial Refuned",
    "Fulllment Status": "Fullfiled by Pathao",
    "Retrun/Refund Amount": "20",
    "Delivery charge": "",
    "Cash collection charge": "",
    "Deposit amount": "",
    "courier payment reference": "",
    "Consigmnent ID": "",
    "Transaction ID": ""
  },
  {
    "Order": "778000538536",
    "Name": "#1003",
    "Created At": "2/1/2019  5:59:00 PM",
    "Amount": "102.45",
    "Currency": "USD",
    "Gateway": "Shopify Paymets",
    "Card Type": "visa",
    "Payment Status": "Paid",
    "Fulllment Status": "Sundarban",
    "Retrun/Refund Amount": "20",
    "Delivery charge": "",
    "Cash collection charge": "",
    "Deposit amount": "",
    "courier payment reference": "",
    "Consigmnent ID": "",
    "Transaction ID": ""
  }
]

let ws = XLSX.utils.json_to_sheet(data, { })
let wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Report')

XLSX.writeFileAsync('./src/public/exports/report.xlsx', wb, success => {
  console.log(success)
})