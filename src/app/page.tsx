"use client";

import AdvocatesTableContainer from "@/containers/advocates-table-container";
import ThemeToggleButton from "@/components/shared/theme-toggle-button";
import { Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const { Title } = Typography;

export default function Home() {
  return (
    <main className="p-6" aria-live="polite">
      <div>
        <Title level={2} style={{ marginBottom: 0 }}>
          Solace Advocates
        </Title>
        <ThemeToggleButton />
      </div>
      <Paragraph className="text-gray-600 max-w-2xl mb-0">
        Find expert advocates for compassionate support and guidance.
      </Paragraph>
      <div className="w-full overflow-x-auto">
        <AdvocatesTableContainer />
      </div>
    </main>
  );
}
