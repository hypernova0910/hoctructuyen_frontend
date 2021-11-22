import { useContext } from "react";
import { DialogContext } from "../context/DialogProvider";

export default function useDialog(){
    const {openContext, confirmHandlerContext, messageContext, titleContext} = useContext(DialogContext)
    const [open, setOpen] = openContext
    const [confirmHandler, setConfirmHandler] = confirmHandlerContext
    const [message, setMessage] = messageContext
    const [title, setTitle] = titleContext

    const showDialog = (title_, mess_, confirmHandler_) => {
        setTitle(title_)
        setMessage(mess_)
        setConfirmHandler(confirmHandler_)
        setOpen(true)
    }

    return {
        showDialog
    }
}