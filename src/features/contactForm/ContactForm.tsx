import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Box } from "@mui/material";
import { Contact } from "../../models";
import { contactSchema } from "../../validations";

interface ContactFormProps {
  onSubmit: (data: Contact) => void;
  defaultValues?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(contactSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="First Name*"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Last Name*"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Email*"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Phone Number*"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
