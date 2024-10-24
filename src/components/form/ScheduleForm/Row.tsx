interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function Row({ icon, children, className }: Props) {
  return (
    <div className={`mb-4 ${className ? className : ''}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center w-4">{icon}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
