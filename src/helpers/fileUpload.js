export const imageUpload = async (files) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dipooylqu/upload';
    const uploadPromises = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'syncpro');

        const uploadPromise = fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => data.secure_url) 
            .catch(error => {
                console.error(error);
                return null; 
            });

        uploadPromises.push(uploadPromise);
    }

    try {
        const uploadedUrls = await Promise.all(uploadPromises);
        return uploadedUrls;
    } catch (e) {
        throw e;
    }
};

