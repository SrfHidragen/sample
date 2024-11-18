export const GlobalVariables = {
  ValidationMessage: {
    REQUIRED: 'Field is required',
    EMAIL: 'Enter valid e-mail address',
    PHONE_NUMBER: 'Please enter 10 digits only',
    CONSUMER_ID: 'Please enter valid consumerId',
    MIN_PHONE_NUMBER: 'Phone number must be 10 digits long',
    MIN_PASSWORD: 'Password must be at least 8 characters long.',
    MAX_PASSWORD: 'Password must not exceed 100 characters.',
    PASSWORD_LOWER: 'Password must contain at least one lowercase letter.',
    PASSWORD_UPPER: 'Password must contain at least one uppercase letter.',
    PASSWORD_NUMBER: 'Password must contain at least one number.',
    PASSWORD_SPECIAL: 'Password must contain at least one special character.',
    CONFIRM_PASSWORD: 'Passwords do not match.',
  },
  CommunicationLanguage: [
    {
      id: 'TGFuZ3VhZ2VzVHlwZToz',
      lid: ['TGFuZ3VhZ2VzVHlwZToz'],
      code: 'hi',
      name: 'Hindi',
    },
    {
      id: 'TGFuZ3VhZ2VzVHlwZToy',
      lid: ['TGFuZ3VhZ2VzVHlwZToy'],
      code: 'en',
      name: 'English',
    },
    {
      id: '1',
      lid: ['TGFuZ3VhZ2VzVHlwZToz', 'TGFuZ3VhZ2VzVHlwZToy'],
      code: 'ENG HND',
      name: 'Both English and Hindi',
    },
  ],
  //stage
  // CommunicationLanguage: [
  //   {
  //     id: 'TGFuZ3VhZ2VzVHlwZToz',
  //     code: 'hi',
  //     name: 'Hindi',
  //   },
  //   {
  //     id: 'TGFuZ3VhZ2VzVHlwZToy',
  //     code: 'en',
  //     name: 'English',
  //   },
  //   {
  //     id: '1',
  //     code: 'ENG HND',
  //     name: 'Both English and Hindi',
  //   },
  // ],
  Regex: {
    string: /^[A-Za-zÀ-ÖØ-ÿ'-]{4,}$/,
    PhoneNumber: /^\+?[1-9]\d{1,14}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // eslint-disable-next-line no-useless-escape
    url: /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    hexcolorCode: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    number: /^\d+$/,
  },
  //testdeploy 1
  baseUrl: {
    V: process.env.NEXT_PUBLIC_API_URL_BASE_URL,
    V1: process.env.NEXT_PUBLIC_API_URL_BASE_URL_FILE_UPLOAD,
  },
  imgURL: process.env.NEXT_PUBLIC_API_URL_S3_IMG,
};

export const GiveHelpApproachList = [
  {
    id: 1,
    name: 'Rural',
    description:
      'To assist 10 individuals in urgent need of financial support in our country, the rural approach allows me to initiate the process by providing financial assistance of INR 150 to the first consumer among the 10 consumers who are associated with the giveNtake online helping platform before me.',
    details:
      'In this approach, a consumer will receive INR 82,95,500 when approximately 20,97,152 other consumers associate with giveNtake online helping platform using the Rural Approach alone.',
    terms_details:
      'There are no time frames set by the company regarding when a consumer can receive INR 82,95,500 as assistance from other consumers.',
    payment_details: 'Initial Payment Breakdown in Rural Approach',
    stage_give_help_amount: 150,
    total_payable_amount: 150,
  },
  {
    id: 2,
    name: 'Semi Rural',
    description:
      'To assist 10 individuals in urgent need of financial support in our country, the Semi Rural Approach allows me to initiate the process by providing financial assistance of ₹ 750 (150 + 200 + 400) to the first 3 consumers among the 10 consumers who are associated with the giveNtake online helping platform before me.',
    details:
      'In this approach, a consumer will receive INR 82,95,500 when approximately 3,95,262 other consumers associate with giveNtake online helping platform using the Semi Rural Approach. ',
    terms_details:
      'There are no time frames set by the company regarding when a consumer can receive INR 82,95,500 as assistance from other consumers.',
    payment_details: 'Initial Payment Breakdown in Semi Rural Approach',
    stage_give_help_amount: 750,
    total_payable_amount: 750,
  },
  {
    id: 3,
    name: 'Urban',
    description:
      'To assist 10 individuals in urgent need of financial support in our country, the Urban  Approach allows me to initiate the process by providing financial assistance of ₹ 2,150 (150 + 200 150+200+400+600+800) to the first 5 consumers among the 10 consumers who are associated with the giveNtake online helping platform before me.',
    details:
      'In this approach, a consumer will receive INR 82,95,500 when approximately 61,432 other consumers associate with giveNtake online helping platform using the Urban Approach.',
    terms_details:
      'There are no time frames set by the company regarding when a consumer can receive INR 82,95,500 as assistance from other consumers.',
    payment_details: 'Initial Payment Breakdown in Urban Approach',
    stage_give_help_amount: 2150,
    total_payable_amount: 2150,
  },
  {
    id: 4,
    name: 'Township',
    description:
      'To assist 10 individuals in urgent need of financial support in our country, the Township Approach allows me to initiate the process by providing financial assistance of ₹ 5150 (150+200+400+600+800+1000+2000) to the first 7 consumers among the 10 consumers who are associated with the giveNtake online helping platform before me.',
    details:
      ' In this approach, a consumer will receive INR 82,95,500 when approximately 61,432 other consumers associate with giveNtake online helping platform using the Township Approach.',
    terms_details:
      'There are no time frames set by the company regarding when a consumer can receive INR 82,95,500 as assistance from other consumers.',
    payment_details: 'Initial Payment Breakdown in Township Approach',
    stage_give_help_amount: 5150,
    total_payable_amount: 5150,
  },
  {
    id: 5,
    name: 'Metro',
    description:
      'To assist 10 individuals in urgent need of financial support in our country, the Metro Approach allows me to initiate the process by providing financial assistance of ₹17,150  (150+200+400+600+800+1000+2000+3000+4000+5000) to all the 10 consumers who are associated with the giveNtake online helping platform before me',
    details:
      'In this approach, a consumer will receive INR 82,95,500 when approximately 2,046 other consumers associate with giveNtake online helping platform using the Metro Approach.',
    terms_details:
      'There are no time frames set by the company regarding when a consumer can receive INR 82,95,500 as assistance from other consumers',
    payment_details: 'Initial Payment Breakdown in Metro Approach',
    stage_give_help_amount: 17150,
    total_payable_amount: 17150,
  },
];

export const faqData = [
  {
    id: 1,
    question: 'What is the name of the company?',
    answer: 'a) Prasanth Panachikkal Enterprises Private Limited',
  },
  {
    id: 2,
    question:
      "What is the company's Corporate Identity Number (CIN) and Registration Number?",
    answer: 'a) CIN: U72200KL2016PTC046962, Registration Number: 046962',
  },
  {
    id: 3,
    question:
      ' What is the permanent account number (PAN CARD No.) of the company?',
    answer: 'a) AAICP8972D',
  },
  {
    id: 4,
    question: 'When was the company founded?',
    answer:
      'a) Prasanth panachikkal marketing private limited was registered on 05/10/2016. On 01/12/2021 it was renamed PRASANTH PANACHIKKAL ENTERPRISES PVT LTD',
  },
  {
    id: 5,
    question: 'When was the platform launched?',
    answer:
      'a) On 26-12-2018 giveNtake.world online helping platform was pre-launched as the first ever project of PRASANTH PANACHIKKAL ENTERPRISES PVT LTD. It was later soft launched on 24-02-2020.',
  },
  {
    id: 6,
    question:
      'How is PRASANTH PANACHIKKAL ENTERPRISES PVT LTD connected to giveNtake.world online helping platform?',
    answer:
      'a) giveNtake.world is a brand name and a business project under PRASANTH PANACHIKKAL ENTERPRISES PVT LTD',
  },
  {
    id: 7,
    question: 'Pancard of the Company ?',
    answer: '',
    src: '/img/faq/pancard-01.png',
    image: true,
  },
  {
    id: 8,
    question: 'Certificate of incorporation of the company?',
    answer: '',
    src: '/img/faq/certificate-of-incoperation.png',
    image: true,
  },
  {
    id: 9,
    question: 'What is giveNtake.world ?',
    answer:
      'a) With the aid of cutting-edge technology and by adhering to our great culture,giveNtake.world is a mobile application that helps people in achieving economic progress by helping others financially and receiving financial help directly from others, while also working as part of a social system that promotes economic prosperity, equality, and brotherhood',
  },
  {
    id: 10,
    question:
      'Is giveNtake.world online helping platform an MLM? If not, why so?',
    answer:
      'a) Definitely not. giveNtake.world online helping platform is not an MLM. The terms of Service, systems, or investment methods of any MLM company or system are not available on the giveNtake.world online help platform.',
  },
  {
    id: 11,
    question:
      'Is giveNtake.world online helping platform a money chain or money circulation? If not, why so?',
    answer:
      "a) Definitely not. A money chain is a financial transaction in which all consumer s of a company deposit money into the company's designated bank account. Money circulation is a method of investing money that attracts everyone by promising a return of double or quadruple the amount invested. Money circulation does not happen in giveNtake.world online helping platform. Here, consumer s of the platform conduct money transactions directly. Consumer s of the platform conduct direct money transactions with each other through this platform. As a result, it is clear that the giveNtake.world online helping platform is not a money-chain company.",
  },
  {
    id: 12,
    question:
      'What are the benefits and values that a person can expect by collaborating with the giveNtake.world online helping platform?',
    answer:
      ' a)The giveNtake.world online helping platform enables a person to improve their financial situation by directly helping others financially and accepting financial help from others in their social life. As a result, a person who realises he can help, rely on, trust, and love others in society becomes a humane individual.',
  },
  {
    id: 13,
    question:
      'What are the various ways that someone can collaborate with the online helping platform giveNtake.world?',
    answer: `a) You can obtain a consumership by following the invitation link of another active consumer in giveNtake.world online helping platform.
            b) You can directly contact the brand ambassadors of giveNtake.world online helping platform and obtain a consumership after understanding the concept of the platform in detail and clarity.
            c) You can collaborate with giveNtake.world online helping platform through the advertisement, branding, or awareness programs directly conducted by the platform.
            d) You can also collaborate with the giveNtake.world online helping platform by downloading its mobile application from Google Play Store or iOS App Store.`,
  },
  {
    id: 14,
    question:
      'How can someone obtain consumership in giveNtake.world online helping platform?',
    answer: `a) You can activate your consumership on the giveNtake.world online helping platform by providing all of the KYC details required in the application, such as your name, email ID, mobile number, and UPI ID, as well as by following the invitation link of another consumer who already has a consumership on the platform.`,
  },
  {
    id: 15,
    question:
      'How does a person obtain the consumership Number of giveNtake.world online helping platform?',
    answer:
      'a) The system will generate a consumer number once a person completes consumership registration on the giveNtake.world online helping platform. The system-generated consumer number will be sent to the registered mobile number as a message.',
  },
  {
    id: 16,
    question:
      'How many consumers should a consumer who has collaborated with the online helping platform giveNtake.world provide direct financial help to?',
    answer:
      "a) A consumer on the giveNtake.world online helping platform should provide direct financial help to ten other consumers through the ten stages of their 'give help' process.",
  },
  {
    id: 17,
    question:
      'What is the maximum amount of money that a consumer who has collaborated with the giveNtake.world online helping platform should provide as financial help to other consumers?',
    answer: '',
    src: '/img/faq/give-help-stage.png',
    image: true,
  },
  {
    id: 18,
    question:
      'What is the maximum amount of financial help that a consumer can receive from the giveNtake.world online helping platform?',
    answer:
      'a) A consumer who has registered on the giveNtake.world online helping platform can receive direct financial help ranging from Rs. 150 to Rs. 82,95,500 from a total of 2046 consumers from the first to the tenth stage.',
  },
  {
    id: 19,
    question:
      'How does a consumer on the GiveNtake.world online helping platform receive direct financial help from other consumers?',
    answer:
      'a) A consumer on giveNtake.world online helping platform can receive money through UPI Payment Wallets which are part of Digital India initiative. Currently in India, there are more than 120 payment wallets such as Phonepe, google pay, payTM, bhim app, whatsapp pay etc. through which a person can give or receive direct financial help.',
  },
  {
    id: 20,
    question:
      'Is there any limit to the amount of financial help that a consumer can receive directly through the giveNtake.world online helping platform?',
    answer:
      'a) Each consumer of the giveNtake.world online helping platform will have a chance to receive Rs.150 each as financial help, from the first person on the first stage to the 2046th person on the tenth stage, for a total of Rs. 82,95,500 from these 10 stages alone. There is no minimum or maximum time limit for receiving direct financial help from other consumers.',
  },
  {
    id: 21,
    question:
      ' How can consumers understand the amount of financial help they received on their own?',
    answer:
      'a) When customers log in to the giveNtake.world online helping platform, they can view and download the exact amount of financial help from the transaction history on the menu bar.',
  },
  {
    id: 22,
    question:
      ' How can someone withdraw from giveNtake.world online helping platform?',
    answer:
      'a) When a consumer receives Rs.82,95,500 in direct financial help from 2046 other consumers, their consumership number is cancelled, and they can activate a new consumer number if necessary.',
  },
  {
    id: 23,
    question:
      'Where can a consumer work on the online helping platform giveNtake.world?',
    answer:
      'a) Only in India can someone work on the online helping platform giveNtake.world.',
  },
  {
    id: 24,
    question:
      ' How does giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company earn money?',
    answer:
      'a) giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company receives only the PMF. . giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD is only a service provider. Through the consumer applications, the giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company only receives the PMF (Platform Maintenance Fee) from the consumers.',
  },
  {
    id: 25,
    question:
      'Who is responsible for paying the Platform Maintenance Fee (PMF) to giveNtake.world/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD?  ',
    answer:
      'a) When a consumer on the giveNtake.world online helping platform receives direct financial help of up to Rs.10 lakhs from other consumers, he or she must pay one lakh rupees (Rs.1,00,000) as PMF and the associated GST payable to the government in 108 instalments.',
  },
  {
    id: 26,
    question:
      'Will giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company conduct meetings, promotions and awareness campaigns? ',
    answer:
      'a) Definitely not. The meetings and promotion of giveNtake.world online helping platform will be conducted by GAMES (Giventake Association of Members Empowerment Society). GAMES is a society with pan India operations.',
  },
  {
    id: 27,
    question:
      ' How can a consumer of giveNtake.world online helping platform become a ‘giventaker’?',
    answer:
      "a) To become a 'giventaker,' ie., a brand ambassador of the company, a consumer who has collaborated with the giveNtake.world online helping platform must invite a minimum of two people to the platform and complete his or her first five stages, i.e., he or she reaches the 'receive help' of 62 other consumers and receives Rs. 39500 as direct financial help. The consumer must then voluntarily accept the terms of service of the giveNtake.world online helping platform/PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company and attend all online/offline training programmes exclusively for 'giventakers' and complete all tasks during the training.",
  },
  {
    id: 28,
    question:
      'What personal benefits does being a giveNtaker on the GiveNtake.world online helping platform provide a consumer?',
    answer:
      'a) Giventaker is not a title given to everyone who collaborates with the GiveNtake.world online helping platform. Giventaker status allows a person to help others in our society in achieving financial, psychological, and social security. The giveNtake.world online helping platform honours a consumer who works for the benefit of society with social responsibility and humanitarian values by awarding brand ambassador status on the giveNtake.world online helping platform. A giventaker who works full-time for the giveNtake.world online helping platform can receive financial help of up to Rs.82,95,500 much quicker than other consumers.',
  },
  {
    id: 29,
    question:
      "How many people should a consumer of the giveNtake.world online helping platform invite after explaining the platform's concept to them?",
    answer:
      'a) A consumer who has collaborated with the giveNtake.world online helping platform is required to invite more than 2 people of his community who are in need of financial help to the platform by explaining the idea of the platform in a convincing and clear manner.',
  },
  {
    id: 30,
    question:
      'Is it possible for a consumer who has collaborated with the GiveNtake.world online helping platform to reimburse the direct financial help that he or she provided to ten other consumers? ',
    answer:
      'a) A consumer who has collaborated with the online helping platform giveNtake.world will not receive a refund from the ten other consumers to whom he or she has provided direct financial help. Instead, a consumer can receive direct financial help from new consumers who collaborate with the giveNtake.world online helping platform with a conviction that it is their duty to financially help fellow human beings in society.',
  },
  {
    id: 31,
    question:
      'How can the company help convince society that the online helping platform giveNtake.world will not defraud the public in the future?',
    answer:
      'a) Definitely possible. giveNtake.world online helping platform / / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD Company is only providing a service to people so that they can feel financially secure. The giveNtake.world online helping platform / / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD Company only receives the service charge for the same for people. People only pay the service charge to the giveNtake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD Company for the same. This means that giveNtake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company does not receive deposits or refundable investments from the public. The giveNtake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company only receives the deserved PMF (Platform Maintenance Fee). Therefore, giveNtake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD company would never have to shut down as a fraud company by cheating, defrauding or extorting the public.',
  },
  {
    id: 32,
    question:
      " The giveNtake.world online helping platform's business concept dates back decades. Can the company deny it if it's compared to old wine in a new bottle?",
    answer:
      "a) The business concept of the giveNtake.world online helping platform is centuries old, not decades. However, the advent of information technology and the dominance of UPI Payments as a part of Digital India has changed the look and feel of the traditional way of doing business, and PANACHIKKAL ENTERPRISES PVT LTD Company has been able to completely digitise this centuries-old idea in order to bring it 100% online to all of India's people. Working with people with complete honesty and transparency has resulted in the successful growth of this idea.",
  },
  {
    id: 33,
    question: ' Why a ‘society’?',
    answer:
      'a) The ‘society’, ie., GAMES (Giventake Association of Members Empowerment Society) is to conduct all kinds of promotions, meetings and public awareness classes, both online and offline.',
  },
  {
    id: 34,
    question: ' What is this ‘soceity’?',
    answer:
      'a) GAMES (Giventake Association of Members Empowerment Society) is an Empowerment Society founded under the Societies Registration Act XXI of 1860 to bring the idea of giveNtake.world online helping platform to consumers in a uniform manner in a pan India model similar to clubs and organisations.',
  },
  {
    id: 35,
    question: ' What is meant by consumership transfer? ',
    answer:
      "a) Consumership transfer is the legal transfer of a consumer's consumership when he is unable to cooperate with the platform due to personal circumstances.",
  },
  {
    id: 36,
    question: ' Why is consumership transfer required? ',
    answer: `a) When a consumer finds it difficult to cooperate with the platform, other consumers are hampered in carrying out their activities and that may become a constraint to their life and livelihood. To avoid this and ensure that other consumer's activities run smoothly, that person should step aside from the position and transfer the consumership to another person.
            b) If a consumer intentionally and purposefully takes action to interfere with the platform's operation, the platform may transfer consumership based on evidence without the consumer's consent.`,
  },
  {
    id: 37,
    question: 'Why is deactivation required? ',
    answer:
      "a) When the consumer's smooth operations are disrupted, deactivation is an option that should only be used in an emergency.",
  },
  {
    id: 38,
    question: 'What is meant by ‘deactivation’? ',
    answer: `a) If a consumer does not complete ‘give help’ process within 24 hours of entering the platform, the system of the giveNtake.world online helping platform will automatically deactivate the consumership.
             b) If you do not invite two new people to the platform within 30 days of your consumership becoming active, the consumer who invited you to the platform can further deactivate your consumership. If you are unable to continue cooperating with the Platform within 30 days or if you are not interested, you can deactivate yourself.`,
  },
  {
    id: 39,
    question: 'What is meant by termination? ',
    answer:
      'a) If giventake.world online helping platform/Prasanth Panachikkal Enterprises pvt Ltd company believes a consumer is acting against giventake.world online helping platform, against society, or engaging in criminal activity, giventake.world online helping platform/Prasanth Panachikkal Enterprises pvt Ltd company will remove that consumer from giventake.world online helping platform and ban their consumership for life.',
  },
  {
    id: 40,
    question:
      'Will consumers receive a refund if they deactivate their consumership on their own or if the consumer who invited them deactivates their consumership? ',
    answer:
      'a) Definitely not. If consumers fail to cooperate with the giventake.world online helping platform, or they are not interested, or they voluntarily deactivates within the first 30 days, or the consumer who invited them deactivates the consumership, their consumership will be deactivated and the PMF paid to the giventake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD will remain in the deactivated consumership and the consumership will remain on the giventake.world online helping platform / PRASANTH PANACHIKKAL ENTERPRISES PVT LTD. When the consumer reactivates the consumership in the future, he or she is obligated to provide financial help to other consumers.',
  },
];

export const Annual_2024_images = [
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/1.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/2.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/3.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/4.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/5.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/6.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/7.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/8.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/9.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/10.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/11.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/12.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/13.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/14.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/15.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/16.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/17.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2024/thumbnail/18.webp',
  },
];

export const Staf_training_2023 = [
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/1.webp',
  },
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/2.webp',
  },
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/3.webp',
  },
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/4.webp',
  },
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/5.webp',
  },
  {
    thumbnail: '/img/gallery/staf-training-2023/thumbnail/6.webp',
  },
];

export const Annual_2023_images = [
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/1.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/2.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/3.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/4.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/5.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/6.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/7.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/8.webp',
  },

  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/10.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/11.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/12.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/13.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/14.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/15.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/16.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/17.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/18.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2023/thumbnail/9.webp',
  },
];

export const Annual_2022_images = [
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/1.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/2.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/3.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/4.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/5.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/6.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/7.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/8.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/9.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/10.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/11.webp',
  },
  {
    thumbnail: '/img/gallery/annual-2022/thumbnail/12.webp',
  },
];
