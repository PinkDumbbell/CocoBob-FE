/* eslint-disable arrow-body-style */
import { rest } from 'msw';

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_BASE_URL}/v1/users/email`, (req, res, ctx) => {
    const email = req.url.searchParams.get('email');
    if (email !== 'duplicated@email.com')
      return res(
        ctx.json({
          status: 200,
          message: '사용할 수 있는 이메일입니다.',
        }),
        ctx.status(200),
      );

    return res(
      ctx.json({
        status: 409,
        message: '해당 이메일을 가진 사용자가 존재합니다.',
      }),
      ctx.status(409),
    );
  }),
];
