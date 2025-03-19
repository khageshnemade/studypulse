import React from "react";

const invoiceData = {
  company: "EKTA ENTERPRICE",
  address: "BUDHWARI BAZAR, GN ROAD SEONI",
  gstin: "23ABJPS6285R1ZF",
  jurisdiction: "SEONI Jurisdiction",
  fssaiNo: "11417230000027",
  phone: "9179174888, 9826623188",
  officeNo: "07692-220897",
  stateCode: "23",
  invoiceNo: "11",
  mode: "CASH",
  date: "2024-08-10",
  time: "12:33:44 AM",
  dueDate: "10469001600000",
  irn: "0265bc6f60a237272925c34fd61445701a382b5d00f5b8b56452930b",
  ackNo: "11",
  ackDate: "2024-08-10",
  party: {
    name: "Enim maxime a quos P",
    address: "30 East Milton Lane",
    gstin: "S",
    stateCode: "23",
    mobile: "41234",
    balance: "0",
  },
  items: [
    {
      particulars: "MK SOYA OIL 5 LTR JAR",
      pack: "4.5 KG",
      mrp: "907.00",
      gst: "5.00",
      rate: "585.00",
      unit: "Box",
      qty: "01",
      free: "0",
      schRs: "11",
      netAmt: "2082.60",
    },
    {
      particulars: "MK RICE",
      pack: "1 KG",
      mrp: "150.00",
      gst: "5.00",
      rate: "120.00",
      unit: "Packet",
      qty: "02",
      free: "0",
      schRs: "11",
      netAmt: "228.00",
    },
    {
      particulars: "MK WHEAT FLOUR",
      pack: "500 GM",
      mrp: "80.00",
      gst: "5.00",
      rate: "60.00",
      unit: "Packet",
      qty: "03",
      free: "0",
      schRs: "11",
      netAmt: "171.00",
    },
    {
      particulars: "MK COOKING OIL",
      pack: "1 LTR",
      mrp: "100.00",
      gst: "5.00",
      rate: "80.00",
      unit: "Bottle",
      qty: "01",
      free: "0",
      schRs: "11",
      netAmt: "76.00",
    },
    {
      particulars: "MK SUGAR",
      pack: "2 KG",
      mrp: "200.00",
      gst: "5.00",
      rate: "160.00",
      unit: "Packet",
      qty: "02",
      free: "0",
      schRs: "11",
      netAmt: "304.00",
    },
    {
      particulars: "MK TEA LEAVES",
      pack: "500 GM",
      mrp: "90.00",
      gst: "5.00",
      rate: "80.00",
      unit: "Packet",
      qty: "01",
      free: "0",
      schRs: "11",
      netAmt: "114.00",
    },
    {
      particulars: "MK SPICES",
      pack: "250 GM",
      mrp: "50.00",
      gst: "5.00",
      rate: "40.00",
      unit: "Packet",
      qty: "01",
      free: "0",
      schRs: "11",
      netAmt: "50.00",
    },
  ],
  grossAmount: "31721.52",
  lessSch: "0.00",
  lessCD: "123.65",
  roundOff: "0.00",
  netAmount: "31598.00",
};

