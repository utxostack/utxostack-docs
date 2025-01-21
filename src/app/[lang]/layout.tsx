import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { PropsWithChildren } from "react";
import "nextra-theme-docs/style.css";
import LogoIcon from "@/assets/logo-with-text.svg?svgr";

import { importPage } from "nextra/pages";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>;
}) {
  try {
    const params = await props.params;
    const { metadata } = await importPage(params.mdxPath, params.lang);
    const image = "/preview.png";
    const title = `UTXOStack Docs - ${metadata.title}`;
    const description =
      "⚡️The Decentralized Liquidity Staking Layer for Hybrid Lightning Network ⚡️";
    return {
      ...metadata,
      title,
      description,
      icons: [
        {
          rel: "icon",
          url: "/logo.svg",
        },
      ],
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@utxostack",
        images: [image],
      },
      openGraph: {
        title,
        description,
        url: "https://utxostack.network",
        images: [image],
      },
    };
  } catch {
    const description =
      "⚡️The Decentralized Liquidity Staking Layer for Hybrid Lightning Network ⚡️";
    return {
      title: "UTXOStack Docs",
      description,
    };
  }
}

const navbar = <Navbar logo={<LogoIcon width={105} height={40} />} />;

const footer = <Footer>MIT {new Date().getFullYear()} © UTXOStack</Footer>;

export default async function RootLayout(
  props: PropsWithChildren<{ params: Promise<{ lang: string }> }>,
) {
  const params = await props.params;
  const { lang } = params;
  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap(`/${lang}`).catch(() => notFound())}
          footer={footer}
          i18n={[
            { locale: "en", name: "English" },
            { locale: "zh-TW", name: "繁体中文" },
            { locale: "zh-CN", name: "简体中文" },
            { locale: "kr", name: "한국어" },
          ]}
        >
          {props.children}
        </Layout>
      </body>
    </html>
  );
}
