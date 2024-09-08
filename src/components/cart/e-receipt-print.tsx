import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect } from "react";

interface OrderItem {
  beverage_id: string;
  name: string;
  size: string;
  sugar_level: number;
  price: number;
  quantity: number;
  total: number;
}

interface OrderDetails {
  customer_name: string;
  customer_msg?: string;
  total_amt: number;
  order_type: "dine-in" | "take-out";
  payment_type: string;
}

interface ReceiptPrinterProps {
  order: OrderDetails;
  orderItems: OrderItem[];
  pdfGenerated: boolean; // Flag to track if the PDF has been generated
  setPdfGenerated: (value: boolean) => void; // Function to update the pdfGenerated flag
}

const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({
  order,
  orderItems,
  pdfGenerated,
  setPdfGenerated, // Add this to prevent re-triggering
}) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 160],
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const fontSize = 8;

    const headerLeading = 6;
    const bodyLeading = 4;
    const footerLeading = 6;

    doc.setFont("Courier", "normal");
    doc.setFontSize(fontSize);

    let currentY = 20;
    doc.text("E-Receipt", pageWidth / 2, currentY, { align: "center" });
    currentY += headerLeading;

    doc.text(`Customer: ${order.customer_name}`, 10, currentY);
    currentY += bodyLeading;

    if (order.customer_msg) {
      doc.text(`Message: ${order.customer_msg}`, 10, currentY);
      currentY += bodyLeading;
    }

    doc.text(`Order Type: ${order.order_type}`, 10, currentY);
    currentY += bodyLeading;

    doc.text(`Payment Type: ${order.payment_type}`, 10, currentY);
    currentY += bodyLeading;

    doc.text(`Total: $${order.total_amt.toFixed(2)}`, 10, currentY);
    currentY += bodyLeading;

    doc.setLineWidth(0.5);
    doc.setLineDash([1, 0.5]);
    doc.line(10, currentY, pageWidth - 10, currentY);
    currentY += bodyLeading;

    const tableData = orderItems.map((item) => [
      item.name +
        ` (${item.size.charAt(0).toUpperCase()})` +
        ` sugar: (${item.sugar_level}%)`,
      `${item.quantity}`,
      `$${item.total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [["Item", "Qty", "Total"]],
      body: tableData,
      theme: "plain",
      styles: {
        fontSize: fontSize,
        font: "Courier",
        cellPadding: 1,
        lineWidth: 0,
        halign: "left",
      },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 10 },
        2: { cellWidth: 20 },
      },
      margin: { left: 10, right: 10 },
    });

    currentY = doc.lastAutoTable.finalY + bodyLeading;

    doc.line(10, currentY, pageWidth - 10, currentY);
    currentY += footerLeading;

    doc.text(`Total: $${order.total_amt.toFixed(2)}`, 10, currentY);
    currentY += footerLeading;

    const footerMessage =
      "Order received. Please proceed to the counter for payment and pickup.";
    doc.text(footerMessage, pageWidth / 2, currentY, {
      align: "center",
      maxWidth: pageWidth - 20,
    });

    doc.save("copyshop-receipt.pdf");

    setPdfGenerated(true); // Mark PDF as generated
  };

  useEffect(() => {
    if (order && orderItems.length > 0 && !pdfGenerated) {
      generatePDF(); // Generate the PDF only if it hasn't been generated yet
    }
  }, [order, orderItems, pdfGenerated, setPdfGenerated]);

  return null;
};

export default ReceiptPrinter;
