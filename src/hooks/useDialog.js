import { useContext } from "react";
import { DialogContext } from "../context/DialogProvider";

export default function useDialog(){
    const {openContext, confirmHandlerContext, messageContext, titleContext, buttonsContext} = useContext(DialogContext)
    const [open, setOpen] = openContext
    const [confirmHandler, setConfirmHandler] = confirmHandlerContext
    const [message, setMessage] = messageContext
    const [title, setTitle] = titleContext
    const [buttons, setButtons] = buttonsContext

    const showDialog = (title_, mess_, buttons_) => {
        setTitle(title_)
        setMessage(mess_)
        setButtons(buttons_)
        //setConfirmHandler(confirmHandler_)
        setOpen(true)
    }

    return {
        showDialog
    }
}