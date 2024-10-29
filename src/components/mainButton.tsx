
type Props = {
  title?: string;
  onClick?: () => void; // More specific typing for onClick
};

export default function MainButton({ onClick, title }: Props) {
  return (
    <button
      className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
