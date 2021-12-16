const router = [
  {
    text: '基础',
    collapsable: false,
    children: [{ text: '快速开始', link: '/router/' }]
  },
  {
    text: '配置器',
    collapsable: false,
    children: [
      { text: 'Token', link: '/router/tokenizer/' },
      { text: 'Router Matcher', link: '/router/matcher/' }
    ]
  }
]

module.exports = {
  title: 'Vue',
  description: 'Vue 学习笔记',
  themeConfig: {
    repo: 'jolylai/notebook-vue-router-next',
    editLinks: true,
    smoothScroll: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'docs',
    sidebarDepth: 2,
    nav: [
      {
        text: 'Vue Router',
        link: '/router/matcher/',
        activeMatch: '^/router/'
      },
      {
        text: '官网',
        link: 'https://next.router.vuejs.org/zh/guide/'
      }
    ],
    sidebar: {
      '/router/': router
    }
  },
  markdown: {
    lineNumbers: false
  }
}
