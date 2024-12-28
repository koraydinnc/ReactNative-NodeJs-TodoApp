import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text } from 'react-native';

const OnboardingScreen = ({ onComplete }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f8fb' }}>
      <Onboarding
        pages={[
          {
            image: <Image source={require('../../assets/todo1.gif')} style={styles.image} />,
            backgroundColor: '#f4f8fb',
            title: (
              <Text style={styles.title}>
                Hoş Geldiniz!
              </Text>
            ),
            subtitle: (
              <Text style={styles.subtitle}>
                Uygulamanın sunduğu tüm özelliklerle tanışın ve başarılarınızı takip edin!
              </Text>
            ),
          },
          {
            image: <Image source={require('../../assets/todo2.gif')} style={styles.image} />,
            backgroundColor: '#f4f8fb',
            title: (
              <Text style={styles.title}>
                Hedeflerinizi Belirleyin
              </Text>
            ),
            subtitle: (
              <Text style={styles.subtitle}>
                Görevlerinizi kolayca yönetin ve önceliklerinize göre düzenleyin.
              </Text>
            ),
          },
          {
            image: <Image source={require('../../assets/todo3.gif')} style={styles.image} />,
            backgroundColor: '#f4f8fb',
            title: (
              <Text style={styles.title}>
                Hazırsınız!
              </Text>
            ),
            subtitle: (
              <Text style={styles.subtitle}>
                Şimdi başlamak için tek yapmanız gereken "Başla" butonuna tıklamak!
              </Text>
            ),
          },
        ]}
        onDone={onComplete}
        onSkip={onComplete}
        nextLabel="Sonraki"
        skipLabel="Geç"
        bottomBarColor="#f4f8fb"
        backgroundColor="#f4f8fb"
        pageIndex={0}
        renderNextButton={() => <Text style={styles.buttonText}>Sonraki</Text>}
        renderSkipButton={() => <Text style={styles.buttonText}>Geç</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3e4a61',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    padding:12
,    fontSize: 18,
    color: '#6e7881',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Regular',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 25,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
