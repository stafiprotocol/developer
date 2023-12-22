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
      "/evmlsd/": evmlsd(),
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
      ]
    },
    {
      text: "Architecture",
      collapsed: false,
      items: [
        {text: "Overview", link: "/ethlsd/architecture/overview"},
        {text: "Design Principles", link: "/ethlsd/architecture/designprinciples"},
        {text: "ETH LSD", link: "/ethlsd/architecture/ethlsd"},
        {text: "EVM LSD", link: "/ethlsd/architecture/evmlsd"},
        {text: "Cosmos LSD", link: "/ethlsd/architecture/cosmoslsd"},
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
      text: "DAO",
      collapsed: false,
      items: [
        {text: "Introduction", link: "/ethlsd/dao/introduction"},
      ]
    },
    {
      text: "Security",
      collapsed: false,
      items: [
        {text: "Introduction", link: "/ethlsd/security/introduction"},
        {text: "Audit", link: "/ethlsd/security/audit"},

      ]
    },
    {
      text: "Concepts",
      collapsed: false,
      items: [
        {text: "Introduction", link: "/ethlsd/security/introduction"},
        {text: "Audit", link: "/ethlsd/security/audit"},

      ]
    }
  ]
}

function evmlsd(){
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        {text: "Get Started", link: "/evmlsd/introduction/getstarted"},
        {text: "Liquid Staking Token", link: "/evmlsd/introduction/lst"},
      ]
    },
    {
      text: "Architecture",
      collapsed: false,
      items: [
        {text: "Overview", link: "/evmlsd/architecture/overview"},
        {text: "Contract Framework", link: "/evmlsd/architecture/contract"},
        {text: "Relay", link: "/evmlsd/architecture/relay"},
        {text: "Front", link: "/evmlsd/architecture/front"},
      ]
    },
    {
      text: "Contract Framework",
      collapsed: false,
      items: [
        {text: "Overview", link: "/evmlsd/contract/overview"},
        {text: "ERC20 LST", link: "/evmlsd/contract/lsterc20"},
        {text: "Staking Pool", link: "/evmlsd/contract/stakingpool"},
        {text: "Withdraw", link: "/evmlsd/contract/withdraw"},
      ]
    },
    {
      text: "Security",
      collapsed: false,
      items: [
        {text: "Contract", link: "/evmlsd/security/contract"},
        {text: "Audit", link: "/evmlsd/security/audit"},

      ]
    }
  ]
}
