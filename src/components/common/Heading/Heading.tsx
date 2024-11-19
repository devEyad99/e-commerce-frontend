import { memo } from "react";

const Heading = memo(
  ({ title }: { title: string }) => {
    
    return (
      <h2 className="mb-3 text-xl" style={{ fontSize: "26px" }}>
        {title}
      </h2>
    );
  },
  (prevProps, nextProps) => prevProps.title === nextProps.title // Prevent re-renders if title is unchanged
);

export default Heading;
