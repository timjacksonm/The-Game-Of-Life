interface ButtonProps {
  children: React.ReactNode;
  name: string;
  color?: string;
  clickHanlder: () => void;
  disabled?: boolean;
}

const Button = ({ children, name, color, clickHanlder, disabled }: ButtonProps) => (
  <button
    className={`${color} flex w-full items-center justify-center rounded-md font-bold hover:bg-gray-700 hover:text-white disabled:text-slate-500`}
    onClick={clickHanlder}
    disabled={disabled}
  >
    {children}
    <p className='ml-2'>{name}</p>
  </button>
);

export default Button;
