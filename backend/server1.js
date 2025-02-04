// !(function () {
    const socketIO = require('socket.io');
    'use strict';
    let forumIo;
    const io = socketIO({
        path: "/forum",
        serveClient: false,
    }), socketUtil = {
        socketIoConnection: async function (server) {
            io.attach(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                },
                pingInterval: 10000,
                pingTimeout: 5000,
                cookie: false
            });
            io.on("connection", async (socket) => {
                await socket.on("join-discussion", async (data) => {
                    let discussion_id = 'discussion-' + data.discussionId || null
                    console.log('join-discussion', discussion_id);
                    if (discussion_id) {
                        await socket.join(discussion_id);
                    }
                });
            });
            forumIo = io
        },
        emitMessageToForum: async (room_id, response) => {
            try {
                console.log('get-message', room_id);
                await forumIo.to(room_id).emit("get-message", response);
            } catch (err) {
                console.log(err)
            }
        },
        emitLikeCountToForum: async (room_id, response) => {
            try {
                await forumIo.to(room_id).emit("get-like-count", response);
            } catch (err) {
                console.log(err)
            }
        }
    }
    module.exports = socketUtil;
// })();
 
/* !(function () {
    'use strict';
    const DiscussionCommentsModel = require('../models/DiscussionComments');
    var socketUtil = {
        connect : async function (socket) {
            const params = socket.handshake.query;
            socket.on('create-discussion-comments', (reqData) => {
                DiscussionCommentsModel.createDiscussionComments(reqData, async function (err, newdiscComment) {
                    if (err) {
                        socket.emit('error-comment', err);
                    } else {
                        socket.emit('success-discussion-comment', newdiscComment);
                    }
                });
            });
 
            socket.on('like-discussion-comment', (reqData) => {
                DiscussionCommentsModel.likeDiscussionComment(reqData, async function (err, newdiscLike) {
                    if (err) {
                        socket.emit('error-comment', err);
                    } else {
                        if(newdiscLike){
                            socket.emit('success-discussion-like', newdiscLike);
                        }
                    }
                });
            });
        }
    }
    module.exports = socketUtil;
})();*/
 