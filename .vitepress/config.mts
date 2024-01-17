import { defineConfig } from 'vitepress'
import imageFigures from 'markdown-it-image-figures';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "StaFi LSD Stack",
  description: "Just one click to deploy your LSD",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/docs/introduction/getstarted' },
      { text: 'Website', link: 'https://stafi.io' },
    ],

    sidebar: {
      "/docs/": docs(),
    },

    outline: {
      level: [1,3],
      // label: 'Contents',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stafiprotocol/developer' }
    ],
  },
  markdown: {
    config: (md) => {
      md.use(imageFigures, {
        figcaption: 'title',
        copyAttrs: '^class$',
      });
    },
  },
})


function docs(){
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {text: "Get Started", link: "/docs/introduction/getstarted"},
        {text: "New to LSD Stack", link: "/docs/introduction/newtostack"},
      ]
    },
    {
      text: "Architecture",
      collapsed: false,
      items: [
        {text: "Overview", link: "/docs/architecture/overview"},
        {text: "Design Principles", link: "/docs/architecture/designprinciples"},
        {text: "ETH LSD", link: "/docs/architecture/ethlsd"},
        {text: "EVM LSD", link: "/docs/architecture/evmlsd"},
        {text: "Cosmos LSD", link: "/docs/architecture/cosmoslsd"},
      ]
    },
    {
      text: "Develop(ETH LST)",
      collapsed: false,
      items: [
        {text: "Get Started", link: "/docs/developethlsd/getstarted"},
        {text: "Contract", link: "/docs/developethlsd/contract"},
        {text: "Relay", link: "/docs/developethlsd/relay"},
        {text: "Validator", link: "/docs/developethlsd/validator"},
        {text: "Ejecter", link: "/docs/developethlsd/ejecter"},
        {text: "App", link: "/docs/developethlsd/ethlsdapp"},
        {text: "Deploy", link: "/docs/developethlsd/deploy"},
      ]
    },
    {
      text: "DAO",
      collapsed: false,
      items: [
        {text: "Introduction", link: "/docs/dao/introduction"},
      ]
    },
    {
      text: "Security",
      collapsed: false,
      items: [
        {text: "Introduction", link: "/docs/security/introduction"},
        {text: "Audit", link: "/docs/security/audit"},

      ]
    },
    {
      text: "Concepts",
      collapsed: false,
      items: [
        {text: "Ethereum Staking", link: "/docs/concepts/ethstaking"},
        {text: "LSD & LST", link: "/docs/concepts/lstlsd"},
        {text: "LSAAS", link: "/docs/concepts/lsaas"},
      ]
    }
  ]
}

