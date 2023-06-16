type RowProps = {
  title: string;
};

const Row: React.FC<RowProps> = ({ title }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

export { Row };
