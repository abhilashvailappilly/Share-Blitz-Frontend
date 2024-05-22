import * as Yup from 'yup';

export const EditProfileValidationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    userName: Yup.string()
      .trim()
      .min(4, 'Username must be at least 4 characters')
      .required('User Name is required'),
    mobile: Yup.string()
      .matches(/^\d+$/, 'Mobile must contain only digits')
      .max(10, 'Mobile number only contain ')
      .required('Mobile is required'),
    dob: Yup.date().required('DOB is required'),
    bio: Yup.string().trim().required('Bio is required'),
    description: Yup.string().trim().required('Description is required'),
  });