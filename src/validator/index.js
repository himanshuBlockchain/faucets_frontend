export const signupValidate = (values) => {
  const re = /\S+@\S+\.\S+/;
  const chars = /^[a-zA-Z\s]+$/;
  const numbers = /[0-9]/;
  const symbols = /[!@#$%^&*()_+{:;"'|/}]/;

  let errors = {};
  // Username validation
  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length < 3) {
    errors.username = "Please write more than 3 charectars";
  } else if (!numbers.test(values.username)) {
    errors.username = "Please write atleast one number";
  } else if (!isNaN(values.username)) {
    errors.username = "Please write atleast one charectar";
  } else if (symbols.test(values.username)) {
    errors.username = "Special charectar not allow";
  }
  // Fist name validation
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.length > 3) {
    errors.name = "Must be at least 3 characters long";
  } else if (!chars.test(values.name)) {
    errors.name = "Please write only charectar";
  }
  // email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Please provide a valid email";
  }
  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Please Write More than 6 charectars";
  } else if (!numbers.test(values.password)) {
    errors.password = "Please write atleast one number";
  } else if (!isNaN(values.password)) {
    errors.password = "Please write atleast one charectar";
  }
  return errors;
};

export const loginValidate = (values) => {
  const re = /\S+@\S+\.\S+/;
  const numbers = /[0-9]/;
  let errors = {};
  // email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Please Write A Valid Email Address";
  }
  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Please Write More than 6 charectars";
  } else if (!numbers.test(values.password)) {
    errors.password = "Please write atleast one number";
  } else if (!isNaN(values.password)) {
    errors.password = "Please write atleast one charectar";
  }
  return errors;
};
export const leadValidate = (values) => {
  const re = /\S+@\S+\.\S+/;
  // const numbers = /[0-9]/;
  let errors = {};
  // email validation
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Please Write A Valid Email Address";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile is required";
  } else if (values.mobile.length < 11) {
    errors.mobile = "Please write valid mobile number";
  } else if (values.mobile.length > 11) {
    errors.mobile = "Please write valid mobile number";
  }
  if (!values.city) {
    errors.city = "City is required";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  if (!values.country) {
    errors.country = "Country is required";
  }
  return errors;
};

export const faucetValidate = (values) => {
  let errors = {};
  if (!values.chain_name) {
    errors.chain_name = "Chain name is required";
  }
  if (!values.website_url) {
    errors.website_url = "Website URL is required";
  }
  return errors;
};

export const walletValidate = (values) => {
  let errors = {};
  if (values.wallet_name === "--Select--") {
    errors.wallet_name = "Wallet name is required";
  }
  if (!values.wallet_name) {
    errors.wallet_name = "Wallet name is required";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  return errors;
};

export const passwordValidate = (values) => {
  // const re = /\S+@\S+\.\S+/;
  const numbers = /[0-9]/;
  let errors = {};
  // Password validation
  if (!values.current_password) {
    errors.current_password = "Password is required";
  } else if (values.current_password.length < 6) {
    errors.current_password = "Please Write More than 6 charectars";
  } else if (!numbers.test(values.current_password)) {
    errors.current_password = "Please write atleast one number";
  } else if (!isNaN(values.current_password)) {
    errors.current_password = "Please write atleast one charectar";
  }
  // new Password validation
  if (!values.new_password) {
    errors.new_password = "Password is required";
  } else if (values.new_password.length < 6) {
    errors.new_password = "Please Write More than 6 charectars";
  } else if (!numbers.test(values.new_password)) {
    errors.new_password = "Please write atleast one number";
  } else if (!isNaN(values.new_password)) {
    errors.new_password = "Please write atleast one charectar";
  }
  return errors;
};

export const forgotPasswordValidate = (values) => {
  const re = /\S+@\S+\.\S+/;
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Please Write A Valid Email Address";
  }
  return errors;
};
export const resetPasswordValidate = (values) => {
  const numbers = /[0-9]/;
  let errors = {};
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Please Write More than 6 charectars";
  } else if (!numbers.test(values.password)) {
    errors.password = "Please write atleast one number";
  } else if (!isNaN(values.password)) {
    errors.password = "Please write atleast one charectar";
  }
  return errors;
};
