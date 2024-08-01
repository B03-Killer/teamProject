import { useState } from 'react';
import CheckBox from './CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['primary', 'grey'],
      description: '체크박스의 테마 색상',
      defaultValue: 'primary'
    },
    children: {
      control: 'text',
      description: '체크박스 옆에 표시할 텍스트'
    },
    onClick: {
      action: 'clicked',
      description: '체크박스가 클릭될 때 호출되는 함수'
    }
  }
};

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBox
      theme="primary"
      onClick={(newChecked) => setChecked(newChecked)}
      children={checked ? 'Checked' : 'Unchecked'}
    />
  );
};
