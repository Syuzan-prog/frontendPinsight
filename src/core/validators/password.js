const passwordRegexp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const validate = (password) => passwordRegexp.test(password);

export default validate;
