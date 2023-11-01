import { postMyNotification } from "../core/services/notification"

export const mappingNotification = (type, message, receiver, navigate) => {
    // type : system | post_change | subject_change
    // reveiver: user id
    postMyNotification({
        message: message,
        type: type,
        receiver: receiver,
        navigate: navigate,
        createAt: new Date().toISOString()
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
}