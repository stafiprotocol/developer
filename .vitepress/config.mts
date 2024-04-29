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
      { text: 'Launch App', link: 'https://stack-test-app.stafi.io/' },
    ],

    sidebar: {
      "/docs/": docs(),
    },

    outline: {
      level: [1,4],
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
        {text: "LRT(Liquid Restaking Token)", link: "/docs/architecture/el_lrt"},
        {text: "EVM LSD", link: "/docs/architecture/evmlsd"},
        {text: "Cosmos LSD", link: "/docs/architecture/cosmoslsd"},
      ]
    },
    {
      text: "Develop(ETH LST)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/developethlsd/getstarted"},
        {text: "Contract", link: "/docs/developethlsd/contract"},
        {text: "Relay", link: "/docs/developethlsd/relay"},
        {text: "Validator", link: "/docs/developethlsd/validator"},
        {text: "Ejector", link: "/docs/developethlsd/ejector"},
        {text: "App", link: "/docs/developethlsd/ethlsdapp"},
        {text: "Validator App", link: "/docs/developethlsd/ethlsd_validator_app"},
        {text: "Deploy", link: "/docs/developethlsd/deploy"},
      ]
    },
    {
      text: "Develop(LRT)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/developlrt/getstarted"},
        {text: "Contract", link: "/docs/developlrt/contract"},
        {text: "Relay", link: "/docs/developlrt/relay"},
        {text: "App", link: "/docs/developlrt/app"},
        {text: "Deploy", link: "/docs/developlrt/deploy"},
      ]
    },
    {
      text: "Develop(COSMOS LST)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/develop_cosmos_lsd/getstarted"},
        {text: "Contract", link: "/docs/develop_cosmos_lsd/contract"},
        {text: "Relay", link: "/docs/develop_cosmos_lsd/relay"},
        {text: "Deploy", link: "/docs/develop_cosmos_lsd/deploy"},
        {text: "ICQ Relay", link: "/docs/develop_cosmos_lsd/icq_relay"},
        {text: "App", link: "/docs/develop_cosmos_lsd/app"},
      ]
    },
    {
      text: "DAO",
      collapsed: true,
      items: [
        {text: "Introduction", link: "/docs/dao/introduction"},
      ]
    },
    {
      text: "Security",
      collapsed: true,
      items: [
        {text: "Introduction", link: "/docs/security/introduction"},
        {text: "Audit", link: "/docs/security/audit"},

      ]
    },
    {
      text: "Concepts",
      collapsed: true,
      items: [
        {text: "Ethereum Staking", link: "/docs/concepts/ethstaking"},
        {text: "LSD & LST", link: "/docs/concepts/lstlsd"},
        {text: "LSAAS", link: "/docs/concepts/lsaas"},
      ]
    }
  ]
}

