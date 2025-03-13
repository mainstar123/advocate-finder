const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

// Function to generate a random range of specialties
function randomSpecialty() {
  const start = Math.floor(Math.random() * specialties.length);
  const end = Math.min(
    start + Math.floor(Math.random() * (specialties.length - start)),
    specialties.length
  );
  return [start, end];
}

// Function to generate random phone numbers
function randomPhoneNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Generate 200 advocates
const advocates = [];

for (let i = 0; i < 200; i++) {
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Michael",
    "Emily",
    "Chris",
    "Jessica",
    "David",
    "Laura",
    "Daniel",
    "Sarah",
    "James",
    "Megan",
    "Joshua",
    "Amanda",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Davis",
    "Martinez",
    "Taylor",
    "Harris",
    "Clark",
    "Lewis",
    "Lee",
    "King",
    "Green",
    "Walker",
    "Hall",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomCity = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "San Francisco",
    "Columbus",
    "Fort Worth",
  ][Math.floor(Math.random() * 15)];
  const randomDegree = ["MD", "PhD", "MSW"][Math.floor(Math.random() * 3)];
  const randomYearsOfExperience = Math.floor(Math.random() * 20); // Random years from 0 to 19

  advocates.push({
    firstName: randomFirstName,
    lastName: randomLastName,
    city: randomCity,
    degree: randomDegree,
    specialties: specialties.slice(...randomSpecialty()),
    yearsOfExperience: randomYearsOfExperience,
    phoneNumber: randomPhoneNumber(),
  });
}

export const advocateData = advocates;
