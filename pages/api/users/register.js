import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from '../../../utility/config';
import { signToken } from '../../../utility/auth';
import client from '../../../utility/client';

const handler = nc();

handler.post(async (req, res) => {
  const projectId = config.projectId;

  const dataset = config.dataset;

  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    res.status(401).send({ message: 'User already exists' });
  }

  const createMutation = [
    {
      create: {
        _type: 'user',
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutation },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );

  const userId = data.results[0].id;

  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };

  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
