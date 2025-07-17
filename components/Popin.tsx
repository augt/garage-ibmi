interface PopinProps extends React.PropsWithChildren {
  onClose: () => void;
}

export default function Popin({ onClose, children }: PopinProps) {
  return (
    <div className="bg-[rgb(0,0,0)]/[.6] fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="relative p-3 bg-white">
        <div className="flex justify-end">
          <button onClick={onClose} className="hover:cursor-pointer">
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
