import client from '@sanity/client';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import config from './config';

export default client({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: true,
});
