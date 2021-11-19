export default {
  sidebarMap: {
    1: {
      main: [
        {
          groupTitle: '分组1'
        },
        {
          path: '/main/addPlayer',
          icon: 'suncaper-menu-unfold',
          title: '添加玩家'
        },
        {
          path: '/main/ViewOrRenew',
          icon: 'suncaper-menu-unfold',
          title: '查看/编辑玩家',
          group: 'second',
          children: [
            {
              path: '/main/ViewOrRenew/view1',
              icon: 'suncaper-menu-unfold',
              title: '查看玩家'
            }
          ]
        },
        {
          path: '/main/Rank',
          icon: 'suncaper-menu-unfold',
          title: '排名',
          group: 'Rank',
          children: [
            {
              path: '/main/Rank/RankList',
              icon: 'suncaper-menu-unfold',
              title: '积分榜'
            }
          ]
        }

      ]
    }
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
