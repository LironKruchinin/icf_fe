export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.parse(value))
}

export function getLocalStorage(key: string) {
    const value = localStorage.getItem(key)

    return JSON.stringify(value)
}