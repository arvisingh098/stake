import React from 'react';
import { Button, IconStarFilled, IconStar } from '@aragon/ui';

type switchThemeProps = {
  hasWeb3: boolean,
  theme: string,
  updateTheme: Function
}

function SwitchMode({ hasWeb3, theme, updateTheme }: switchThemeProps) {
  const handleChangeTheme = () => {
    if (theme === 'dark') updateTheme('dark');
    else updateTheme('dark');
  };

  return (
    <Button
      icon={theme === 'dark' ? <IconStar /> : <IconStarFilled />}
      onClick={handleChangeTheme}
      label=""
      disabled={!hasWeb3}
    />
  );
}


export default SwitchMode;
