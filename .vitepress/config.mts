import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "StaFi LSD Stack",
  description: "Just one click to deploy your LSD",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/image/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ETH LSD', link: '/ethlsd/' },
      { text: 'EVM LSD', link: '/evmlsd/' }
    ],

    sidebar: {
      "/ethlsd/": ethlsd(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})


function ethlsd(){
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {text: "Get Started", link: "/ethlsd/introduction/getstarted"},
        {text: "Ethereum Staking", link: "/ethlsd/introduction/ethstaking"},
        {text: "Liquid Staking Token", link: "/ethlsd/introduction/lst"},
      ]
    },
    {
      text: "Architecture",
      collapsed: false,
      items: [
        {text: "Overview", link: "/ethlsd/architecture/overview"},
        {text: "Contract Framework", link: "/ethlsd/architecture/contract"},
        {text: "Router", link: "/ethlsd/architecture/router"},
        {text: "Realy", link: "/ethlsd/architecture/realy"},
        {text: "Front", link: "/ethlsd/architecture/front"},
      ]
    },
    {
      text: "Contract Framework",
      collapsed: false,
      items: [
        {text: "Overview", link: "/ethlsd/contract/overview"},
        {text: "ERC20 LST", link: "/ethlsd/contract/lsterc20"},
        {text: "Staking Pool", link: "/ethlsd/contract/stakingpool"},
        {text: "Node Operator", link: "/ethlsd/contract/node"},
        {text: "Oracle", link: "/ethlsd/contract/oracle"},
        {text: "Withdraw", link: "/ethlsd/contract/withdraw"},
        {text: "Governance", link: "/ethlsd/contract/governance"},
      ]
    },
    {
      text: "Integration",
      collapsed: false,
      items: [
        {text: "DVT", link: "/ethlsd/integration/dvt"},
        {text: "Chainlink CCIP", link: "/ethlsd/integration/ccip"},
        {text: "Bridge", link: "/ethlsd/integration/bridge"},
      ]
    },
    {
      text: "Security",
      collapsed: false,
      items: [
        {text: "Contract", link: "/ethlsd/security/contract"},
        {text: "Audit", link: "/ethlsd/security/audit"},

      ]
    }
  ]
}
