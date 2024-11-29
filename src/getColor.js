async function getAverageRGB(src) {
    /* https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript */
    return new Promise(resolve => {
        let context = document.createElement('canvas').getContext('2d');
        context.imageSmoothingEnabled = true;

        let img = new Image;
        img.src = src;
        img.crossOrigin = "";

        img.onload = () => {
            context.drawImage(img, 0, 0, 1, 1);
            const data= context.getImageData(0, 0, 1, 1).data.slice(0, 3);
            resolve( {
                    r: data[0],
                    g: data[1],
                    b: data[2]
                }
            )
        };
    });
}

export { getAverageRGB }