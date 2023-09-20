import {Linking} from 'react-native';

// NOTE: 안드로이드에서 써드파티 앱이 설치되어있으면 써드파티 앱으로 이동하고 아니면 마켓으로 이동
export async function openAndroidPaymentThirdPartyApp(url: string) {
  if (!url.includes('intent')) {
    Linking.openURL(url);

    return;
  }

  let deeplink = '';
  const intentScheme: Record<string, any> = url
    .split('#Intent;')[1]
    .split(';')
    .reduce((obj, item) => {
      const [key, value] = item.split('=');

      return {...obj, [key]: value};
    }, {});

  // ex) intent://pay?srCode=8343542#Intent;scheme=shinhan-sr-ansimclick;package=com.shcard.smartpay;end;
  if (url.startsWith('intent://')) {
    const intentUrl: string | null = url.split('#Intent;')[0].split('://')[1];

    deeplink = `${intentScheme?.scheme}://${intentUrl}`;
  } // ex) intent:hdcardappcardansimclick://appcard?acctid=202309192316589691332401632351#Intent;package=com.hyundaicard.appcard;end;
  else if (url.startsWith('intent:')) {
    const appScheme: string = url.split('://')[0].replace('intent:', '');
    const intentUrl: string = url.split('://')[1].split('#Intent;')[0];

    deeplink = `${appScheme}://${intentUrl}`;
  }

  const installed = await Linking.canOpenURL(deeplink);

  if (!installed) {
    const marketUrl = `market://details?id=${intentScheme?.package}`;
    Linking.openURL(marketUrl);

    return;
  }

  Linking.openURL(deeplink);

  return;
}

// NOTE: IOS에서 써드파티 앱이 설치되어있으면 써드파티 앱으로 이동하고 아니면 마켓으로 이동
export async function openIOSPaymentThirdPartyApp(url: string) {
  // NOTE(Ky2unda): IOS버그때문에 앱설치여부를 판단하지 않고 바로 앱을 연다.
  // const installed = await Linking.canOpenURL(url);

  // if (!installed) {
  //   const appScheme = url.split('://')[0] as keyof typeof IOSAppSchemeID;

  //   const marketUrl = `https://apps.apple.com/kr/app/${IOSAppSchemeID[appScheme]}`;
  //   Linking.openURL(marketUrl);

  //   return;
  // }

  try {
    Linking.openURL(url);
  } catch (err) {
    return;
  }

  return;
}

// const IOSAppSchemeID = {
//   'kftc-bankpay': 'id398456030',
//   ispmobile: 'id369125087',
//   hdcardappcardansimclick: 'id702653088',
//   'shinhan-sr-ansimclick': 'id572462317',
//   'kb-acp': 'id695436326',
//   kbbank: 'id373742138',
//   'mpocket.online.ansimclick': 'id535125356',
//   lottesmartpay: 'id668497947',
//   lotteappcard: 'id688047200',
//   cloudpay: 'id847268987',
//   citimobileapp: 'id1179759666',
//   payco: 'id924292102',
//   kakaotalk: 'id362057947',
//   lpayapp: 'id1036098908',
//   wooripay: 'id1201113419',
//   nhallonepayansimclick: 'id1177889176',
//   hanawalletmembers: 'id1038288833',
//   shinsegaeeasypayment: 'id666237916',
//   chaipayment: 'id1459979272',
//   'kb-auth': 'id695436326',
//   hyundaicardappcardid: 'id702653088',
//   lmslpay: 'id473250588',
//   'com.wooricard.wcard': 'id1499598869',
//   'lguthepay-xpay': 'id760098906',
//   liivbank: 'id1126232922',
//   supertoss: 'id839333328',
//   newsmartpib: 'id1470181651',
//   naversearchthirdlogin: 'id393499958',
// };
