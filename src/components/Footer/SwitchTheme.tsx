import React,{ useEffect } from 'react';
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

  useEffect(() => {
    let isCancelled = false;

    async function updaterewardTheme() {
      handleChangeTheme();
    }

    updaterewardTheme();
    const id = setInterval(updaterewardTheme, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, []);

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
