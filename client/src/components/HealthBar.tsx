import { HeartPulse } from "lucide-react";

interface HealthBarProps {
  health: number;
}

function getHealthColor(health: number): string {
  if (health >= 70) return "bg-[#3f7d56]";
  if (health >= 40) return "bg-[#e67e22]";
  return "bg-[#b94a32]";
}

export function HealthBar({ health }: HealthBarProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-bold text-[#765b4b]">
          <HeartPulse aria-hidden="true" size={15} />
          Salud
        </span>
        <span className="font-bold text-[#38251d]">{health}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-[#eaded3]"
        role="progressbar"
        aria-label={`Salud: ${health}%`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={health}
      >
        <div
          className={`h-full rounded-full ${getHealthColor(health)}`}
          style={{ width: `${health}%` }}
        />
      </div>
    </div>
  );
}
