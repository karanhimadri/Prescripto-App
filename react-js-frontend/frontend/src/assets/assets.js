import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Ramesh Kumar",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS, MD (General Medicine)",
    experience: "4 Years",
    about:
      "Dr. Ramesh Kumar is committed to offering patient-centered care with a focus on preventive health and timely treatment of chronic conditions. He practices evidence-based medicine tailored to the Indian healthcare system.",
    fees: 500,
    address: {
      line1: "17th Cross, JP Nagar",
      line2: "Bangalore, Karnataka",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Meera Sharma",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS, DGO",
    experience: "3 Years",
    about:
      "Dr. Meera Sharma specializes in women's health with a compassionate approach. She provides quality care in antenatal, postnatal, and reproductive health services.",
    fees: 600,
    address: {
      line1: "5th Avenue, Anna Nagar",
      line2: "Chennai, Tamil Nadu",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sneha Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "1 Year",
    about:
      "Dr. Sneha Patel offers expert consultation in skin, hair, and nail disorders. She emphasizes early detection and personalized dermatological treatments.",
    fees: 400,
    address: {
      line1: "Sector 22, Vashi",
      line2: "Navi Mumbai, Maharashtra",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Aditya Mehra",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS, MD (Pediatrics)",
    experience: "2 Years",
    about:
      "Dr. Aditya Mehra focuses on child healthcare from newborn to adolescence. His approach includes preventive pediatrics, vaccinations, and developmental assessments.",
    fees: 450,
    address: {
      line1: "Banjara Hills, Road No. 12",
      line2: "Hyderabad, Telangana",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Kavita Rao",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS, DM (Neurology)",
    experience: "4 Years",
    about:
      "Dr. Kavita Rao offers comprehensive care for neurological disorders such as epilepsy, stroke, and migraines with a focus on long-term management.",
    fees: 800,
    address: {
      line1: "Salt Lake, Sector 1",
      line2: "Kolkata, West Bengal",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Arvind Nair",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS, DNB (Neurology)",
    experience: "4 Years",
    about:
      "Dr. Arvind Nair provides specialized care in neurology with a patient-centric approach and strong emphasis on accurate diagnosis and rehabilitation.",
    fees: 750,
    address: {
      line1: "Ernakulam North",
      line2: "Kochi, Kerala",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Vishal Reddy",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS, MD (Internal Medicine)",
    experience: "4 Years",
    about:
      "Dr. Vishal Reddy believes in holistic healthcare delivery with a balance of clinical excellence and compassion, especially for lifestyle diseases.",
    fees: 500,
    address: {
      line1: "Kukatpally Housing Board",
      line2: "Hyderabad, Telangana",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Anjali Deshmukh",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS, MS (Obstetrics & Gynecology)",
    experience: "3 Years",
    about:
      "Dr. Anjali Deshmukh offers expert care in fertility, maternity, and gynecologic surgeries, with a strong focus on women’s wellness education.",
    fees: 650,
    address: {
      line1: "Aundh Road",
      line2: "Pune, Maharashtra",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Neha Kapoor",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS, MD (Skin & VD)",
    experience: "1 Year",
    about:
      "Dr. Neha Kapoor provides advanced skincare and cosmetic dermatology solutions using the latest medical technologies and techniques.",
    fees: 400,
    address: {
      line1: "Connaught Place",
      line2: "New Delhi",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Rohit Jain",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: "2 Years",
    about:
      "Dr. Rohit Jain ensures thorough care in pediatric illnesses with keen attention to growth milestones and nutritional health.",
    fees: 450,
    address: {
      line1: "Civil Lines",
      line2: "Nagpur, Maharashtra",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Nidhi Sinha",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS, DM (Neurology)",
    experience: "4 Years",
    about:
      "Dr. Nidhi Sinha specializes in treating neurological conditions including Parkinson’s, multiple sclerosis, and nerve disorders in both adults and elderly patients.",
    fees: 850,
    address: {
      line1: "Ashok Nagar",
      line2: "Ranchi, Jharkhand",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Pratik Joshi",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS, DNB (Neurology)",
    experience: "4 Years",
    about:
      "Dr. Pratik Joshi provides cutting-edge neurological services including EEG, stroke rehab, and neurocritical care.",
    fees: 850,
    address: {
      line1: "Race Course Road",
      line2: "Indore, Madhya Pradesh",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Shweta Iyer",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS, MD (Internal Medicine)",
    experience: "4 Years",
    about:
      "Dr. Shweta Iyer focuses on chronic disease management, preventive screenings, and personalized wellness plans for adults and seniors.",
    fees: 500,
    address: {
      line1: "MG Road",
      line2: "Thiruvananthapuram, Kerala",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ritu Mahajan",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS, MS (Obstetrics & Gynecology)",
    experience: "3 Years",
    about:
      "Dr. Ritu Mahajan is known for her skill in high-risk pregnancies and minimally invasive gynecological procedures.",
    fees: 600,
    address: {
      line1: "Rajouri Garden",
      line2: "New Delhi",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Aisha Khan",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "1 Year",
    about:
      "Dr. Aisha Khan uses advanced diagnostic methods and customized therapies for treating acne, pigmentation, and hair loss issues.",
    fees: 400,
    address: {
      line1: "Hazratganj",
      line2: "Lucknow, Uttar Pradesh",
    },
  },
];

