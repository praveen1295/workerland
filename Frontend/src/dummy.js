// const { db } = require("./models/userModels");

const user = [
  {
    name: "shyam",
    email: "shyam@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, parmandal,multai,betul,460661",
    location: {
      type: "Point",
      coordinates: [21.76467781162625, 78.22154718243502],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "ajay",
    email: "ajay@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, multai,multai,betul,460661",
    location: {
      type: "Point",
      coordinates: [21.776301914653676, 78.25712707058587],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "durga",
    email: "durga@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, betul,multai,betul,460001",
    location: {
      type: "Point",
      coordinates: [21.89720143760831, 77.90642183927685],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "praveen",
    email: "praveen@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, karajgaon,sonora,multai,460661",
    location: {
      type: "Point",
      coordinates: [21.755948749325494, 78.18718415531474],
    },
    isAdmin: true,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "rashi",
    email: "rashi@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, berasia,bhopal,bhopal,463106",
    location: {
      type: "Point",
      coordinates: [23.62769665819059, 77.43114697116731],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "vijay",
    email: "vijay@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, ashoka garden,bhopal,462023",
    location: {
      type: "Point",
      coordinates: [23.257187734494426, 77.42975406589424],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    name: "manish",
    email: "manish@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, vijay nagar,indore,452010",
    location: {
      type: "Point",
      coordinates: [22.751771640634935, 75.89533412815666],
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
];

const serviceProviders = [
  {
    // userId: ObjectId("658666a1a9360b6813c1c474"),
    name: "provider1",
    email: "provider1@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, parmandal,multai,betul,460661",
    location: {
      type: "Point",
      coordinates: [21.76467781162625, 78.22154718243502],
    },
    website: "",
    serviceType: "type1",
    experience: "1 year",
    feesPerService: "100",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },

    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c475"),
    name: "provider2",
    email: "provider2@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, multai,multai,betul,460661",
    location: {
      type: "Point",
      coordinates: [21.776301914653676, 78.25712707058587],
    },
    website: "",
    serviceType: "type2",
    experience: "2 year",
    feesPerService: "200",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c476"),
    name: "provider3",
    email: "provider3@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, betul,multai,betul,460001",
    location: {
      type: "Point",
      coordinates: [21.89720143760831, 77.90642183927685],
    },
    website: "",
    serviceType: "type3",
    experience: "3 year",
    feesPerService: "300",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c477"),
    name: "provider4",
    email: "provider4@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, karajgaon,sonora,multai,460661",
    location: {
      type: "Point",
      coordinates: [21.755948749325494, 78.18718415531474],
    },
    website: "",
    serviceType: "type4",
    experience: "4 year",
    feesPerService: "400",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: true,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c478"),
    name: "provider5",
    email: "provider5@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, berasia,bhopal,bhopal,463106",
    location: {
      type: "Point",
      coordinates: [23.62769665819059, 77.43114697116731],
    },
    website: "",
    serviceType: "type5",
    experience: "5 year",
    feesPerService: "500",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c479"),
    name: "provider6",
    email: "provider6@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, ashoka garden,bhopal,462023",
    location: {
      type: "Point",
      coordinates: [23.257187734494426, 77.42975406589424],
    },
    website: "",
    serviceType: "type6",
    experience: "6 year",
    feesPerService: "600",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
  {
    // userId: ObjectId("658666a1a9360b6813c1c47a"),
    name: "provider7",
    email: "manish@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, vijay nagar,indore,452010",
    location: {
      type: "Point",
      coordinates: [22.751771640634935, 75.89533412815666],
    },
    website: "",
    serviceType: "type7",
    experience: "7 year",
    feesPerService: "700",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
  },
];

const location = [
  {
    address_components: [
      {
        long_name: "R63P+X5P",
        short_name: "R63P+X5P",
        types: ["plus_code"],
      },
      {
        long_name: "betul",
        short_name: "betul",
        types: ["locality", "political"],
      },
      {
        long_name: "Betul",
        short_name: "Betul",
        types: ["administrative_area_level_3", "political"],
      },
      {
        long_name: "Narmadapuram Division",
        short_name: "Narmadapuram Division",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Madhya Pradesh",
        short_name: "MP",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "India",
        short_name: "IN",
        types: ["country", "political"],
      },
      {
        long_name: "460661",
        short_name: "460661",
        types: ["postal_code"],
      },
    ],
    formatted_address:
      "R63P+X5P, Parmandal, Bhilai, Madhya Pradesh 460661, India",
    geometry: {
      location: { lat: 21.89720143760831, lng: 77.90642183927685 },
      location_type: "GEOMETRIC_CENTER",
      viewport: {
        northeast: { lat: 21.8066521302915, lng: 78.2362462302915 },
        southwest: { lat: 21.80395416970849, lng: 78.23354826970848 },
      },
    },
    partial_match: true,
    place_id: "ChIJ_f7Kvb_B1TsRymdrwjskSy8",
    types: ["establishment", "point_of_interest"],
  },
  {
    address_components: [
      {
        long_name: "betul",
        short_name: "betul",
        types: ["locality", "political"],
      },
      {
        long_name: "Betul",
        short_name: "Betul",
        types: ["administrative_area_level_3", "political"],
      },
      {
        long_name: "Narmadapuram Division",
        short_name: "Narmadapuram Division",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Madhya Pradesh",
        short_name: "MP",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "India",
        short_name: "IN",
        types: ["country", "political"],
      },
      {
        long_name: "460661",
        short_name: "460661",
        types: ["postal_code"],
      },
    ],
    formatted_address: "Parmandal, Madhya Pradesh 460661, India",
    geometry: {
      bounds: {
        northeast: { lat: 21.81262, lng: 78.27027 },
        southwest: { lat: 21.7856299, lng: 78.23044 },
      },
      location: { lat: 21.7991828, lng: 78.2533102 },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: { lat: 21.81262, lng: 78.27027 },
        southwest: { lat: 21.7856299, lng: 78.23044 },
      },
    },
    partial_match: true,
    place_id: "ChIJdZOjfzPA1TsRb-nAfUfP3jw",
    types: ["locality", "political"],
  },
];

const serviceType = [
  {
    id: 1,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Choose (चुनिए)",
    value: "Choose (चुनिए)",
  },
  {
    id: 2,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Agriculture Workers (कृषि कर्मचारी)",
    value: "agricultureWorkers",
  },
  {
    id: 3,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Jewelry Workers(आभूषण श्रमिक)",
    value: "jewelryWorkers",
  },
  {
    id: 4,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Auto Mechanics (ऑटो मैकेनिक)",
    value: "autoMechanics",
  },
  {
    id: 5,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Auto Part Industry Workers (ऑटो पार्ट उद्योग के कार्यकर्ता)",
    value: "autoPartIndustryWorkers",
  },
  {
    id: 6,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Bank And Finance Consultants (बैंक और वित्त सलाहकार)",
    value: "bankAndFinanceConsultants",
  },
  {
    id: 7,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Computer And Mobile (कंप्यूटर और मोबाइल)",
    value: "computerAndMobile",
  },
  {
    id: 8,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Construction Workers (निर्माण कर्मचारी)",
    value: "constructionWorkers",
  },
  {
    id: 9,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label:
      "Court And Registrar Office Consultants (कोर्ट और रजिस्ट्रार कार्यालय सलाहकार)",
    value: "courtAndRegistrarOfficeConsultants",
  },
  {
    id: 10,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Drivers (ड्राइवर्स)",
    value: "Drivers",
  },
  {
    id: 11,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Education Consultants (शिक्षा सलाहकार)",
    value: "educationConsultants",
  },
  {
    id: 12,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Footwear (जूते)",
    value: "Footwear",
  },
  {
    id: 13,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Hosiery Worker (होज़री कार्मिक)",
    value: "hosieryWorker",
  },
  {
    id: 14,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Hotel And Food Industry (होटल और खाद्य उद्योग)",
    value: "hotelAndFoodIndustry",
  },
  {
    id: 15,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Home Servants (घर के सेवक)",
    value: "homeServants",
  },
  {
    id: 16,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Industrial Machinery Operators (औद्योगिक मशीनरी ऑपरेटर्स)",
    value: "industrialMachineryOperators",
  },
  {
    id: 17,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Medical Professionals (चिकित्सा पेशेवर)",
    value: "medicalProfessionals",
  },
  {
    id: 18,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Pet Care (पालतू जानवरों की देखभाल)",
    value: "petCare",
  },
  {
    id: 19,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Real Estate (रियल एस्टेट)",
    value: "realEstate",
  },
  {
    id: 20,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Sales And Delivery Persons (बिक्री और वितरण व्यक्तियों)",
    value: "salesAndDeliveryPersons",
  },
  {
    id: 21,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label:
      "Salon And Beauty Parlor Service Providers (सैलून और ब्यूटी पार्लर सेवा प्रदाता)",
    value: "salonAndBeautyParlorServiceProviders",
  },
  {
    id: 22,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Security Service Providers (सुरक्षा सेवा प्रदाता)",
    value: "securityServiceProviders",
  },
  {
    id: 23,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Astrologers (ज्योतिषी)",
    value: "Astrologers",
  },
  {
    id: 24,
    imageUrl: require("./images/serviceImg1.jpg"), // Same image as the first element
    label: "Office Staff (कार्यालय के कर्मचारी)",
    value: "officeStaff",
  },

  {
    id: 25,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Field Staff (क्षेत्र कर्मचारी)",
    value: "fieldStaff",
  },
  {
    id: 26,
    imageUrl: require("./images/serviceImg1.jpg"),
    label: "Field worker (क्षेत्र कार्यकर्ता)",
    value: "fieldWorker",
  },
];

const localServiceProviders = [
  {
    _id: "658ac7ab2729987001d5a1d9",
    userId: "658666a1a9360b6813c1c474",
    name: "provider1",
    email: "provider1@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, parmandal,multai,betul,460661",
    location: {
      type: "Point",
      coordinates: [21.76467781162625, 78.22154718243502],
    },
    website: "",
    serviceType: "type1",
    experience: "1 year",
    feesPerService: "100",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
    distance: 0,
  },
  {
    _id: "658ac7ab2729987001d5a1dc",
    userId: "658666a1a9360b6813c1c477",
    name: "provider4",
    email: "provider4@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, karajgaon, sonora, multai, 460661",
    location: {
      type: "Point",
      coordinates: [21.755948749325494, 78.18718415531474],
    },
    website: "",
    serviceType: "type4",
    experience: "4 year",
    feesPerService: "400",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: true,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
    distance: 3830.406462768142,
  },
  {
    _id: "658ac7ab2729987001d5a1da",
    userId: "658666a1a9360b6813c1c475",
    name: "provider2",
    email: "provider2@gmail.com",
    phoneNumber: 9479779107,
    password: "$2a$10$Q4VKl4b7qDpFcT3lqsV.bOoxR0uUpnuZ0SwAzswA2wfwm7qxkHv62",
    address: "60, multai, multai, betul, 460661",
    location: {
      type: "Point",
      coordinates: [21.776301914653676, 78.25712707058587],
    },
    website: "",
    serviceType: "type2",
    experience: "2 year",
    feesPerService: "200",
    availability: {
      January: {
        1: ["10:00 - 11:00", "13:00 - 14:00"],
        15: ["11:00 - 12:00"],
      },
      February: {
        3: ["14:00 - 15:00"],
      },
    },
    isAdmin: false,
    isServiceProvider: false,
    notifcation: [],
    seennotification: [],
    profilePhotoUrl: "http://localhost:8000/api/v1/static/profile.jpeg",
    aadharPhotoUrl: "http://localhost:8000/api/v1/static/aadhar.jpeg",
    status: "pending",
    distance: 3969.4837156136105,
  },
];

const serviceTypeRR = [
  " Agriculture Workers (कृषि कर्मचारी)",
  " Jewellery Workers(आभूषण श्रमिक)",
  " Auto Mechanics (ऑटो मैकेनिक)",
  " Auto Part Industry Workers (ऑटो पार्ट उद्योग के कार्यकर्ता)",
];

export { serviceProviders, user, serviceType, localServiceProviders };
