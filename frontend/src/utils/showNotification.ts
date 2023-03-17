import { toast } from "react-toastify";

export function showNotification(textMessage: string, typeMessage: string) {
    if (typeMessage === "error") {
        return toast.error(textMessage);
    }

    if (typeMessage === "success") {
        return toast.success(textMessage);
    }
}
