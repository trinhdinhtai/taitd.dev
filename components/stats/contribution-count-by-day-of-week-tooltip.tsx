import { TooltipProps } from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

export default function ContributionCountByDayOfWeekToolTip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload?.length) {
    return (
      <div className="w-fit max-w-[250px] rounded-md border bg-background p-4 text-sm text-black shadow-lg dark:text-gray-200">
        <p className="label">
          <span className="font-medium">Day :</span> {payload[0].payload.day}
        </p>
        <p className="desc">
          <span className="font-medium">Commit Count :</span> {payload[0].value}
        </p>
      </div>
    )
  }

  return null
}
