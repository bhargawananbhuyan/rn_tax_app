import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(advancedFormat)

export default function dateFormat(timestamp: string) : string {
    return dayjs(timestamp).format("MMMM Do, YYYY")
}