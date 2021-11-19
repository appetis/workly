const mockUser = () => {
  return {
    code: 200,
    message: 'Found the user',
    user: {
      id: 2,
      email: 'hyewon@workly.page',
      status: 'VE',
      createdAt: '2021-10-27T19:57:40.251Z',
      updatedAt: '2021-10-27T19:57:40.251Z',
      Profile: {
        name: 'Hyewon Kim',
        avatar: '',
        department: 'IT',
        position: 'Developer',
        phone: '222-222-2222',
        phone_ext: '222',
        status: 'OF',
        statusName: 'In office',
      },
    },
  }
}
const mockUserWithAvatar = () => {
  return {
    code: 200,
    message: 'Found the user',
    user: {
      id: 2,
      email: 'hyewon@workly.page',
      status: 'VE',
      createdAt: '2021-10-27T19:57:40.251Z',
      updatedAt: '2021-10-27T19:57:40.251Z',
      Profile: {
        name: 'Hyewon Kim',
        avatar:
          'https://www.cnet.com/a/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg',
        department: 'IT',
        position: 'Developer',
        phone: '222-222-2222',
        phone_ext: '222',
        status: 'OF',
        statusName: 'In office',
      },
    },
  }
}
const mockTeams = () => {
  return {
    code: 200,
    message: 'Success',
    team: {
      id: 1,
      name: 'Appetis',
      status: 'VE',
      createdAt: '2021-10-30T19:57:40.490Z',
      updatedAt: '2021-10-30T19:57:40.490Z',
      members: [
        {
          id: 1,
          email: 'wonho@workly.page',
          status: 'VE',
          createdAt: '2021-10-26T19:57:40.185Z',
          updatedAt: '2021-10-26T19:57:40.185Z',
          Profile: {
            name: 'Wonho Lee',
            avatar: '',
            department: 'IT',
            position: 'Developer',
            phone: '111-111-1111',
            phone_ext: '111',
            status: 'OF',
            statusName: 'In office',
          },
        },
        {
          id: 2,
          email: 'hyewon@workly.page',
          status: 'VE',
          createdAt: '2021-10-27T19:57:40.251Z',
          updatedAt: '2021-10-27T19:57:40.251Z',
          Profile: {
            name: 'Hyewon Kim',
            avatar:
              'https://www.cnet.com/a/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg',
            department: 'IT',
            position: 'Developer',
            phone: '222-222-2222',
            phone_ext: '222',
            status: 'WH',
            statusName: 'Work from home',
          },
        },
      ],
    },
  }
}

export { mockUser, mockUserWithAvatar, mockTeams }
