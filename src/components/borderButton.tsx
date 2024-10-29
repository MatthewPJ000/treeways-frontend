type Props = {
  title: string;
  onClick?: () => void; // More specific typing for onClick
  icon?: string;
};

export default function BorderButton({ onClick, title }: Props) {
  return (
    <button
      className="flex items-center border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
      onClick={onClick}
    >
     
      {title}
    </button>
  );
}

