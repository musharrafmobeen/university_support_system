import React, { useEffect, useState } from 'react';
import moment from "moment";
import { TextField, Typography, withStyles } from '@material-ui/core';
import styles from '../../../styles/studentStyles/staffCardsStyles/MessagesStyles';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { drawerSelectionChanged } from '../../../store/ui/drawer';
import { addChat, loadChats } from '../../../store/chats/chats';
import { ChatFeed, Message } from 'react-chat-ui'


function StaffMessages(props) {
    const { classes } = props;

    const staffId = props.match.params.id;

    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const chats = useSelector(state => state.entities.chats.list);
    const chatsLoading = useSelector(state => state.entities.chats.loading);
    const chatsErr = useSelector(state => state.entities.chats.isError);
    const chatsErrMsg = useSelector(state => state.entities.chats.errorMessage);
    const currentUser = useSelector(state => state.auth.user);

    const isLoading = chatsLoading;

    useEffect(() => {
        dispatch(drawerSelectionChanged("Staff"));
        if (chats.length === 0) dispatch(loadChats());
    }, []);

    const getConcernedMessages = (userId, userType, sender, reciever) => {
        if (userType === "sender") {
            const index = chats.findIndex(chat => chat.sender === userId && chat.reciever === reciever);
            if (chats[index]) return chats[index].message
            return [];
        }
        if (userType === "reciever") {
            const index = chats.findIndex(chat => chat.reciever === userId && chat.sender === sender);
            if (chats[index]) return chats[index].message
            return [];
        }
    }
    const getSenderMessages = (id, recieverId) => {
        const index = chats.findIndex(chat => chat.sender === id && chat.reciever === recieverId);
        if (chats[index]) return chats[index].message
        return [];
    };

    const getConcernedChats = () => {
        if (Object.keys(currentUser).length !== 0) {
            // const recieverMessages = getConcernedMessages(staffId, "reciever", currentUser._id, null);
            // const senderMessages = getConcernedMessages(currentUser._id, "sender", null, staffId);
            const recieverMessages = getSenderMessages(staffId, currentUser._id);
            const senderMessages = getSenderMessages(currentUser._id, staffId);
            const recievedList = recieverMessages.map(msg => ({
                flag: 1,
                ...msg
            }));
            const sentList = senderMessages.map(msg => ({
                flag: 0,
                ...msg
            }));

            console.log("RecievedList", recievedList);
            console.log("SentList", sentList);

            const chatList = [...recieverMessages, ...senderMessages];
            return chatList.slice().sort(function (a, b) {
                var dateA = new Date(a.sendTime), dateB = new Date(b.sendTime);
                return dateA - dateB;
            });
            // console.log("chatList", chatList);
            // if (chatList) return chatList;
            // return [];
        }
    };

    const renderChat = () => {
        const chat = getConcernedChats();
        console.log("Chat", chat)
        if (!chat) return;
        if (chat && chat.length === 0) return;
        // const list = chat.map(msg => (
        //     <div key={msg.sendTime} className={`${msg.flag === 1 ? classes.leftAligned : classes.rightAligned}`}>
        //         <Typography>{msg.text}</Typography>
        //         <Typography>{msg.sendTime}</Typography>
        //     </div>
        // ));
        const list = chat.map(msg => (
            new Message(
                {
                    id: msg.flag,
                    message: msg.text
                }
            )
        ));
        return list;
        // const chat = getConcernedChats();
    };

    const handleMessageChange = e => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message !== "") {
            const chat = {
                sender: currentUser._id,
                reciever: staffId,
                message,
                flag: 0
            };
            dispatch(addChat(chat)).then(
                dispatch(loadChats())
            ).then(
                () => {
                    setMessage("");
                    dispatch(loadChats());
                }
            );
        }
    }

    return (
        <div>
            {
                !isLoading && <>
                    <div className={classes.chatBox}>
                        {/* {
                    chats.length !== 0 && <div className={classes.chat}>
                        {renderChat()}
                    </div>
                } */}
                        {
                            chats.length !== 0 && <div>
                                <ChatFeed
                                    messages={renderChat()|| []} // Array: list of message objects
                                    isTyping={false} // Boolean: is the recipient typing
                                    hasInputField={false} // Boolean: use our input, or use your own
                                    showSenderName // show the name of the user who sent the message
                                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                                    // JSON: Custom bubble styles
                                    bubbleStyles={
                                        {
                                            text: {
                                                fontSize: "normal"
                                            },
                                            chatbubble: {
                                                borderRadius: 12,
                                                padding: "4%"
                                            }
                                        }
                                    }
                                />
                            </div>
                        }
                        <div className={classes.messageInput}>
                            <TextField
                                vlaue={message}
                                onChange={handleMessageChange}
                                placeholder="Type..."
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                            <SendIcon
                                className={classes.sendIcon}
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default withStyles(styles)(StaffMessages);