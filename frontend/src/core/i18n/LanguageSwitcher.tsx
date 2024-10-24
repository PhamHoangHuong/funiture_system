import React from 'react';
import { useTranslation } from '../hooks/translation';

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, i18n } = useTranslation();

  return (
    <div>
      <button onClick={() => changeLanguage('vi')} disabled={i18n.language === 'vi'}>Tiếng Việt</button>
      <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>English</button>
    </div>
  );
};

export default LanguageSwitcher;