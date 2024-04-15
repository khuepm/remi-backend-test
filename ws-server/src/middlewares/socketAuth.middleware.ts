const wrapSocket = middleware => (socket, next) => middleware(socket, {}, next);

export default wrapSocket;
