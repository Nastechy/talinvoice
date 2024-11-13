import { formatCurrency } from "./utils/currencyFormatter"

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  rate: number
}

interface InvoiceData {
  invoiceNumber: string
  date: string
  from: {
    name: string
    address: string[]
    email: string
  }
  to: {
    name: string
    address: string[]
  }
  items: InvoiceItem[]
  taxPayerId: string
}

const invoiceData: InvoiceData = {
  invoiceNumber: 'INV-001',
  date: '13/11/2024',
  from: {
    name: 'ANDREW ABU',
    address: [
      'Mahogany Close, Unity Estate',
      'Elebu, Ibadan,',
      'Oyo State.',
    ],
    email: 'andrewmarin976@gmail.com',
  },
  to: {
    name: 'TALAMUS HEALTHCARE LTD.',
    address: [
      '13, Olayeni Abiola Street, Opebi',
      'Road, Ikeja,',
      'Lagos State.',
    ],
  },
  items: [
    {
      id: 1,
      description: 'Quality Assurance (QA) Tester',
      quantity: 6,
      rate: 300000,
    },
  ],
  taxPayerId: 'N-4882007',
}

export default function Component() {
  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.quantity * item.rate, 0)
  const total = subtotal 

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white mt-20 shadow-md">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="inline-block bg-blue-600 text-white px-4 py-2 mb-6 rounded-md shadow-md">
            <h1 className="text-xl font-bold">CONTRACT INVOICE</h1>
          </div>
          <div className="space-y-1">
            <div className="bg-blue-200 text-blue-800 inline-block px-2 py-1 font-bold rounded">
              {invoiceData.from.name}
            </div>
            <div className="text-sm space-y-1 text-gray-600">
              {invoiceData.from.address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              <p className="mt-2">{invoiceData.from.email}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-blue-600">Invoice #: {invoiceData.invoiceNumber}</p>
          <p className="font-medium">{invoiceData.date}</p>
          <div className="mt-8 text-sm space-y-1 text-gray-600">
            <p className="font-bold text-blue-800">{invoiceData.to.name}</p>
            {invoiceData.to.address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-blue-200 px-4 py-2 text-left w-16 text-blue-800">S/N</th>
              <th className="border border-blue-200 px-4 py-2 text-left text-blue-800">Item</th>
              <th className="border border-blue-200 px-4 py-2 text-left w-32 text-blue-800">Months/Qty</th>
              <th className="border border-blue-200 px-4 py-2 text-left w-32 text-blue-800">Rate</th>
              <th className="border border-blue-200 px-4 py-2 text-left w-40 text-blue-800">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className="border border-blue-200">
                <td className="border border-blue-200 px-4 py-2">{index + 1}</td>
                <td className="border border-blue-200 px-4 py-2">{item.description}</td>
                <td className="border border-blue-200 px-4 py-2">{item.quantity}</td>
                <td className="border border-blue-200 px-4 py-2">{formatCurrency(item.rate)}</td>
                <td className="border border-blue-200 px-4 py-2">{formatCurrency(item.quantity * item.rate)}</td>
              </tr>
            ))}
            {[...Array(2)].map((_, index) => (
              <tr key={`empty-${index}`} className="border border-blue-200">
                <td className="border border-blue-200 px-4 py-2"></td>
                <td className="border border-blue-200 px-4 py-2"></td>
                <td className="border border-blue-200 px-4 py-2"></td>
                <td className="border border-blue-200 px-4 py-2"></td>
                <td className="border border-blue-200 px-4 py-2"></td>
              </tr>
            ))}
            <tr className="border border-blue-200 bg-blue-50">
              <td colSpan={4}  className="border font-[700] border-blue-200 px-4 py-2 text-right text-blue-800">
                Subtotal
              </td>
              <td className="border border-blue-200 px-4 py-2 font-[700] text-blue-800">{formatCurrency(subtotal)}</td>
            </tr>
            <tr className="border border-blue-200 bg-blue-100">
              <td colSpan={4} className="border border-blue-200 px-4 py-2 text-right font-bold text-blue-800">
                TOTAL
              </td>
              <td className="border border-blue-200 px-4 py-2 font-bold text-blue-800">{formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 text-gray-700">
        <div>
          <span className="font-medium">Amount in Words: </span>
          <span className="italic">One Million, Eight Hundred Thousand Naira Only.</span>
        </div>
        <div>
          <span className="font-medium">NB: Tax Payer ID Number </span>
          <span className="font-[700]">({invoiceData.taxPayerId})</span>
        </div>
      </div>
    </div>
  )
}