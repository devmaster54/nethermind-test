import React from 'react';
import type { NextPage } from 'next';

import { BaseLayout } from 'layouts';
import { HistoryTable } from '../components';

const Home: NextPage = () => {
  return (
    <BaseLayout maxWidth="lg">
      <HistoryTable />
    </BaseLayout>
  );
};

export default Home;
