"use client";

import { ConfigProvider } from "antd";

/** Shared sizing for admin controls, including Ant Design portals. */
export default function AdminUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={{
      token: { controlHeight: 40, controlHeightSM: 32, controlHeightLG: 44, borderRadius: 10, fontSize: 14 },
      components: {
        Button: { fontWeight: 500, paddingInline: 16 },
        Table: { cellPaddingBlock: 16, cellPaddingInline: 20 },
        Form: { itemMarginBottom: 24, labelFontSize: 14 },
      },
    }}>
      {children}
    </ConfigProvider>
  );
}
