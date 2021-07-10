import { formatDistanceStrict } from "date-fns";
import moment, { DurationInputArg2 } from "moment";

export default function calcStops(time: string, starship_mglt: number, mglt_searched: number){
    const calcHours = mglt_searched/starship_mglt;

    const [ quantity, unit ] = time.split(' ');

    const [ hours ] = formatDistanceStrict(new Date(moment().add(quantity, unit as DurationInputArg2).toISOString()), new Date(), {
        unit: 'hour'
    }).split(' ');

    return Math.round(calcHours/Number(hours));
}