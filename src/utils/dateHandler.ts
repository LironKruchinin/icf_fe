export function convertToDate(dateMill: number | undefined) {
    const date = new Date(dateMill!)
    const missionDate = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds()

    return missionDate
}