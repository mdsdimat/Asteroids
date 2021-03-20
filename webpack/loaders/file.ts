const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|mp3|gif|eot|woff2?|ttf)$/;

export default {
    client: {
        loader: 'file-loader',
        test: fileRegex,
    },
    server: {
        loader: 'null-loader',
        test: fileRegex,
    },
};
