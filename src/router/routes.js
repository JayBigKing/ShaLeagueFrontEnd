const startPage = [
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/start',
    name: 'start',
    component: () =>
        import(/* webpackChunkName: "start" */ '../pages/start/start'),
    children: [
      {
        path: 'admit',
        name: 'admit',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/start/admit'
            )
      },
      {
        path: 'choose',
        name: 'choose',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/start/choose'
            )
      }
    ]
  }

]

const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  // {
  //   path: '/',
  //   redirect: '/main'
  // },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'addPlayer',
        name: 'addPlayer',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/addPlayer/addPlayer'
            )
      },
      {
        path: 'ViewOrRenew/view1',
        name: 'view1',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/ViewOrRenew/view1'
            )
      },
      {
        path: 'ViewOrRenew/view2',
        name: 'view2',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/ViewOrRenew/view2'
            )
      },
      {
        path: 'Rank/RankList',
        name: 'RankList',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Rank/RankList'
            )
      },
      {
        path: 'addMatch/addMatchByManager',
        name: 'addMatchByManager',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/addMatch/addMatchByManager'
            )
      },
      {
        path: 'addMatch/addMatchByPlayer',
        name: 'addMatchByPlayer',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/addMatch/addMatchByPlayer'
            )
      },
      {
        path: 'addMatch/addMatchFillRole',
        name: 'addMatchFillRole',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/addMatch/addMatchFillRole'
            )
      }
    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...startPage, ...loginPage, ...mainPage, ...errorPage]
