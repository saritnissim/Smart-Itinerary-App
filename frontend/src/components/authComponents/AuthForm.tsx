import { useState } from "react";
import { TextField, Button } from "@mui/material";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  formTitle: string;
}

const AuthForm = ({ onSubmit, formTitle }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>{formTitle}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email, password);
        }}
      >
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          {formTitle}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
