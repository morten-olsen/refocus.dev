type PanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Panel: React.FC<PanelProps> = ({ title, children, className }) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export { Panel };
