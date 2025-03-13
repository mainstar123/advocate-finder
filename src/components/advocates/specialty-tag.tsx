import { generateColorFromString } from "@/utils/color";
import { Tag } from "antd";
import { useMemo } from "react";

interface SpecialtyTagProps {
  specialty: string;
}
const SpecialtyTag = ({ specialty }: SpecialtyTagProps) => {
  const { backgroundColor, textColor } = useMemo(
    () => generateColorFromString(specialty),
    [specialty],
  );

  return (
    <Tag
      className="whitespace-nowrap"
      style={{
        marginRight: 0,
        backgroundColor,
        color: textColor,
      }}
    >
      {specialty}
    </Tag>
  );
};

export default SpecialtyTag;
