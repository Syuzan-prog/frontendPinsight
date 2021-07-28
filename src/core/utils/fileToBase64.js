const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Can\'t convert file to base64'));
});

export default fileToBase64;
