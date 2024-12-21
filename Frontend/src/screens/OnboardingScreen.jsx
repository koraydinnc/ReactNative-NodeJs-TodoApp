import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView } from 'react-native';

const OnboardingScreen = ({ onComplete }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Onboarding
        pages={[
          {
            image: <Image source={require('../../assets/favicon.png')} style={{ width: 100, height: 100 }} />,
            backgroundColor: '#fff',
            title: "Hoş Geldiniz",
            subtitle: "Uygulamayı daha iyi kullanabilmeniz için rehberlik sağlıyoruz.",
          },
          {
            image: <Image source={require('../../assets/favicon.png')} style={{ width: 100, height: 100 }} />,
            backgroundColor: '#fff',
            title: "Özellikler",
            subtitle: "Görevlerinizi takip edebilir, tamamlanan ve devam eden görevleri görebilirsiniz.",
          },
          {
            image: <Image source={require('../../assets/favicon.png')} style={{ width: 100, height: 100 }} />,
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
        backgroundColor="#fff"
      />

      </SafeAreaView>
  );
};

export default OnboardingScreen;
