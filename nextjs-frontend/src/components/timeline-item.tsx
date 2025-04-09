import { CheckCircle } from 'lucide-react';

export function TimelineItem({
  status,
  datetime,
}: {
  status: string;
  datetime: string;
}) {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-green-400">
        <CheckCircle size={24} />
      </div>

      <div>
        <div className="font-medium">{status}</div>
        <div className="text-gray-400 text-sm">{datetime}</div>
      </div>
    </div>
  );
}
