interface InputProps {
  labelFor: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onPress?: (e: any) => void;
  onChange?: (e: any) => void;
}

const Input = ({
  labelFor,
  type = "text",
  placeholder,
  value,
  className,
  onChange,
  onPress,
}: InputProps) => {
  return (
    <label htmlFor={labelFor}>
      <input
        type={type}
        readOnly={type === "text" ? false : true}
        id={labelFor}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        onKeyDown={onPress}
      />
    </label>
  );
};

export default Input;
