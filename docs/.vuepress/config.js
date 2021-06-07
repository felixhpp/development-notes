module.exports = ctx => ({
  title: '临床科研数据管理文档',
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.ico'
    }]
  ],
  description: '临床科研数据管理文档',
  // theme: '@vuepress/theme-default',
  theme: 'antdocs',
  themeConfig: {
    logo: '/logo.png',
    nav: [{
      text: '首页',
      link: '/'
    }, {
      text: '规范',
      link: '/guide/'
    }, {
      text: '系统',
      items: [{
        text: '探索系统',
        link: '/csmsearch/'
      }, {
        text: '表单设计器',
        link: '/formmaker/'
      }]
    }, {
      text: 'GitLab',
      link: 'http://111.205.6.237:8000/',
      target: '_blank'
    }, ],
    sidebar: {
      '/formmaker/': [
        '', /* /foo/ */
        'test/one', /* /foo/one.html */
        'test/two' /* /foo/two.html */
      ],

      '/guide/': [
        '',
        '开发环境配置',
        '开发规范',
        '数据库规范',
        '目录结构',
        '配置',
        '启动运行',
        '打包和部署',
        '常见问题'
      ],

      // // fallback
      // '/': [
      //   '',        /* / */
      //   'contact', /* /contact.html */
      //   'about'    /* /about.html */
      // ]
    }
  },
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top'
  ]
})