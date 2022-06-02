const service = callBack => {
  axios.post(
    this.router.uploadCopyrightFile.path,
    {},
    {
      headers: {
        Authorization: "",
        "Content-Type": "application/json"
      },
      onUploadProgress: p => {
        if (callBack) callBack(p);
      }
    }
  );
};
