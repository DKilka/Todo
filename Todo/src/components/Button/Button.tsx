interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

const Button = ({ text = "Button" }: ButtonProps) => {
  return <h1>{text}</h1>;
};

export default Button;
