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
        path: 'first',
        name: 'first',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/first/First'
            )
      },
      {
        path: 'second/second',
        name: 'second',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/second/Second'
            )
      },
      {
        path: 'Book/BookList',
        name: 'booklist',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Book/BookList'
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