import { Banknote, CreditCard, QrCode } from "lucide-react";

const transactionMethods = [
  { name: "Cash", icon: Banknote },
  { name: "Credit/Debit Card", icon: CreditCard },
  { name: "Gcash", icon: QrCode },
];

export function TransactionMethodSelector({
  selectedMethod,
  onSelectMethod,
}: {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}) {
  return (
    <div className="my-2 grid grid-cols-3 gap-2">
      {transactionMethods.map((method) => {
        const Icon = method.icon;
        return (
          <div
            key={method.name}
            className={`} cursor-pointer border-gray-400 text-center`}
            onClick={() => onSelectMethod(method.name)}
          >
            <div
              className={`flex justify-center rounded-xl border py-4 ${selectedMethod === method.name ? "bg-neutral-900 text-neutral-50" : ""}`}
            >
              <Icon />
            </div>
            <p className="mt-1 text-xs font-semibold">{method.name}</p>
          </div>
        );
      })}
    </div>
  );
}
