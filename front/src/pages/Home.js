import {useDispatch, useSelector} from 'react-redux';
import {me} from "../features/auth/AuthSlice";
import {useEffect, useState} from "react";
import CardComponent from "../components/CardComponent";
import socket from '../socket';
import {getAllUsers} from "../features/users/UserSlice";


const Home = () => {
    const dispatch = useDispatch();
    const {loading, user} = useSelector((state) => state.auth);
    const conversations = [
        {
            name: 'User 1',
            lastMessage: 'Hey, how are you?',
            avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
        },
    ];

    let [messages, setMessage] = useState([
        {
            name: 'User 1',
            sentByUser: false,
            description: 'Hey, how are you?',
            time: '12 mins ago',
            avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
        },
        {
            name: 'You',
            sentByUser: true,
            description: 'Hey, how are you?',
            time: '12 mins ago',
            avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
        }
    ]);

    const [messageToSend, setMessageToSend] = useState('');

    useEffect(() => {
        dispatch(me());
        dispatch(getAllUsers());
    }, []);


    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('chat message', (msg) => {
            if (msg) {
                setMessage(prev => [...prev, {
                    name: msg._id == user?._id ? 'You' : msg.username,
                    sentByUser: msg._id == user?._id,
                    description: msg._id == user?._id ? messageToSend : msg.description,
                    time: '12 mins ago',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                }])
            }
            setMessageToSend('');
        });

        // Clean up the listener when the component unmounts
        return () => {
            socket.off('chat message');
        };

    }, [messageToSend, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat message', {...user, description: messageToSend});
    }

    const handleChange = (e) => {
        setMessageToSend(e.target.value);
    }

    if (loading) {
        return (
            <div>
                loadingg...
            </div>
        )
    }
    return (
        <div>
            <CardComponent
                title="Recent Conversations"
                conversations={conversations}
                messages={messages}
                activeConversation="User 1" // Example of setting an active conversation
            />

            <div className="container">
                <form className="text-lg-end">
                    <div className="form-group mb-2">
                        <input className="form-control" value={messageToSend} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={handleSubmit}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Home;
