import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import CustomStatusBar from '../components/CustomStatusBar';

const AproposScreen = () => {
  const { t } = useTranslation();
  const { settings, COLORS, SHADOWS } = useAppContext();

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Erreur lors de l'ouverture du lien", err));
  };

  // Couleurs du gradient en fonction du mode
  const gradientColors = settings.darkMode 
    ? ['#121212', '#1e1e1e', '#121212'] 
    : ['#3498db', '#4ECDC4', '#2ecc71'];

  return (
    <>
      <CustomStatusBar />
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
          <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              
              <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: COLORS.text }]}>{t('aboutTitle')}</Text>
                <View style={[styles.divider, { backgroundColor: COLORS.accentGreen }]} />
                <Text style={[styles.tagline, { color: COLORS.secondaryText }]}>{t('aboutTagline')}</Text>
              </View>
            </View>

            <View style={[styles.card, { 
              backgroundColor: COLORS.cardBg, 
              ...SHADOWS.card 
            }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="ribbon-outline" size={24} color={COLORS.accentBlue} />
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('aboutMissionTitle')}</Text>
              </View>
              <Text style={[styles.sectionContent, { color: COLORS.secondaryText }]}>
                {t('aboutMissionContent')}
              </Text>
            </View>

            <View style={[styles.card, { 
              backgroundColor: COLORS.cardBg, 
              ...SHADOWS.card 
            }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="cog-outline" size={24} color={COLORS.accentBlue} />
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('aboutHowItWorksTitle')}</Text>
              </View>
              <Text style={[styles.sectionContent, { color: COLORS.secondaryText }]}>
                {t('aboutHowItWorksContent')}
              </Text>
            </View>

            <View style={[styles.card, { 
              backgroundColor: COLORS.cardBg, 
              ...SHADOWS.card 
            }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star-outline" size={24} color={COLORS.accentBlue} />
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('aboutFeaturesTitle')}</Text>
              </View>
              <View style={styles.featuresList}>
                {t('aboutFeaturesList', { returnObjects: true }).map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={18} color={COLORS.accentGreen} style={styles.featureIcon} />
                    <Text style={[styles.featureText, { color: COLORS.secondaryText }]}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.card, { 
              backgroundColor: COLORS.cardBg, 
              ...SHADOWS.card 
            }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="heart-outline" size={24} color={COLORS.accentBlue} />
                <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{t('aboutCommitmentTitle')}</Text>
              </View>
              <Text style={[styles.sectionContent, { color: COLORS.secondaryText }]}>
                {t('aboutCommitmentContent')}
              </Text>
            </View>

            <View style={[styles.teamSection, { 
              backgroundColor: COLORS.cardBg,
              borderColor: COLORS.cardBorder
            }]}>
              <Text style={[styles.teamTitle, { color: COLORS.text }]}>{t('aboutTeamTitle')}</Text>
              <View style={styles.teamMembers}>
                <View style={styles.teamMember}>
                  <Image 
                    // source={require('../assets/images/adil.jpg')} 
                    style={[styles.avatar, { borderColor: COLORS.accentBlue }]} 
                  />
                  <Text style={[styles.memberName, { color: COLORS.text }]}>Merghadi Adil</Text>
                  <Text style={[styles.memberRole, { color: COLORS.secondaryText }]}>{t('aboutTeamRoleDeveloper')}</Text>
                </View>
                <View style={styles.teamMember}>
                  <Image 
                    // source={require('../assets/images/oussama.jpg')} 
                    style={[styles.avatar, { borderColor: COLORS.accentBlue }]} 
                  />
                  <Text style={[styles.memberName, { color: COLORS.text }]}>Chantir Oussama</Text>
                  <Text style={[styles.memberRole, { color: COLORS.secondaryText }]}>{t('aboutTeamRoleDeveloper')}</Text>
                </View>
              </View>
              
              <View style={[styles.supervisorContainer, { borderTopColor: COLORS.cardBorder }]}>
                <View style={styles.supervisorMember}>
                  <Image 
                    // source={require('../assets/images/elalaoui.jpg')} 
                    style={[styles.supervisorAvatar, { borderColor: COLORS.accentGreen }]} 
                  />
                  <View style={styles.supervisorInfo}>
                    <Text style={[styles.supervisorLabel, { color: COLORS.accentGreen }]}>{t('aboutTeamSupervisor')}</Text>
                    <Text style={[styles.memberName, { color: COLORS.text }]}>El Belrhiti El Alaoui</Text>
                    <Text style={[styles.memberRole, { color: COLORS.secondaryText }]}>{t('aboutTeamRoleSupervisor')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.contactCard, { 
              backgroundColor: COLORS.cardBg,
              borderColor: COLORS.cardBorder
            }]}>
              <Text style={[styles.contactTitle, { color: COLORS.text }]}>{t('aboutContactTitle')}</Text>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: COLORS.accentBlue }]}
                onPress={() => openLink('mailto:support@oliveleafcheck.com')}
              >
                <Ionicons name="mail-outline" size={20} color="white" />
                <Text style={styles.contactButtonText}>support@oliveleafcheck.com</Text>
              </TouchableOpacity>
              
              <View style={styles.socialLinks}>
                <TouchableOpacity onPress={() => openLink('https://facebook.com/oliveleafcheck')}>
                  <Ionicons name="logo-facebook" size={28} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://twitter.com/oliveleafcheck')}>
                  <Ionicons name="logo-twitter" size={28} color="#1DA1F2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://instagram.com/oliveleafcheck')}>
                  <Ionicons name="logo-instagram" size={28} color="#E1306C" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://linkedin.com/company/oliveleafcheck')}>
                  <Ionicons name="logo-linkedin" size={28} color="#0077b5" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.footerLinks}>
                <TouchableOpacity onPress={() => openLink('https://oliveleafcheck.com/privacy')}>
                  <Text style={[styles.footerLink, { color: COLORS.secondaryText }]}>{t('aboutPrivacyPolicy')}</Text>
                </TouchableOpacity>
                <Text style={[styles.footerSeparator, { color: COLORS.secondaryText }]}>•</Text>
                <TouchableOpacity onPress={() => openLink('https://oliveleafcheck.com/terms')}>
                  <Text style={[styles.footerLink, { color: COLORS.secondaryText }]}>{t('aboutTerms')}</Text>
                </TouchableOpacity>
                <Text style={[styles.footerSeparator, { color: COLORS.secondaryText }]}>•</Text>
                <TouchableOpacity onPress={() => openLink('https://oliveleafcheck.com')}>
                  <Text style={[styles.footerLink, { color: COLORS.secondaryText }]}>{t('aboutWebsite')}</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.copyright, { color: COLORS.secondaryText }]}>
                © 2025 OliveLeaf Check. {t('aboutRights')}
              </Text>
              
              <View style={styles.appInfo}>
                <Text style={[styles.version, { color: COLORS.secondaryText }]}>v2.1.5</Text>
                <Text style={[styles.build, { color: COLORS.secondaryText }]}>Build 2157</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 30,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 15,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    height: 3,
    width: 80,
    marginVertical: 12,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: '90%',
    lineHeight: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  featuresList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  teamSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  teamMembers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  teamMember: {
    alignItems: 'center',
    width: '45%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  memberRole: {
    fontSize: 14,
    textAlign: 'center',
  },
  supervisorContainer: {
    borderTopWidth: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  supervisorMember: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  supervisorAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
    borderWidth: 2,
  },
  supervisorInfo: {
    flex: 1,
  },
  supervisorLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 25,
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
    marginHorizontal: 5,
  },
  footerSeparator: {
    fontSize: 14,
  },
  copyright: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },
  appInfo: {
    flexDirection: 'row',
    marginTop: 15,
  },
  version: {
    fontSize: 12,
    marginRight: 15,
  },
  build: {
    fontSize: 12,
  },
});

export default AproposScreen;