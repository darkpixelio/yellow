import XLSX from 'xlsx'

const generateXLSX = data => {
  return new Promise((resolve, reject) => {
    let reportArray = []
    for(let item of data) {
      let order = item.node
      for(let transaction of order.transactions) {
        let reportObject = {}
        reportObject['Order'] = transaction.order.id.split('/').slice(-1)[0]
        reportObject['Name'] = transaction.order.name
        reportObject['Created At'] = new Date(transaction.createdAt).toGMTString()
        reportObject['Amount'] = transaction.amountSet.shopMoney.amount
        reportObject['Currency'] = transaction.amountSet.shopMoney.currencyCode
        reportObject['Gateway'] = transaction.gateway
        reportObject['Card Type'] = ""
        reportObject['Payment Status'] = transaction.status
        reportObject['Fulllment Status'] = !order.metafield ? "Unfulfilled" : order.metafield.value
        reportObject['Retrun/Refund Amount'] = ""
        reportObject['Delivery charge'] = ""
        reportObject['Cash collection charge'] = ""
        reportObject['Deposit amount'] = ""
        reportObject['Courier payment reference'] = ""
        reportObject['Consigmnent ID'] = ""
        reportObject['Transaction ID'] = transaction.id.split('/').slice(-1)[0]

        reportArray.push(reportObject)
      }
    }
    try {
      let ws = XLSX.utils.json_to_sheet(reportArray, {})
      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Report')

      let date = new Date()
      let fileName = `report_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_at_${date.getHours()}-${date.getMinutes()}`

      XLSX.writeFileAsync(`./src/public/exports/${fileName}.xlsx`, wb, success => {
        resolve({ download_link: `/files/exports/${fileName}.xlsx` })
      })
    }
    catch(e) {
      console.log(e)
      reject({error: e})
    }
  })
}

export { generateXLSX }