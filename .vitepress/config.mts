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
    search: {
      provider: 'local'
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
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
  ],
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
        {text: "BTC LSD", link: "/docs/architecture/babylon_btc_lsd"},
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
      text: "Develop(BTC LSD)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/develop_btc_lsd/getstarted"},
        {text: "Contract", link: "/docs/develop_btc_lsd/contract"},
        {text: "Relay", link: "/docs/develop_btc_lsd/relay"},
        {text: "App", link: "/docs/develop_btc_lsd/btc_lsd_app"},
        {text: "Deploy", link: "/docs/develop_btc_lsd/deploy"},
      ]
    },
    {
      text: "Develop(Solana LSD)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/develop_sol_lsd/getstarted"},
        {text: "Contract", link: "/docs/develop_sol_lsd/contract"},
        {text: "Relay", link: "/docs/develop_sol_lsd/relay"},
        {text: "App", link: "/docs/develop_sol_lsd/lsd_app"},
        {text: "Deploy", link: "/docs/develop_sol_lsd/deploy"},
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
      text: "Develop(EVM LSD)",
      collapsed: true,
      items: [
        {text: "Get Started", link: "/docs/develop_evm_lsd/getstarted"},
        {text: "Contract", link: "/docs/develop_evm_lsd/contract"},
        {text: "Relay", link: "/docs/develop_evm_lsd/relay"},
        {text: "App", link: "/docs/develop_evm_lsd/evm_lsd_app"},
        {text: "Deploy", link: "/docs/develop_evm_lsd/deploy"},
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
      text: "Modules",
      collapsed: true,
      items: [
        {text: "Introduction", link: "/docs/modules/introduction"},
        {text: "Validator Selection AI Agent", link: "/docs/modules/validator_selection_ai_agent"},
        {text: "Point System", link: "/docs/modules/point_system"},
        {text: "Frontend", link: "/docs/modules/frontend"},
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

