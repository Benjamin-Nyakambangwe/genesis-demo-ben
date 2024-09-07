interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}
