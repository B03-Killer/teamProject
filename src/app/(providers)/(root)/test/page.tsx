'use client';

import Input from '@/components/Input';
import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Input
        id="password-input"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter password..."
        status="default"
        type="password"
        value={value}
      />
    </div>
  );
};

export default Test;
