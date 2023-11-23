const valid = ({ fullname, username, email, password, cf_password }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Please provide your full name.";
  } else if (fullname.length > 25) {
    err.fullname = "Full name must be 25 characters or less.";
  }

  if (!username) {
    err.username = "Please provide a username.";
  } else if (username.replace(/ /g, '').length > 25) {
    err.username = "Username must be 25 characters or less.";
  }

  if (!email) {
    err.email = "Please provide an email address.";
  }

  if (!password) {
    err.password = "Please provide a password.";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters long.";
  }

  if (password !== cf_password) {
    err.cf_password = "Passwords do not match.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export default valid;
