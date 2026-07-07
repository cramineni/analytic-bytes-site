// Maps a lever status to a badge style. Keep these in sync with the
// accepted_values test in the pipeline's models/schema.yml — an unknown
// badge falls back to amber.

const CLASS: Record<string, string> = {
  "Number moved": "bg-[#E8F4E8] text-[#1E5F1E] border-[#B8DAB8]",
  "Moved where deployed": "bg-[#FFF3E0] text-[#7A4F00] border-[#F0D090]",
  "Average moved, gap didn't": "bg-[#FFF3E0] text-[#7A4F00] border-[#F0D090]",
  "The data is the decision": "bg-[#E5F1F9] text-[#0F2A4A] border-[#B8D4E8]",
};

export default function StatusBadge({ label }: { label: string }) {
  const cls = CLASS[label] ?? "bg-[#FFF3E0] text-[#7A4F00] border-[#F0D090]";
  return (
    <span
      className={`inline-block text-[11.5px] font-mono tracking-[0.04em] uppercase px-2 py-1 rounded-sm border ${cls}`}
    >
      {label}
    </span>
  );
}
