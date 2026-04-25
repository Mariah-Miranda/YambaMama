export const DISTRICT_CLINICS: Record<string, { name: string, location: string, phone: string }[]> = {
  "Kampala": [
    { name: "Kawempe National Referral Hospital", location: "Kawempe", phone: "+256 414 531 201" },
    { name: "Kiruddu National Referral Hospital", location: "Buziga", phone: "+256 414 531 530" },
    { name: "Nsambya Hospital", location: "Nsambya", phone: "+256 414 267 012" },
    { name: "Mengo Hospital", location: "Mengo", phone: "+256 414 270 222" }
  ],
  "Wakiso": [
    { name: "Entebbe General Hospital", location: "Entebbe", phone: "+256 414 321 028" },
    { name: "Wakiso Health Center IV", location: "Wakiso Town", phone: "Contact local authority" },
    { name: "Kasangati Health Center IV", location: "Kasangati", phone: "Contact local authority" }
  ],
  "Gulu": [
    { name: "Gulu Regional Referral Hospital", location: "Gulu City", phone: "+256 471 432 020" },
    { name: "St. Mary's Hospital Lacor", location: "Lacor", phone: "+256 471 432 089" }
  ],
  "Mbarara": [
    { name: "Mbarara Regional Referral Hospital", location: "Mbarara City", phone: "+256 485 420 020" },
    { name: "Holy Innocents Children's Hospital", location: "Mbarara", phone: "+256 485 421 216" }
  ]
};

export const NUTRITION_STAGES: Record<number, { meal: string, tips: string[] }> = {
  1: { // 1st Trimester (1-3 months)
    meal: "Breakfast: Millet porridge with milk. Lunch: Matooke with beans and greens (Dodo). Snack: Banana or Mango. Dinner: Posho with groundnut sauce.",
    tips: ["Eat more iron-rich foods like greens.", "Folic acid is important now.", "Ginger tea for morning sickness."]
  },
  2: { // 2nd Trimester (4-6 months)
    meal: "Breakfast: Sweet potatoes and eggs. Lunch: Rice with fish and nakati. Snack: Groundnuts. Dinner: Matooke with beef stew and cabbage.",
    tips: ["Increase protein intake.", "Calcium for baby's bones (Milk, Yoghurt).", "Drink plenty of water."]
  },
  3: { // 3rd Trimester (7-9 months)
    meal: "Breakfast: Tea with whole grain bread and avocado. Lunch: Cassava with beans and silverfish (Mukene). Snack: Roasted maize or soya. Dinner: Pumpkins with chicken and spinach.",
    tips: ["Smaller, more frequent meals.", "Avoid very spicy or heavy foods at night.", "Mukene is great for brain development."]
  }
};

export const BABY_DEVELOPMENT: Record<number, { size: string, milestone: string }> = {
  4: { size: "Poppy Seed", milestone: "The embryo is developing basics like brain and heart." },
  8: { size: "Raspberry", milestone: "Fingers and toes are forming. The baby is moving slightly." },
  12: { size: "Lime", milestone: "Baby's organs are fully formed. Reflexes are starting." },
  16: { size: "Avocado", milestone: "Baby can feel light and sound. Coordination is improving." },
  20: { size: "Banana", milestone: "Halfway there! You might feel the baby kicking now." },
  24: { size: "Ear of Corn", milestone: "Baby's lungs are developing. They can swallow." },
  28: { size: "Eggplant", milestone: "Baby is opening eyes. Dreaming starts now." },
  32: { size: "Squash", milestone: "Baby is putting on weight. Movement might feel tighter." },
  36: { size: "Papaya", milestone: "Baby is getting into position for birth." },
  40: { size: "Watermelon", milestone: "Baby is fully grown and ready to meet you!" }
};
