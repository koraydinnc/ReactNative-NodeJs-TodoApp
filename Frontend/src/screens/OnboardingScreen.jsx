import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ onComplete }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          title: "Hoş Geldiniz",
          subtitle: "Uygulamayı daha iyi kullanabilmeniz için rehberlik sağlıyoruz.",
        },
        {
          backgroundColor: '#fff',
          title: "Özellikler",
          subtitle: "Görevlerinizi takip edebilir, tamamlanan ve devam eden görevleri görebilirsiniz.",
        },
        {
          backgroundColor: '#fff',
          title: "Başlayalım",
          subtitle: "Artık hazırsınız! Başla butonuna basarak uygulamaya giriş yapabilirsiniz.",
        },
      ]}
      onDone={onComplete} 
      onSkip={onComplete} 
      nextLabel="Sonraki"
      skipLabel="Geç"
      bottomBarColor="#fff"
    />
  );
};

export default OnboardingScreen;
