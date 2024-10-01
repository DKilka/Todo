interface CheckboxProps {
  labelFor: string;
  isChecked: boolean;
  className?: string;
  onChange: (e: any) => void;
}

const Checkbox = ({
  labelFor,
  isChecked,
  className,
  onChange,
}: CheckboxProps) => {
  return (
    <label htmlFor={labelFor}>
      <input
        type="checkbox"
        className={className}
        defaultChecked={isChecked}
        id={labelFor}
        onChange={onChange}
      />
    </label>
  );
};

export default Checkbox;
