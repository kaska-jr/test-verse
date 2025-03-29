export const emailValidationRules = {
  required: {
    value: true,
    message: "Email is required",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

export const passwordValidationRules = {
  required: {
    value: true,
    message: "Password is required",
  },
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

export const nameValidationRules = {
  required: {
    value: true,
    message: "Full name is required",
  },
};

export const phoneValidationRules = {
  required: {
    value: true,
    message: "Phone number is required",
  },
};
