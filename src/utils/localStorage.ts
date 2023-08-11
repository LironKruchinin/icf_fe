export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key: string) {
    const value = localStorage.getItem(key)

    if (value) {
        return JSON.parse(value)
    } else {
        return null
    }

}

export function removeLocalStorageKey(key: string) {
    localStorage.removeItem(key)
}