const Invoice = () => {
  return (
    <div className="grid grid-cols-3 m-2 p-10">
      {/* Left side content */}
      <div className="col-span-2 w-full">
        <div className=" bg-white border border-black max-w-full mx-auto flex-grow print:border-none print:p-4">
          {/* Header Section */}
          <div className="grid grid-cols-3 border-b border-black pb-4 p-10">
            <div>
              <p className="text-sm">
                <strong>GSTIN:</strong> {invoiceData.gstin}
              </p>
              <p className="text-sm">
                <strong>Jurisdiction:</strong> {invoiceData.jurisdiction}
              </p>
              <p className="text-sm">
                <strong>FSSAI No:</strong> {invoiceData.fssaiNo}
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold">{invoiceData.company}</h1>
              <p>{invoiceData.address}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <strong>Ph:</strong> {invoiceData.phone}
              </p>
              <p className="text-sm">
                <strong>Office No:</strong> {invoiceData.officeNo}
              </p>
              <p className="text-sm">
                <strong>State Code:</strong> {invoiceData.stateCode}
              </p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="flex justify-between border-b border-black py-2 p-10 text-sm">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-1/2">
                    <p>
                      <strong>Party:</strong> {invoiceData.party.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {invoiceData.party.address}
                    </p>
                    <p>
                      <strong>GSTIN:</strong> {invoiceData.party.gstin}
                    </p>
                    <p>
                      <strong>State Code:</strong> {invoiceData.party.stateCode}
                    </p>
                    <p>
                      <strong>Mobile No:</strong> {invoiceData.party.mobile}
                    </p>
                    <p>
                      <strong>Balance B/F:</strong> {invoiceData.party.balance}
                    </p>
                  </td>

                  <td className="w-1/2 text-right border-l-2 border-black pl-4">
                    <p>
                      <strong>Inv. No:</strong> {invoiceData.invoiceNo}
                    </p>
                    <p>
                      <strong>Mode:</strong> {invoiceData.mode}
                    </p>
                    <p>
                      <strong>Date:</strong> {invoiceData.date}{" "}
                      {invoiceData.time}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {invoiceData.dueDate}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Section */}
          <table className="w-full border-collapse border-2 border-black mt-4 text-xs">
            <thead>
              <tr>
                <th className="border border-black p-1">Particulars/HSN</th>
                <th className="border border-black p-1">Pack</th>
                <th className="border border-black p-1">M.R.P</th>
                <th className="border border-black p-1">GST%</th>
                <th className="border border-black p-1">Rate</th>
                <th className="border border-black p-1">Unit</th>
                <th className="border border-black p-1">Qty</th>
                <th className="border border-black p-1">Free</th>
                <th className="border border-black p-1">Sch Rs.</th>
                <th className="border border-black p-1">Net Amt</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black p-1">
                    {item.particulars}
                  </td>
                  <td className="border border-black p-1">{item.pack}</td>
                  <td className="border border-black p-1">{item.mrp}</td>
                  <td className="border border-black p-1">{item.gst}</td>
                  <td className="border border-black p-1">{item.rate}</td>
                  <td className="border border-black p-1">{item.unit}</td>
                  <td className="border border-black p-1">{item.qty}</td>
                  <td className="border border-black p-1">{item.free}</td>
                  <td className="border border-black p-1">{item.schRs}</td>
                  <td className="border border-black p-1">{item.netAmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <InvoiceFooter />
        </div>
      </div>

      {/* Right side content (you mentioned Invoice1) */}
      <div className="justify-between h-full">
        <div className="h-full">
          <Invoice1 />
        </div>
      </div>
    </div>
  );
};

const Invoice1 = () => {
  const invoiceData = {
    company: "EKTA ENTERPRICE",
    address: "BUDHWARI BAZAR, GN ROAD SEONI",
    invoiceNo: "11",
    mode: "CASH",
    date: "2024-08-10",
    time: "12:33:44 AM",
    dueDate: "10469001600000",
    items: [
      {
        particulars: "MK SOYA OIL 5 LTR JAR",
        mrp: "907.00",
        qty: "01",
        free: "0",
      },
      { particulars: "MK RICE", mrp: "150.00", qty: "02", free: "0" },
      { particulars: "MK WHEAT FLOUR", mrp: "80.00", qty: "03", free: "0" },
      { particulars: "MK COOKING OIL", mrp: "100.00", qty: "01", free: "0" },
      { particulars: "MK SUGAR", mrp: "200.00", qty: "02", free: "0" },
      { particulars: "MK TEA LEAVES", mrp: "90.00", qty: "05", free: "0" },
      { particulars: "MK SPICES", mrp: "50.00", qty: "03", free: "0" },
      { particulars: "MK PULSES", mrp: "150.00", qty: "02", free: "0" },
      { particulars: "MK SNACKS", mrp: "300.00", qty: "01", free: "0" },
      { particulars: "MK BISCUITS", mrp: "120.00", qty: "02", free: "0" },
      { particulars: "MK NUTS", mrp: "70.00", qty: "01", free: "0" },
      { particulars: "MK CANDY", mrp: "130.00", qty: "03", free: "0" },
    ],
    grossAmount: "31721.52",
    lessSch: "0.00",
    lessCD: "123.65",
    roundOff: "0.00",
    netAmount: "31598.00",
  };
  return (
    <div className=" bg-white border border-black shadow-md h-full">
      {/* Header */}
      <div className="text-center border-b border-black pb-2">
        <h1 className="text-xl font-bold">{invoiceData.company}</h1>
        <p className="text-sm">{invoiceData.address}</p>
      </div>

      {/* Invoice Details */}
      <div className="flex justify-between border-b border-black py-2 text-sm p-4">
        <div>
          <p>
            <strong>Inv. No:</strong> {invoiceData.invoiceNo}
          </p>
          <p>
            <strong>Mode:</strong> {invoiceData.mode}
          </p>
        </div>
        <div className="text-right">
          <p>
            <strong>Date:</strong> {invoiceData.date}
          </p>
          <p>
            <strong>Time:</strong> {invoiceData.time}
          </p>
          <p>
            <strong>Due Date:</strong> {invoiceData.dueDate}
          </p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-black mt-2 text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-1 w-1/2">Particulars/HSN</th>
            <th className="border border-black p-1">M.R.P</th>
            <th className="border border-black p-1">Qty</th>
            <th className="border border-black p-1">Free</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="h-8">
              <td className="border border-black p-1">{item.particulars}</td>
              <td className="border border-black p-1 text-center">
                {item.mrp}
              </td>
              <td className="border border-black p-1 text-center">
                {item.qty}
              </td>
              <td className="border border-black p-1 text-center">
                {item.free}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-2 text-sm text-right font-bold">
        <p>Gross Amt.: ₹{invoiceData.grossAmount}</p>
        <p>Less Sch.: ₹{invoiceData.lessSch}</p>
        <p>Less CD: ₹{invoiceData.lessCD}</p>
        <p>R.Off: ₹{invoiceData.roundOff}</p>
        <p className="text-lg">Net Amt.: ₹{invoiceData.netAmount}</p>
      </div>
    </div>
  );
};

const InvoiceFooter = () => {
  const invoiceData = {
    billInfo: {
      itemsInBill: 1,
      casesInBill: 1,
      looseItemsInBill: 0,
    },
    termsAndConditions: [
      "We hereby certify that articles of food mentioned in the invoice are warranted to be of the nature and quality which they purport to be as per the Food Safety and Standards Act and Rules.",
      "Goods once sold will not be taken back. E & OE.",
    ],
    taxDetails: {
      goodsAmount: 2082.6,
      sgstPercentage: 2.5,
      sgstValue: 52.06,
      cgstPercentage: 2.5,
      cgstValue: 52.06,
      totalTax: 104.13,
    },
    amountSummary: {
      grossAmount: 2082.6,
      lessSch: 0.0,
      lessCD: 0.0,
      roundOff: 0.0,
      netAmount: 2082.6,
    },
  };

  return (
    <div className="p-4 border border-black shadow-md text-sm">
      <div className="grid grid-cols-4">
        {/* Bill Info Section */}
        <div className="border border-black p-2">
          <p>
            <strong>Items in Bill:</strong> {invoiceData.billInfo.itemsInBill}
          </p>
          <p>
            <strong>Cases in Bill:</strong> {invoiceData.billInfo.casesInBill}
          </p>
          <p>
            <strong>Loose items in Bill:</strong>{" "}
            {invoiceData.billInfo.looseItemsInBill}
          </p>
        </div>

        {/* Terms & Conditions Section */}
        <div className="border border-black p-2">
          <p className="font-bold">Terms & Conditions:</p>
          {invoiceData.termsAndConditions.map((term, index) => (
            <p key={index} className="text-xs">
              {index + 1}. {term}
            </p>
          ))}
        </div>

        {/* Tax Breakdown Section */}
        <div className="border border-black">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black p-1">Goods</th>
                <th className="border border-black p-1">SGST%</th>
                <th className="border border-black p-1">Value</th>
                <th className="border border-black p-1">CGST%</th>
                <th className="border border-black p-1">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.goodsAmount}
                </td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.sgstPercentage}%
                </td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.sgstValue}
                </td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.cgstPercentage}%
                </td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.cgstValue}
                </td>
              </tr>
              <tr className="text-center font-bold">
                <td className="border border-black p-1">2.50</td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.sgstValue}
                </td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1">
                  {invoiceData.taxDetails.totalTax}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Amount Summary Section */}
        <div className="border border-black p-2">
          <table className="w-full border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black p-1">Gross Amt.</td>
                <td className="border border-black p-1">
                  {invoiceData.amountSummary.grossAmount}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-1">Less Sch.</td>
                <td className="border border-black p-1">
                  {invoiceData.amountSummary.lessSch}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-1">Less CD</td>
                <td className="border border-black p-1">
                  {invoiceData.amountSummary.lessCD}
                </td>
              </tr>
              <tr>
                <td className="border border-black p-1">R.Off</td>
                <td className="border border-black p-1">
                  {invoiceData.amountSummary.roundOff}
                </td>
              </tr>
              <tr className="font-bold">
                <td className="border border-black p-1">Net Amt.</td>
                <td className="border border-black p-1">
                  {invoiceData.amountSummary.netAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
