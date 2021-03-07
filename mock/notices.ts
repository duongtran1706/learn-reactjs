import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'test 14 ',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'test',
      datetime: '2017-08-08',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: 'test',
      datetime: '2017-08-07',
      read: true,
      type: 'notification',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: 'test',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'test',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'test',
      description: 'test',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'test',
      description: 'test',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'test',
      description: 'test',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000009',
      title: 'test',
      description: ' 2017-01-12 20:00 ',
      extra: 'test',
      status: 'todo',
      type: 'event',
    },
    {
      id: '000000010',
      title: 'test',
      description: ' 2017-01- 2017-01-07 ',
      extra: 'test',
      status: 'urgent',
      type: 'event',
    },
  ]);
};

export default {
  'GET /api/notices': getNotices,
};
