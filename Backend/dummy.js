// const { db } = require("./models/userModels");
// const {} = require("mongoose").Types;

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

const serviceProvider = [
  {
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
  },
  {
    userId: "658666a1a9360b6813c1c475",
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
    userId: "658666a1a9360b6813c1c476",
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
    userId: "658666a1a9360b6813c1c477",
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
    userId: "658666a1a9360b6813c1c478",
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
    userId: "658666a1a9360b6813c1c479",
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
    userId: "658666a1a9360b6813c1c47a",
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

const G_response = {
  data: {
    results: [
      {
        address_components: [
          {
            long_name: "Karajgaon",
            short_name: "Karajgaon",
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
        ],
        formatted_address: "Karajgaon, Madhya Pradesh, India",
        geometry: {
          bounds: {
            northeast: {
              lat: 21.76544,
              lng: 78.20293,
            },
            southwest: {
              lat: 21.74311,
              lng: 78.17573,
            },
          },
          location: {
            lat: 21.7563164,
            lng: 78.18779219999999,
          },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: {
              lat: 21.76544,
              lng: 78.20293,
            },
            southwest: {
              lat: 21.74311,
              lng: 78.17573,
            },
          },
        },
        partial_match: true,
        place_id: "ChIJa05v7c_D1TsRdYVkU7VmaYU",
        types: ["locality", "political"],
      },
    ],
    status: "OK",
  },
};

module.exports = { G_response };
