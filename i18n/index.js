import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      detection: 'Détection',
      history: 'Historique',
      settings: 'Paramètres',
      about: 'À propos',
      
      // Général
      hello: 'Bonjour',
      changeLanguage: 'Changer la langue',
      chooseLanguage: 'Choisissez la langue de l\'application',
      cancel: 'Annuler',
      success: 'Succès',
      error: 'Erreur',
      unknownObject: 'Objet inconnu',
      detectedObject: 'Objet détecté',
      continue: 'Continuer',
      viewHistory: 'Voir l\'historique',
      information: 'Information',
      tryAgain: 'Réessayer',
      
      // DetectionScreen
      diagnosticTitle: "Diagnostic des Plantes",
      diagnosticSubtitle: "Détectez les maladies de vos oliviers avec précision",
      takePhoto: "Prendre une photo",
      chooseImage: "Choisir une image",
      startAnalysis: "Lancer l'analyse",
      loading: "Analyse en cours...",
      connectingTo: "Connexion à",
      analysisResults: "Résultats d'Analyse",
      detectedDisease: "Maladie détectée",
      severityLevel: "Niveau de Sévérité",
      reliabilityRate: "Taux de Fiabilité",
      treatmentPlan: "Plan de Traitement Recommandé",
      recommendations: "Conseils et Recommandations",
      newAnalysis: "Nouvelle analyse",
      save: "Sauvegarder",
      placeholderText: "Sélectionnez ou prenez une photo d'une feuille d'olivier pour commencer l'analyse",
      diseaseDetected: "Maladie détectée : {{disease}}",

      // Clés ajoutées pour correspondre au code (noDetectionTitle, noDetectionMessage, timeoutError)
      noDetectionTitle: "Aucune détection",
      noDetectionMessage: "Aucun objet n'a été détecté dans l'image.",
      timeoutError: "Le serveur met trop de temps à répondre",

      // Résultats spéciaux
      notOlive: {
        title: "Ceci n'est pas une feuille d'olivier",
        message: "L'analyse a détecté que l'objet n'est pas une feuille d'olivier.",
        tryAgain: "Essayer avec une autre image",
        treatment: "Veuillez prendre une photo claire d'une feuille d'olivier.",
        recommendations: [
          "Assurez-vous que la feuille est au centre de l'image",
          "Évitez les arrière-plans complexes",
          "Utilisez un éclairage suffisant",
          "Vérifiez que la feuille est complète et non endommagée"
        ]
      },
      healthyOlive: {
        title: "Feuille saine",
        message: "Votre feuille d'olivier semble en parfaite santé !"
      },
      noDetection: {
        title: "Aucune détection",
        message: "Aucun objet n'a été détecté dans l'image.",
        treatment: "Veuillez prendre une photo plus claire d'une feuille d'olivier.",
        recommendations: [
          "Vérifiez la netteté de l'image",
          "Approchez-vous un peu plus de la feuille",
          "Évitez les reflets et les ombres",
          "Assurez-vous que la feuille occupe au moins 70% de l'image"
        ]
      },
      noDetectionLabel: "Aucune maladie détectée",
      
      // Messages d'erreur
      serverError: "Erreur serveur",
      serverConnectionError: "Impossible de se connecter au serveur",
      serverErrorMessage: "Le serveur a renvoyé une erreur",
      analysisFailed: "L'analyse a échoué",
      analysisError: "Erreur d'analyse",
      imageSelectionError: "Erreur de sélection d'image",
      imageSelectionErrorMessage: "Impossible de sélectionner l'image",
      permissionRequired: "Permission requise",
      cameraPermissionMessage: "L'accès à la caméra est nécessaire pour cette fonctionnalité",
      galleryPermissionMessage: "L'accès à la galerie est nécessaire pour cette fonctionnalité",
      selectImageError: "Veuillez d'abord sélectionner une image",
      analysisSaved: "L'analyse a été sauvegardée dans votre historique",
      noAnalysisToSave: "Aucune analyse à sauvegarder",
      noValidDetectionToSave: "Aucune détection valide à sauvegarder",
      saveError: "Erreur de sauvegarde",
      saveErrorMessage: "Impossible de sauvegarder l'analyse",
      
      // Historique
      historyTitle: "Historique des Analyses",
      noHistory: "Aucune analyse sauvegardée",
      historyDate: "Date",
      historyDisease: "Maladie",
      historyReliability: "Fiabilité",
      historyActions: "Actions",
      deleteButton: "Supprimer",
      confirmDeleteTitle: "Confirmer la suppression",
      confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer cette analyse ?",
      confirmDeleteYes: "Oui",
      confirmDeleteNo: "Non",
      
      // Noms des maladies
      diseases: {
        "Mouche de olivier": "Mouche de l'olivier",
        "Tuberculose": "Tuberculose de l'olivier",
        "cochenille noire": "Cochenille noire",
        "en bonne etat": "En bonne santé",
        "oeil_de_paon": "Œil de paon",
        "psylle": "Psylle de l'olivier"
      },
      
      // Traitements et recommandations
      diseaseTreatments: {
        oliveFly: {
          treatment: "Traitement contre la mouche de l'olivier : Utilisation de pièges à phéromones et pulvérisation d'insecticides spécifiques comme le spinosad. Traitement pendant les périodes de vol des adultes.",
          recommendations: [
            "Installer des pièges à phéromones pour surveiller les populations",
            "Pulvériser des insecticides biologiques comme le kaolin",
            "Récolter les olives tôt pour éviter les infestations",
            "Éliminer les olives tombées au sol qui abritent les pupes"
          ]
        },
        tuberculosis: {
          treatment: "Traitement de la tuberculose de l'olivier : Élagage des branches infectées en coupant 30 cm sous la zone malade. Application de fongicides à base de cuivre sur les plaies de taille.",
          recommendations: [
            "Désinfecter les outils de taille entre chaque arbre",
            "Éviter les tailles pendant les périodes humides",
            "Appliquer un mastic cicatrisant sur les grandes plaies",
            "Favoriser la cicatrisation naturelle par une bonne fertilisation"
          ]
        },
        blackScale: {
          treatment: "Traitement contre la cochenille noire : Pulvérisation d'huiles horticoles en hiver et d'insecticides spécifiques comme le pyrèthre naturel au printemps. Introduction de prédateurs naturels comme les coccinelles.",
          recommendations: [
            "Favoriser les prédateurs naturels (coccinelles, chrysopes)",
            "Tailler les branches fortement infestées",
            "Éviter les excès d'engrais azotés qui favorisent les infestations",
            "Pulvériser du savon insecticide sur les colonies"
          ]
        },
        healthy: {
          treatment: "Votre olivier est en bonne santé ! Continuez les bonnes pratiques culturales pour le maintenir en pleine forme.",
          recommendations: [
            "Contrôles réguliers des feuilles et branches",
            "Taille annuelle pour aérer la couronne",
            "Fertilisation équilibrée au printemps",
            "Irrigation adaptée aux saisons (réduite en hiver)"
          ]
        },
        peacockEye: {
          treatment: "Traitement contre l'oeil de paon : Pulvérisation de bouillie bordelaise à l'automne et au début du printemps. Élimination des feuilles infectées tombées au sol.",
          recommendations: [
            "Ramasser et brûler les feuilles tombées à l'automne",
            "Tailler pour améliorer l'aération de la couronne",
            "Éviter les excès d'azote qui rendent l'arbre plus sensible",
            "Appliquer des traitements préventifs après les pluies printanières"
          ]
        },
        psyllid: {
          treatment: "Traitement contre le psylle de l'olivier : Pulvérisation d'insecticides au printemps lors de l'apparition des premières larves. Utilisation d'auxiliaires comme les anthocorides.",
          recommendations: [
            "Surveiller les pousses au printemps pour détecter les premiers symptômes",
            "Éviter les traitements insecticides non ciblés qui tuent les prédateurs naturels",
            "Tailler les pousses fortement infestées",
            "Maintenir un sol propre autour des arbres"
          ]
        },
        default: {
          treatment: "Maladie détectée : Suivez les recommandations spécifiques pour cette affection. Consultez un expert pour un diagnostic précis.",
          recommendations: [
            "Isoler la plante affectée",
            "Désinfecter les outils après usage",
            "Consulter un phytopathologiste",
            "Surveiller l'évolution des symptômes"
          ]
        }
      },

      // AproposScreen
      aboutTitle: "À propos de OliveLeaf Check",
      aboutTagline: "Votre allié intelligent pour la santé de vos oliviers",
      aboutMissionTitle: "Notre Mission",
      aboutMissionContent: "Notre mission est de fournir aux oléiculteurs, qu'ils soient professionnels ou amateurs, un outil simple et efficace pour détecter rapidement et précisément les maladies et les carences des feuilles de leurs oliviers. Nous croyons en l'importance de la prévention et de l'intervention précoce pour garantir des récoltes saines et abondantes.",
      aboutHowItWorksTitle: "Comment ça Marche ?",
      aboutHowItWorksContent: "OliveLeaf Check utilise une technologie avancée d'intelligence artificielle pour analyser les photos des feuilles de vos oliviers. Il vous suffit de pointer votre caméra, de prendre une photo, et notre application vous fournira un diagnostic en quelques secondes. Nous vous donnerons ensuite des informations détaillées sur la maladie détectée et des conseils pour la traiter.",
      aboutFeaturesTitle: "Fonctionnalités Clés",
      aboutFeaturesList: [
        "Détection rapide et précise des maladies",
        "Identification de  6+ maladies et carences",
        "Informations détaillées avec traitements recommandés",
        "Historique des analyses sauvegardé",
        "Interface utilisateur simple et intuitive"
      ],
      aboutCommitmentTitle: "Notre Engagement",
      aboutCommitmentContent: "Nous nous engageons à améliorer continuellement OliveLeaf Check en ajoutant de nouvelles fonctionnalités et en affinant nos algorithmes de détection. Votre feedback est précieux pour nous aider à atteindre cet objectif.",
      aboutTeamTitle: "Notre Équipe",
      aboutTeamRoleDeveloper: "Développeur Principal",
      aboutTeamRoleDesigner: "Designer UX/UI",
      aboutTeamRoleScientist: "Expert Agricole",
      aboutContactTitle: "Contactez-Nous",
      aboutPrivacyPolicy: "Politique de Confidentialité",
      aboutTerms: "Conditions d'Utilisation",
      aboutWebsite: "Site Web",
      aboutRights: "Tous droits réservés.",
      
      // AccueilScreen
      welcomeTitle: "Bienvenue sur OliveLeaf Check 👋",
      welcomeSubtitle: "Votre solution intelligente pour la santé de vos oliviers.",
      detectTitle: "Détectez les maladies, protégez vos cultures.",
      detectDescription: "Utilisez notre technologie avancée pour identifier rapidement les affections des feuilles d'olivier et obtenir des conseils personnalisés pour une intervention efficace.",
      featuresTitle: "Nos fonctionnalités clés",
      featureScanTitle: "Scan Rapide",
      featureScanDescription: "Analysez une feuille en un instant.",
      featureAdviceTitle: "Conseils Experts",
      featureAdviceDescription: "Obtenez des recommandations ciblées.",
      featureHistoryTitle: "Historique Complet",
      featureHistoryDescription: "Suivez la santé de vos arbres.",
      featureStatsTitle: "Statistiques",
      featureStatsDescription: "Visualisez l'évolution de vos cultures.",
      logoAccessibility: "Logo de l'application OliveLeaf Check",
      oliveLeafImageAccessibility: "Exemple de feuille d'olivier saine et malade"
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      detection: 'Detection',
      history: 'History',
      settings: 'Settings',
      about: 'About',
      
      // General
      hello: 'Hello',
      changeLanguage: 'Change Language',
      chooseLanguage: 'Choose app language',
      cancel: 'Cancel',
      success: 'Success',
      error: 'Error',
      unknownObject: 'Unknown object',
      detectedObject: 'Detected object',
      continue: 'Continue',
      viewHistory: 'View History',
      information: 'Information',
      tryAgain: 'Try again',
      
      // DetectionScreen
      diagnosticTitle: "Plant Diagnosis",
      diagnosticSubtitle: "Detect diseases of your olive trees with precision",
      takePhoto: "Take a photo",
      chooseImage: "Choose an image",
      startAnalysis: "Start analysis",
      loading: "Analyzing...",
      connectingTo: "Connecting to",
      analysisResults: "Analysis Results",
      detectedDisease: "Detected disease",
      severityLevel: "Severity level",
      reliabilityRate: "Reliability rate",
      treatmentPlan: "Recommended Treatment Plan",
      recommendations: "Tips and Recommendations",
      newAnalysis: "New analysis",
      save: "Save",
      placeholderText: "Select or take a photo of an olive leaf to start analysis",
      diseaseDetected: "Disease detected: {{disease}}",

      // Keys added to match code
      noDetectionTitle: "No detection",
      noDetectionMessage: "No object was detected in the image.",
      timeoutError: "Server took too long to respond",

      // Special results
      notOlive: {
        title: "This is not an olive leaf",
        message: "The analysis detected that the object is not an olive leaf.",
        tryAgain: "Try with another image",
        treatment: "Please take a clear photo of an olive leaf.",
        recommendations: [
          "Ensure the leaf is centered in the image",
          "Avoid complex backgrounds",
          "Use sufficient lighting",
          "Check that the leaf is complete and undamaged"
        ]
      },
      healthyOlive: {
        title: "Healthy leaf",
        message: "Your olive leaf appears to be perfectly healthy!"
      },
      noDetection: {
        title: "No detection",
        message: "No object was detected in the image.",
        treatment: "Please take a clearer photo of an olive leaf.",
        recommendations: [
          "Check image sharpness",
          "Get a little closer to the leaf",
          "Avoid reflections and shadows",
          "Ensure the leaf occupies at least 70% of the image"
        ]
      },
      noDetectionLabel: "No disease detected",
      
      // Error messages
      serverError: "Server error",
      serverConnectionError: "Unable to connect to server",
      serverErrorMessage: "The server returned an error",
      analysisFailed: "Analysis failed",
      imageSelectionError: "Image selection error",
      imageSelectionErrorMessage: "Unable to select image",
      permissionRequired: "Permission required",
      cameraPermissionMessage: "Camera access is required for this feature",
      galleryPermissionMessage: "Gallery access is required for this feature",
      selectImageError: "Please select an image first",
      analysisSaved: "Analysis saved to your history",
      noAnalysisToSave: "No analysis to save",
      noValidDetectionToSave: "No valid detection to save",
      saveError: "Save error",
      saveErrorMessage: "Unable to save analysis",

      // History Screen
      historyTitle: "Analysis History",
      noHistory: "No saved analysis",
      historyDate: "Date",
      historyDisease: "Disease",
      historyReliability: "Reliability",
      historyActions: "Actions",
      deleteButton: "Delete",
      confirmDeleteTitle: "Confirm Deletion",
      confirmDeleteMessage: "Are you sure you want to delete this analysis?",
      confirmDeleteYes: "Yes",
      confirmDeleteNo: "No",

      // Disease names
      diseases: {
        "Mouche de olivier": "Olive fruit fly",
        "Tuberculose": "Olive tree tuberculosis",
        "cochenille noire": "Black scale",
        "en bonne etat": "Healthy",
        "oeil_de_paon": "Peacock eye",
        "psylle": "Olive psyllid"
      },

      // Treatments and recommendations
      diseaseTreatments: {
        oliveFly: {
          treatment: "Treatment against olive fruit fly: Use of pheromone traps and spraying of specific insecticides like spinosad. Treatment during adult flight periods.",
          recommendations: [
            "Install pheromone traps to monitor populations",
            "Spray biological insecticides like kaolin",
            "Harvest olives early to avoid infestations",
            "Remove fallen olives that harbor pupae"
          ]
        },
        tuberculosis: {
          treatment: "Treatment of olive tuberculosis: Prune infected branches by cutting 30cm below the diseased area. Apply copper-based fungicides to pruning wounds.",
          recommendations: [
            "Disinfect pruning tools between each tree",
            "Avoid pruning during humid periods",
            "Apply healing paste on large wounds",
            "Promote natural healing with proper fertilization"
          ]
        },
        blackScale: {
          treatment: "Treatment against black scale: Spray horticultural oils in winter and specific insecticides like natural pyrethrum in spring. Introduction of natural predators like ladybugs.",
          recommendations: [
            "Encourage natural predators (ladybugs, lacewings)",
            "Prune heavily infested branches",
            "Avoid excess nitrogen fertilizers that promote infestations",
            "Spray insecticidal soap on colonies"
          ]
        },
        healthy: {
          treatment: "Your olive tree is healthy! Continue good cultural practices to maintain it in top shape.",
          recommendations: [
            "Regular checks of leaves and branches",
            "Annual pruning to aerate the crown",
            "Balanced fertilization in spring",
            "Season-adapted irrigation (reduced in winter)"
          ]
        },
        peacockEye: {
          treatment: "Treatment against peacock eye: Spray Bordeaux mixture in autumn and early spring. Removal of infected fallen leaves.",
          recommendations: [
            "Collect and burn fallen leaves in autumn",
            "Prune to improve crown aeration",
            "Avoid excess nitrogen that makes the tree more sensitive",
            "Apply preventive treatments after spring rains"
          ]
        },
        psyllid: {
          treatment: "Treatment against olive psyllid: Spray insecticides in spring when first larvae appear. Use of auxiliaries like anthocorids.",
          recommendations: [
            "Monitor shoots in spring to detect first symptoms",
            "Avoid non-targeted insecticide treatments that kill natural predators",
            "Prune heavily infested shoots",
            "Maintain clean soil around trees"
          ]
        },
        default: {
          treatment: "Disease detected: Follow specific recommendations for this condition. Consult an expert for precise diagnosis.",
          recommendations: [
            "Isolate affected plant",
            "Disinfect tools after use",
            "Consult a phytopathologist",
            "Monitor symptom evolution"
          ]
        }
      },

      // AproposScreen
      aboutTitle: "About OliveLeaf Check",
      aboutTagline: "Your intelligent ally for olive tree health",
      aboutMissionTitle: "Our Mission",
      aboutMissionContent: "Our mission is to provide olive growers, whether professionals or amateurs, with a simple and effective tool to quickly and accurately detect diseases and deficiencies in their olive leaves. We believe in the importance of prevention and early intervention to ensure healthy and abundant harvests.",
      aboutHowItWorksTitle: "How It Works",
      aboutHowItWorksContent: "OliveLeaf Check uses advanced artificial intelligence technology to analyze photos of your olive leaves. Simply point your camera, take a photo, and our app will provide you with a diagnosis in seconds. We'll then give you detailed information about the detected disease and advice on how to treat it.",
      aboutFeaturesTitle: "Key Features",
      aboutFeaturesList: [
        "Rapid and accurate disease detection",
        "Identification of 6+ diseases and deficiencies",
        "Detailed information with recommended treatments",
        "Saved analysis history",
        "Simple and intuitive user interface"
      ],
      aboutCommitmentTitle: "Our Commitment",
      aboutCommitmentContent: "We are committed to continuously improving OliveLeaf Check by adding new features and refining our detection algorithms. Your feedback is valuable in helping us achieve this goal.",
      aboutTeamTitle: "Our Team",
      aboutTeamRoleDeveloper: "Lead Developer",
      aboutTeamRoleDesigner: "UX/UI Designer",
      aboutTeamRoleScientist: "Agricultural Expert",
      aboutContactTitle: "Contact Us",
      aboutPrivacyPolicy: "Privacy Policy",
      aboutTerms: "Terms of Service",
      aboutWebsite: "Website",
      aboutRights: "All rights reserved.",
      
      // AccueilScreen
      welcomeTitle: "Welcome to OliveLeaf Check 👋",
      welcomeSubtitle: "Your intelligent solution for olive tree health.",
      detectTitle: "Detect diseases, protect your crops.",
      detectDescription: "Use our advanced technology to quickly identify olive leaf conditions and get personalized advice for effective intervention.",
      featuresTitle: "Our Key Features",
      featureScanTitle: "Quick Scan",
      featureScanDescription: "Analyze a leaf instantly.",
      featureAdviceTitle: "Expert Advice",
      featureAdviceDescription: "Get targeted recommendations.",
      featureHistoryTitle: "Complete History",
      featureHistoryDescription: "Track the health of your trees.",
      featureStatsTitle: "Statistics",
      featureStatsDescription: "Visualize the evolution of your crops.",
      logoAccessibility: "OliveLeaf Check app logo",
      oliveLeafImageAccessibility: "Example of healthy and diseased olive leaf"
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      detection: 'الكشف',
      history: 'السجل',
      settings: 'الإعدادات',
      about: 'حول',
      
      // General
      hello: 'مرحبا',
      changeLanguage: 'تغيير اللغة',
      chooseLanguage: 'اختر لغة التطبيق',
      cancel: 'إلغاء',
      success: 'نجاح',
      error: 'خطأ',
      unknownObject: 'جسم مجهول',
      detectedObject: 'جسم مكتشف',
      continue: 'متابعة',
      viewHistory: 'عرض السجل',
      information: 'معلومة',
      tryAgain: 'حاول مرة أخرى',
      
      // DetectionScreen
      diagnosticTitle: "تشخيص النباتات",
      diagnosticSubtitle: "اكتشف أمراض أشجار الزيتون بدقة",
      takePhoto: "التقاط صورة",
      chooseImage: "اختيار صورة",
      startAnalysis: "بدء التحليل",
      loading: "جار التحليل...",
      connectingTo: "الاتصال بـ",
      analysisResults: "نتائج التحليل",
      detectedDisease: "المرض المكتشف",
      severityLevel: "مستوى الخطورة",
      reliabilityRate: "معدل الموثوقية",
      treatmentPlan: "خطة العلاج الموصى بها",
      recommendations: "نصائح وتوصيات",
      newAnalysis: "تحليل جديد",
      save: "حفظ",
      placeholderText: "حدد أو التقط صورة لورقة زيتون لبدء التحليل",
      diseaseDetected: "مرض مكتشف: {{disease}}",

      // Keys added to match code
      noDetectionTitle: "لا يوجد اكتشاف",
      noDetectionMessage: "لم يتم اكتشاف أي جسم في الصورة.",
      timeoutError: "استغرق الخادم وقتًا طويلاً للرد",

      // Special results
      notOlive: {
        title: "هذه ليست ورقة زيتون",
        message: "كشف التحليل أن الجسم ليس ورقة زيتون.",
        tryAgain: "حاول بصورة أخرى",
        treatment: "الرجاء التقاط صورة واضحة لورقة زيتون.",
        recommendations: [
          "تأكد من أن الورقة في مركز الصورة",
          "تجنب الخلفيات المعقدة",
          "استخدم إضاءة كافية",
          "تحقق من أن الورقة كاملة وغير تالفة"
        ]
      },
      healthyOlive: {
        title: "ورقة سليمة",
        message: "ورقة الزيتون الخاصة بك تبدو في حالة صحية مثالية!"
      },
      noDetection: {
        title: "لا يوجد اكتشاف",
        message: "لم يتم اكتشاف أي جسم في الصورة.",
        treatment: "الرجاء التقاط صورة أوضح لورقة زيتون.",
        recommendations: [
          "تحقق من وضوح الصورة",
          "اقترب قليلاً من الورقة",
          "تجنب الانعكاسات والظلال",
          "تأكد من أن الورقة تشغل 70% على الأقل من الصورة"
        ]
      },
      noDetectionLabel: "لم يتم اكتشاف أي مرض",
      
      // Error messages
      serverError: "خطأ في الخادم",
      serverConnectionError: "تعذر الاتصال بالخادم",
      serverErrorMessage: "أعاد الخادم خطأ",
      analysisFailed: "فشل التحليل",
      imageSelectionError: "خطأ في اختيار الصورة",
      imageSelectionErrorMessage: "تعذر اختيار الصورة",
      permissionRequired: "الإذن مطلوب",
      cameraPermissionMessage: "يتطلب الوصول إلى الكاميرا لهذه الميزة",
      galleryPermissionMessage: "يتطلب الوصول إلى المعرض لهذه الميزة",
      selectImageError: "الرجاء تحديد صورة أولاً",
      analysisSaved: "تم حفظ التحليل في سجلك",
      noAnalysisToSave: "لا يوجد تحليل للحفظ",
      noValidDetectionToSave: "لا يوجد اكتشاف صالح للحفظ",
      saveError: "خطأ في الحفظ",
      saveErrorMessage: "تعذر حفظ التحليل",
      
      // History Screen
      historyTitle: "سجل التحليلات",
      noHistory: "لا توجد تحليلات محفوظة",
      historyDate: "التاريخ",
      historyDisease: "المرض",
      historyReliability: "الموثوقية",
      historyActions: "الإجراءات",
      deleteButton: "حذف",
      confirmDeleteTitle: "تأكيد الحذف",
      confirmDeleteMessage: "هل أنت متأكد أنك تريد حذف هذا التحليل؟",
      confirmDeleteYes: "نعم",
      confirmDeleteNo: "لا",

      // Disease names
      diseases: {
        "Mouche de olivier": "ذبابة الزيتون",
        "Tuberculose": "سل شجرة الزيتون",
        "cochenille noire": "الحشرة القشرية السوداء",
        "en bonne etat": "ورقة سليمة",
        "oeil_de_paon": "عين الطاووس",
        "psylle": "سيلا الزيتون"
      },

      // Treatments and recommendations
      diseaseTreatments: {
        oliveFly: {
          treatment: "علاج ذبابة الزيتون: استخدام مصائد الفيرومونات ورش المبيدات الحشرية الخاصة مثل سبينوساد. العلاج خلال فترات طيران البالغين.",
          recommendations: [
            "تركيب مصائد الفيرومون لمراقبة التجمعات",
            "رش المبيدات الحشرية البيولوجية مثل الكاولين",
            "حصاد الزيتون مبكرًا لتجنب الإصابة",
            "إزالة الزيتون المتساقط الذي يؤوي الشرانق"
          ]
        },
        tuberculosis: {
          treatment: "علاج سل الزيتون: تقليم الفروع المصابة بقطع 30 سم تحت المنطقة المريضة. تطبيق مبيدات الفطريات القائمة على النحاس على جروح التقليم.",
          recommendations: [
            "تطهير أدوات التقليم بين كل شجرة",
            "تجنب التقليم خلال الفترات الرطبة",
            "وضع معجون الشفاء على الجروح الكبيرة",
            "تعزيز الشفاء الطبيعي بالتسميد المناسب"
          ]
        },
        blackScale: {
          treatment: "علاج الحشرة القشرية السوداء: رش الزيوت البستانية في الشتاء والمبيدات الحشرية الخاصة كالبيريثروم الطبيعي في الربيع. إدخال المفترسات الطبيعية مثل الخنافس.",
          recommendations: [
            "تشجيع المفترسات الطبيعية (الخنافس، أسد المن)",
            "تقليم الفروع المصابة بشدة",
            "تجنب زيادة الأسمدة النيتروجينية التي تشجع الإصابة",
            "رش الصابون المبيد للحشرات على المستعمرات"
          ]
        },
        healthy: {
          treatment: "شجرة الزيتون الخاصة بك بحالة جيدة! استمر في الممارسات الزراعية الجيدة للحفاظ عليها في أفضل حال.",
          recommendations: [
            "فحص منتظم للأوراق والفروع",
            "تقليم سنوي لتهوية التاج",
            "تسميد متوازن في الربيع",
            "ري يتناسب مع الفصول (مخفض في الشتاء)"
          ]
        },
        peacockEye: {
          treatment: "علاج عين الطاووس: رش خليط بوردو في الخريف وبداية الربيع. إزالة الأوراق المصابة المتساقطة.",
          recommendations: [
            "جمع وحرق الأوراق المتساقطة في الخريف",
            "تقليم لتحسين تهوية التاج",
            "تجنب زيادة النيتروجين الذي يجعل الشجرة أكثر حساسية",
            "تطبيق العلاجات الوقائية بعد أمطار الربيع"
          ]
        },
        psyllid: {
          treatment: "علاج سيلا الزيتون: رش المبيدات الحشرية في الربيع عند ظهور اليرقات الأولى. استخدام المساعدات مثل الأنثوكوريدات.",
          recommendations: [
            "مراقبة البراعم في الربيع للكشف عن الأعراض الأولى",
            "تجنب علاجات المبيدات غير المستهدفة التي تقتل المفترسات الطبيعية",
            "تقليم البراعم المصابة بشدة",
            "الحفاظ على تربة نظيفة حول الأشجار"
          ]
        },
        default: {
          treatment: "تم اكتشاف مرض: اتبع التوصيات الخاصة بهذه الحالة. استشر خبيرًا للتشخيص الدقيق.",
          recommendations: [
            "عزل النبات المصاب",
            "تطهير الأدوات بعد الاستخدام",
            "استشارة أخصائي أمراض النبات",
            "مراقبة تطور الأعراض"
          ]
        }
      },

      // AproposScreen
      aboutTitle: "حول تطبيق OliveLeaf Check",
      aboutTagline: "حليفك الذكي لصحة أشجار الزيتون",
      aboutMissionTitle: "مهمتنا",
      aboutMissionContent: "مهمتنا هي تزويد مزارعي الزيتون، سواء كانوا محترفين أو هواة، بأداة بسيطة وفعالة للكشف السريع والدقيق عن الأمراض ونقص التغذية في أوراق الزيتون. نؤمن بأهمية الوقاية والتدخل المبكر لضمان حصاد صحي ووفير.",
      aboutHowItWorksTitle: "كيف يعمل؟",
      aboutHowItWorksContent: "يستخدم OliveLeaf Check تقنية الذكاء الاصطناعي المتقدمة لتحليل صور أوراق الزيتون الخاصة بك. ما عليك سوى توجيه الكاميرا، التقاط صورة، وسيوفر لك التطبيق تشخيصًا في ثوانٍ. سنزودك بعد ذلك بمعلومات مفصلة عن المرض المكتشف ونصائح لعلاجه.",
      aboutFeaturesTitle: "الميزات الرئيسية",
      aboutFeaturesList: [
        "كشف سريع ودقيق للأمراض",
        "تحديد 6+ أمراض ونقص تغذية",
        "معلومات مفصلة مع علاجات موصى بها",
        "حفظ سجل التحليلات",
        "واجهة مستخدم بسيطة وبديهية"
      ],
      aboutCommitmentTitle: "التزامنا",
      aboutCommitmentContent: "نلتزم بتحسين تطبيق OliveLeaf Check باستمرار من خلال إضافة ميزات جديدة وصقل خوارزميات الكشف لدينا. ملاحظاتك قيّمة لمساعدتنا في تحقيق هذا الهدف.",
      aboutTeamTitle: "فريقنا",
      aboutTeamRoleDeveloper: "المطور الرئيسي",
      aboutTeamRoleDesigner: "مصمم واجهات المستخدم",
      aboutTeamRoleScientist: "خبير زراعي",
      aboutContactTitle: "اتصل بنا",
      aboutPrivacyPolicy: "سياسة الخصوصية",
      aboutTerms: "شروط الخدمة",
      aboutWebsite: "الموقع الإلكتروني",
      aboutRights: "جميع الحقوق محفوظة.",

      // AccueilScreen
      welcomeTitle: "مرحبًا بكم في OliveLeaf Check 👋",
      welcomeSubtitle: "حلّكم الذكي لصحة أشجار الزيتون.",
      detectTitle: "اكتشف الأمراض، واحمي محاصيلك.",
      detectDescription: "استخدم تقنيتنا المتقدمة لتحديد أمراض أوراق الزيتون بسرعة والحصول على نصائح مخصصة للتدخل الفعال.",
      featuresTitle: "ميزاتنا الرئيسية",
      featureScanTitle: "مسح سريع",
      featureScanDescription: "حلل ورقة في لحظة.",
      featureAdviceTitle: "نصائح الخبراء",
      featureAdviceDescription: "احصل على توصيات مستهدفة.",
      featureHistoryTitle: "السجل الكامل",
      featureHistoryDescription: "تتبع صحة أشجارك.",
      featureStatsTitle: "إحصائيات",
      featureStatsDescription: "تصور تطور محاصيلك.",
      logoAccessibility: "شعار تطبيق OliveLeaf Check",
      oliveLeafImageAccessibility: "مثال على ورقة زيتون سليمة ومريضة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    // utilise la langue du téléphone (ex. "fr" ou "en" ou "ar")
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

const STORAGE_KEY = 'user-language';

export async function loadUserLanguage() {
  try {
    const lang = await AsyncStorage.getItem(STORAGE_KEY);
    if (lang) i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

export async function saveUserLanguage(lang) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Error saving language:', error);
  }
}

export default i18n;
