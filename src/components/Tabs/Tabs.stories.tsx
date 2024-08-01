import { Tab, TabProps, Tabs } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { Tab },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Tab 컴포넌트만 들어갈 수 있습니다.'
    }
  }
};

export const Default = (args: TabProps) => (
  <Tabs {...args}>
    <Tab {...args} active>
      사진・동영상
    </Tab>
    <Tab {...args}>파일</Tab>
    <Tab {...args}>공지</Tab>
  </Tabs>
);

Default.args = {};
