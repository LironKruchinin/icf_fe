import Cookies from "js-cookie";

export function setCookie(name: string, value: any, time?: number) {
    Cookies.set(name, value, { expires: time })
}

export function getCookie(name: string) {
    return Cookies.get(name)
}

export function removeCookie(name: string) {
    Cookies.remove(name)
}