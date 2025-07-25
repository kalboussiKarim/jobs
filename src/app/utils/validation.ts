export const validateForm = (
  formData: any
): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Required fields validation
  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.dob) {
    errors.dob = "Date of birth is required";
  }

  if (!formData.phone) {
    errors.phone = "Phone number is required";
  } else if (formData.phone.length < 12) {
    errors.phone = "Invalid phone number";
  }

  if (!formData.availability) {
    errors.availability = "Please select your availability";
  }

  // Names validation
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (formData.firstName && !nameRegex.test(formData.firstName)) {
    errors.firstName = "First name must contain only letters";
  }

  if (formData.lastName && !nameRegex.test(formData.lastName)) {
    errors.lastName = "Last name must contain only letters";
  }

  if (
    formData.firstName &&
    formData.lastName &&
    formData.firstName.toLowerCase() === formData.lastName.toLowerCase()
  ) {
    errors.names = "First and last names must be different";
  }

  // Date of birth validation
  if (formData.dob) {
    const enteredDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - enteredDate.getFullYear();
    const m = today.getMonth() - enteredDate.getMonth();
    const d = today.getDate() - enteredDate.getDate();

    if (enteredDate > today) {
      errors.dob = "Date of birth cannot be in the future";
    } else if (age < 17 || (age === 17 && (m < 0 || (m === 0 && d < 0)))) {
      errors.dob = "You must be at least 17 years old";
    } else if (age > 100) {
      errors.dob = "Please enter a valid age (less than 100 years)";
    }
  }

  // LinkedIn URL validation (if provided)
  if (formData.linkedinURL && formData.linkedinURL.trim()) {
    try {
      new URL(formData.linkedinURL);
    } catch {
      errors.linkedinURL = "Please enter a valid URL";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
