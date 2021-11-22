import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarProvider";

export default function useSnackbar(){
    const {openContext, severityContext, messageContext} = useContext(SnackbarContext)
    const [open, setOpen] = openContext
    const [severity, setSeverity] = severityContext
    const [message, setMessage] = messageContext
    const toast = (type, mess) => {
        setSeverity(type)
        setMessage(mess)
        setOpen(true)
    }

    return {
        toast
    }
}