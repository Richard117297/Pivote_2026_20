import { HeartPulse } from "lucide-react";

interface HealthBarProps {
  health: number;
}

function getHealthColor(health: number): string {
  if (health >= 70) return "from-emerald-400 to-green-300";
  if (health >= 40) return "from-amber-400 to-yellow-300";
  return "from-rose-500 to-orange-400";
}

export function HealthBar({ health }: HealthBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-slate-400">
          <HeartPulse aria-hidden="true" size={15} />
          Salud
        </span>
        <span className="font-mono font-bold text-slate-100">{health}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={`Salud: ${health}%`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={health}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getHealthColor(health)}`}
          style={{ width: `${health}%` }}
        />
      </div>
    </div>
  );
}
