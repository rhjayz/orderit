import Cookies from "js-cookie";

export const clearCookies = () => {
     document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        Cookies.remove(name);
    });
};
